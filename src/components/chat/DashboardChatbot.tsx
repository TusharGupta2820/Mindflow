/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  RotateCcw,
  Minimize2,
  Maximize2,
  HeartHandshake,
  ShieldAlert,
} from 'lucide-react';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface DashboardChatbotProps {
  className?: string;
}

const QUICK_PROMPTS = [
  'Help me ground my racing thoughts',
  'I feel overwhelmed by workload today',
  'Guide me through a 2-minute breath reset',
  'How can I prepare my mind for deep sleep tonight?',
];

export const DashboardChatbot: React.FC<DashboardChatbotProps> = ({ className = '' }) => {
  const { profile, user } = useAuth();
  const userName = (profile?.full_name || user?.full_name || 'Friend').split(' ')[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Hello ${userName}. I am your MindBloom wellness companion powered by Gemini 3.6 Flash. Whether you want to reflect on how you are feeling, practice a grounding breath, or untangle a stressful moment, I am here to listen without judgment. How is your mind feeling right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await api.aiChat(messageContent, history);

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        content:
          'Take a slow, deep breath in and release it gently. I am right here with you. Please share what is on your mind and we can take it one step at a time.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `Chat session reset. Take a moment to check in with yourself. How can I support you right now, ${userName}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div
      className={`bg-surface-container-lowest rounded-3xl border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.06)] overflow-hidden transition-all duration-300 flex flex-col ${
        isMinimized ? 'h-auto' : 'h-[620px]'
      } ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-container/15 to-tertiary-fixed/20 p-space-md border-b border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-tight">
                MindBloom AI Companion
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] font-bold uppercase tracking-wider">
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Mindful emotional resonance • 24/7 compassionate space</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearHistory}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
            title="Reset conversation"
            type="button"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setIsMinimized((prev) => !prev)}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
            title={isMinimized ? 'Expand Chatbot' : 'Minimize Chatbot'}
            type="button"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-space-md lg:p-space-lg space-y-space-md bg-surface-container-lowest/50">
            {messages.map((message) => {
              const isAi = message.role === 'model';
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-space-sm ${
                    isAi ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-space-md py-3 text-body-md ${
                      isAi
                        ? 'bg-surface-container-low text-on-surface shadow-sm border border-surface-container/60'
                        : 'bg-primary text-on-primary shadow-sm rounded-tr-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                    <div
                      className={`text-[11px] mt-1.5 flex items-center justify-end ${
                        isAi ? 'text-on-surface-variant' : 'text-on-primary/75'
                      }`}
                    >
                      <span>{message.timestamp}</span>
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <UserIcon size={18} />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-space-sm justify-start">
                <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot size={18} />
                </div>
                <div className="bg-surface-container-low border border-surface-container/60 rounded-2xl px-4 py-3 flex items-center gap-2 text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                  <span className="font-label-sm text-label-sm ml-1 text-primary font-medium">
                    MindBloom AI is reflecting...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-space-md pt-2 pb-1 bg-surface-container-low/50 border-t border-surface-container/50 overflow-x-auto">
            <div className="flex items-center gap-2 pb-1">
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider shrink-0 flex items-center gap-1">
                <HeartHandshake size={13} className="text-primary" />
                Prompt ideas:
              </span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="shrink-0 text-left px-3 py-1 rounded-full text-label-sm text-on-surface-variant bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 disabled:opacity-50"
                  type="button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-space-md bg-surface-container-lowest border-t border-surface-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2"
            >
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Share what is on your mind or ask for mindfulness guidance..."
                  rows={2}
                  disabled={isLoading}
                  className="w-full resize-none rounded-2xl bg-surface-container-low border border-surface-container focus:border-primary focus:bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-11 w-11 rounded-2xl bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm"
                title="Send message"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1 text-outline">
                <ShieldAlert size={12} />
                Gemini 3.6 Flash • AI companion for mindfulness support, not clinical diagnosis.
              </span>
              <span className="hidden sm:inline text-outline">
                Press Enter to send, Shift+Enter for newline
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
