/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext.tsx';
import { JournalEntry } from '../types/index.ts';

export const Journal: React.FC = () => {
  const { journals, createJournal, updateJournal, deleteJournal } = useWellness();

  const [search, setSearch] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Form State
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formMood, setFormMood] = useState<string>('Good');
  const [formTags, setFormTags] = useState<string>('Mindfulness, Reflection');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const prompts = [
    'What brought an unexpected smile to your face today?',
    'What is one expectation you can release today to make room for peace?',
    'What is one small obstacle you navigated with patience?',
    'If a close friend were feeling the way you do right now, what compassionate words would you say to them?',
    'What does your body or mind need most in this exact hour?',
  ];
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const handleUsePrompt = () => {
    const promptText = prompts[activePromptIndex];
    setFormTitle(promptText);
    setFormContent(`Reflecting on: "${promptText}"\n\n`);
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleNextPrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % prompts.length);
  };

  const handleStartCreate = () => {
    setFormTitle('');
    setFormContent('');
    setFormMood('Good');
    setFormTags('Reflection');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleStartEdit = (entry: JournalEntry) => {
    setFormTitle(entry.title);
    setFormContent(entry.content);
    setFormMood(entry.mood || 'Good');
    setFormTags(entry.tags.join(', '));
    setSelectedEntry(entry);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (isEditing && selectedEntry) {
      await updateJournal(selectedEntry.id, {
        title: formTitle,
        content: formContent,
        mood: formMood,
        tags: tagsArray,
      });
      setIsEditing(false);
      setSelectedEntry(null);
    } else {
      await createJournal({
        title: formTitle,
        content: formContent,
        mood: formMood,
        tags: tagsArray,
      });
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteJournal(id);
    setDeleteConfirmId(null);
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  const filteredJournals = journals.filter((j) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.content.toLowerCase().includes(q) ||
      j.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>PRIVATE UNMONITORED SANCTUARY</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Thought Journaling &amp; Reflection
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            A quiet space to untangle cognitive load, reframe stressful situations, and capture moments of gratitude. All entries remain strictly local and encrypted.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Journal Entry</span>
        </button>
      </section>

      {/* Guided Cognitive Reframing Prompt of the Day Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border-l-4 border-primary flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
              Today's Gentle Prompt
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Cognitive Reframing</span>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface italic font-medium">
            “{prompts[activePromptIndex]}”
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNextPrompt}
            className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
            title="Next prompt"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
          </button>
          <button
            onClick={handleUsePrompt}
            className="px-4 py-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-semibold hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">draw</span>
            <span>Write to this Prompt</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Entries List & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Entries List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-outline">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reflections or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredJournals.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-lowest rounded-2xl space-y-2">
                <span className="material-symbols-outlined text-4xl text-outline">menu_book</span>
                <p className="font-body-md text-body-md text-on-surface-variant">No journal entries found</p>
                <button
                  onClick={handleStartCreate}
                  className="font-label-md text-label-md text-primary font-semibold hover:underline"
                >
                  Write your first entry
                </button>
              </div>
            ) : (
              filteredJournals.map((j) => {
                const isSelected = selectedEntry?.id === j.id;
                return (
                  <div
                    key={j.id}
                    onClick={() => {
                      setSelectedEntry(j);
                      setIsEditing(false);
                      setIsCreating(false);
                    }}
                    className={`p-5 rounded-2xl transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-surface-container-lowest shadow-md ring-2 ring-primary/30'
                        : 'bg-surface-container-lowest hover:bg-surface-container-low shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                        {j.entry_date}
                      </span>
                      {j.mood && (
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {j.mood}
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">
                      {j.title}
                    </h4>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {j.content}
                    </p>

                    {j.tags && j.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {j.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-[11px]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: View / Editor (7 Cols) */}
        <div className="lg:col-span-7">
          {isCreating || isEditing ? (
            /* Creation / Edit Form */
            <form
              onSubmit={handleSave}
              className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {isEditing ? 'Edit Reflection' : 'New Thought Entry'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                  }}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                    Title / Prompt
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="E.g., Finding quiet in the library before exams..."
                    className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface font-headline-sm text-headline-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                      Associated Mood
                    </label>
                    <select
                      value={formMood}
                      onChange={(e) => setFormMood(e.target.value)}
                      className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Very Low">Very Low (Depleted)</option>
                      <option value="Low">Low (Heavy)</option>
                      <option value="Neutral">Neutral (Balanced)</option>
                      <option value="Good">Good (Steady)</option>
                      <option value="Great">Great (Vibrant)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="E.g., Gratitude, Rest, Lab"
                      className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                    Personal Reflection
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write without censoring or judging yourself..."
                    className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>{isEditing ? 'Save Changes' : 'Save Reflection'}</span>
                </button>
              </div>
            </form>
          ) : selectedEntry ? (
            /* Selected Entry Viewer */
            <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                      {selectedEntry.entry_date}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span>Private Entry</span>
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    {selectedEntry.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(selectedEntry)}
                    className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(selectedEntry.id)}
                    className="p-2 rounded-xl text-error hover:bg-error-container/40 transition-colors"
                    title="Delete entry"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>

              <div className="font-body-lg text-body-lg text-on-surface whitespace-pre-wrap leading-relaxed">
                {selectedEntry.content}
              </div>

              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="pt-4 border-t border-surface-container flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tagged:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEntry.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Blank Placeholder */
            <div className="bg-surface-container-lowest rounded-3xl p-12 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container text-secondary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Select an entry or start a new reflection
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto">
                Regular emotional unburdening stimulates neurocognitive consolidation and decreases ruminative insomnia.
              </p>
              <button
                onClick={handleStartCreate}
                className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all"
              >
                Write New Reflection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-error-container text-error mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Delete this reflection?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              This action permanently erases this journal entry from your encrypted local storage.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-error text-on-error font-label-md text-label-md hover:opacity-90"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
