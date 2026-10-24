/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile, UserPreferences } from '../types/index.ts';
import { api } from '../services/api.ts';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updatePreferences: (data: Partial<UserPreferences>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const defaultUser: User = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'aria.chen@mindbloom.app',
  full_name: 'Aria Chen',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize session and fetch profile
  useEffect(() => {
    async function loadUserData() {
      try {
        const storedToken = localStorage.getItem('mindbloom_token');
        if (!storedToken) {
          localStorage.setItem('mindbloom_token', 'demo-token');
        }

        const prof = await api.getProfile();
        setProfile(prof);
        const prefs = await api.getPreferences();
        setPreferences(prefs);
      } catch (err) {
        console.warn('Backend load notice (using demo profile):', err);
        // Fallback demo profile
        setProfile({
          id: defaultUser.id,
          full_name: defaultUser.full_name,
          avatar_url: defaultUser.avatar_url,
          student_id: 'MB-2025-042',
          department: 'Mindfulness & Cognitive Resilience',
          institution: 'MindBloom Digital Sanctuary',
          created_at: new Date('2024-10-01').toISOString(),
          updated_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      const token = `user_${Date.now()}`;
      localStorage.setItem('mindbloom_token', token);
      const name = email.split('@')[0] || 'Mindful Learner';
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      const newUser: User = {
        id: token,
        email,
        full_name: capitalized,
        avatar_url: defaultUser.avatar_url,
      };
      setUser(newUser);
      const updated = await api.updateProfile({ full_name: capitalized });
      setProfile(updated);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string) => {
    setLoading(true);
    try {
      const token = `user_${Date.now()}`;
      localStorage.setItem('mindbloom_token', token);
      const newUser: User = {
        id: token,
        email,
        full_name: name,
        avatar_url: defaultUser.avatar_url,
      };
      setUser(newUser);
      const prof = await api.updateProfile({
        full_name: name,
        department: 'Mindfulness & Cognitive Resilience',
        institution: 'MindBloom Digital Sanctuary',
      });
      setProfile(prof);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('mindbloom_token');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    const updated = await api.updateProfile(data);
    setProfile(updated);
    if (user && data.full_name) {
      setUser({ ...user, full_name: data.full_name });
    }
  };

  const updatePreferences = async (data: Partial<UserPreferences>) => {
    const updated = await api.updatePreferences(data);
    setPreferences(updated);
  };

  const deleteAccount = async () => {
    await api.deleteAccount();
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        preferences,
        loading,
        login,
        register,
        logout,
        updateProfile,
        updatePreferences,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
