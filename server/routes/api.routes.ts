/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware.ts';
import { dbStore } from '../db/store.ts';

export const apiRouter = Router();

// -------------------------------------------------------------
// 1. Health Endpoint
// -------------------------------------------------------------
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'MindBloom Wellness Suite',
    platform: 'MindBloom Digital Sanctuary',
    architecture: 'Full-Stack React SPA + Express REST + Supabase PostgreSQL',
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// 2. Profile Endpoints
// -------------------------------------------------------------
apiRouter.get('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const profile = dbStore.getProfile(userId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

apiRouter.patch('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updated = dbStore.updateProfile(userId, req.body);
  res.json(updated);
});

// -------------------------------------------------------------
// 3. User Preferences Endpoints
// -------------------------------------------------------------
apiRouter.get('/preferences', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const prefs = dbStore.getPreferences(userId);
  res.json(prefs);
});

apiRouter.put('/preferences', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updated = dbStore.updatePreferences(userId, req.body);
  res.json(updated);
});

// -------------------------------------------------------------
// 4. Mood Tracking Endpoints
// -------------------------------------------------------------
apiRouter.get('/moods', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const moods = dbStore.getMoods(userId);
  res.json(moods);
});

apiRouter.get('/moods/today', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const dateStr = typeof req.query.date === 'string' ? req.query.date : undefined;
  const mood = dbStore.getTodayMood(userId, dateStr);
  res.json({ mood: mood || null });
});

apiRouter.get('/moods/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const mood = dbStore.getMoodById(userId, req.params.id);
  if (!mood) {
    return res.status(404).json({ error: 'Mood entry not found' });
  }
  res.json(mood);
});

apiRouter.post('/moods', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { mood, emotion_tags, stress_level, reflection, entry_date } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood selection is required' });
  }

  const saved = dbStore.saveMood(userId, {
    mood,
    emotion_tags: Array.isArray(emotion_tags) ? emotion_tags : [],
    stress_level: Number(stress_level) || 2,
    reflection: reflection || '',
    entry_date: entry_date || new Date().toISOString().split('T')[0],
  });

  res.status(201).json(saved);
});

apiRouter.patch('/moods/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const existing = dbStore.getMoodById(userId, req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Mood entry not found' });
  }
  const updated = dbStore.saveMood(userId, {
    ...existing,
    ...req.body,
  });
  res.json(updated);
});

apiRouter.delete('/moods/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const deleted = dbStore.deleteMood(userId, req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Mood entry not found or unauthorized' });
  }
  res.json({ success: true, message: 'Mood entry deleted successfully' });
});

// -------------------------------------------------------------
// 5. Journal Endpoints
// -------------------------------------------------------------
apiRouter.get('/journal', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const entries = dbStore.getJournals(userId, search);
  res.json(entries);
});

apiRouter.get('/journal/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const entry = dbStore.getJournalById(userId, req.params.id);
  if (!entry) {
    return res.status(404).json({ error: 'Journal entry not found' });
  }
  res.json(entry);
});

apiRouter.post('/journal', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { title, content, mood, tags, entry_date, is_favorite } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Journal title is required' });
  }

  const created = dbStore.createJournal(userId, {
    title,
    content: content || '',
    mood,
    tags: Array.isArray(tags) ? tags : [],
    entry_date,
    is_favorite: !!is_favorite,
  });

  res.status(201).json(created);
});

apiRouter.patch('/journal/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updated = dbStore.updateJournal(userId, req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Journal entry not found or unauthorized' });
  }
  res.json(updated);
});

apiRouter.delete('/journal/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const deleted = dbStore.deleteJournal(userId, req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Journal entry not found or unauthorized' });
  }
  res.json({ success: true, message: 'Journal entry deleted' });
});

// -------------------------------------------------------------
// 6. Wellness Activities Endpoints
// -------------------------------------------------------------
apiRouter.get('/activities', (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category : undefined;
  const list = dbStore.getActivities(category);
  res.json(list);
});

apiRouter.get('/activities/:id', (req, res) => {
  const act = dbStore.getActivityById(req.params.id);
  if (!act) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  res.json(act);
});

apiRouter.post('/activities/:id/complete', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { duration_minutes, feedback } = req.body;
  const log = dbStore.completeActivity(userId, req.params.id, duration_minutes, feedback);
  res.status(201).json(log);
});

apiRouter.get('/activity-logs', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const logs = dbStore.getActivityLogs(userId);
  res.json(logs);
});

apiRouter.get('/saved-activities', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const saved = dbStore.getSavedActivities(userId);
  res.json(saved);
});

apiRouter.post('/activities/:id/save', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  dbStore.saveActivity(userId, req.params.id);
  res.json({ success: true, message: 'Activity saved to favorites' });
});

apiRouter.delete('/activities/:id/save', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  dbStore.unsaveActivity(userId, req.params.id);
  res.json({ success: true, message: 'Activity removed from favorites' });
});

// -------------------------------------------------------------
// 7. Recommendations Endpoint
// -------------------------------------------------------------
apiRouter.get('/recommendations', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const recs = dbStore.getRecommendations(userId);
  res.json(recs);
});

// -------------------------------------------------------------
// 8. Progress & Analytics Endpoints
// -------------------------------------------------------------
apiRouter.get('/progress/summary', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const summary = dbStore.getProgressSummary(userId);
  res.json(summary);
});

apiRouter.get('/progress/moods', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const moods = dbStore.getMoods(userId);
  res.json(moods);
});

apiRouter.get('/progress/activities', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const logs = dbStore.getActivityLogs(userId);
  res.json(logs);
});

// -------------------------------------------------------------
// 9. Wellness Goals / Anchors Endpoints
// -------------------------------------------------------------
apiRouter.get('/goals', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const goals = dbStore.getGoals(userId);
  res.json(goals);
});

apiRouter.post('/goals', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const created = dbStore.createGoal(userId, req.body);
  res.status(201).json(created);
});

apiRouter.patch('/goals/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updated = dbStore.updateGoal(userId, req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  res.json(updated);
});

apiRouter.delete('/goals/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const deleted = dbStore.deleteGoal(userId, req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  res.json({ success: true, message: 'Goal removed' });
});

// -------------------------------------------------------------
// 10. Account Purge / GDPR Sensitive Data Erasure
// -------------------------------------------------------------
apiRouter.delete('/account', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  dbStore.purgeUserData(userId);
  res.json({ success: true, message: 'All personal wellness records permanently erased.' });
});
