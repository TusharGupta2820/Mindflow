/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  Music,
  Heart,
  Wind,
  CheckCircle2,
  AlertCircle,
  Activity,
  Flame,
  ExternalLink,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { useWellness } from '../context/WellnessContext.tsx';
import { MoodIcon } from '../components/ui/MoodIcon.tsx';
import { AIMoodAnalysisResult, MoodType } from '../types/index.ts';

export const MoodScanner: React.FC = () => {
  const { logMood } = useWellness();

  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIMoodAnalysisResult | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((e) => console.log('Video play error:', e));
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      setCameraError(
        'Unable to access camera. Please allow camera permissions in your browser or switch to the image upload tab.'
      );
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, capturedImage, startCamera, stopCamera]);

  // Breathing guide cycle
  useEffect(() => {
    if (!analysisResult) return;

    const interval = setInterval(() => {
      setBreathSeconds((prevSec) => {
        if (prevSec > 1) {
          return prevSec - 1;
        }
        setBreathPhase((prevPhase) => {
          if (prevPhase === 'Inhale') return 'Hold';
          if (prevPhase === 'Hold') return 'Exhale';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [analysisResult]);

  // Snap photo from video element
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  // Handle uploaded file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCapturedImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setSaveSuccess(false);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const runMoodAnalysis = async () => {
    if (!capturedImage || isAnalyzing) return;
    setIsAnalyzing(true);
    setSaveSuccess(false);

    try {
      const result = await api.aiAnalyzeMood(capturedImage);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Mood analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogToJournal = async () => {
    if (!analysisResult) return;
    try {
      const moodValue: MoodType = analysisResult.detectedMood || 'Neutral';
      await logMood({
        mood: moodValue,
        emotion_tags: [analysisResult.moodTag, analysisResult.energyLevel + ' Energy'],
        stress_level: analysisResult.valenceScore < 40 ? 4 : analysisResult.valenceScore < 70 ? 2 : 1,
        reflection: `AI Mood Scan: ${analysisResult.expressionAnalysis}`,
      });
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to log mood from AI scan:', err);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto space-y-4 sm:space-y-space-lg pb-28 lg:pb-16 px-1 sm:px-0">
      {/* Ambient background glow */}
      <div className="absolute -top-10 right-1/3 w-80 h-80 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-72 -left-10 w-72 h-72 sm:w-80 sm:h-80 bg-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Banner */}
      <header className="space-y-1.5 max-w-2xl px-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/30 text-on-primary-container font-label-sm text-xs sm:text-sm">
          <Sparkles size={14} className="text-primary animate-pulse shrink-0" />
          <span>Gemini 3.6 Flash Multimodal Vision</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
          AI Mood &amp; Facial Scanner
        </h1>
        <p className="text-xs sm:text-sm lg:text-body-md text-on-surface-variant leading-relaxed">
          Capture a selfie or upload a photo. Gemini 3.6 Flash analyzes facial expressions and posture to curate personalized activities, acoustic soundscapes, and restorative yoga.
        </p>
      </header>

      {/* Capture Card Surface */}
      <section className="bg-surface-container-lowest rounded-3xl p-3 sm:p-space-lg lg:p-space-xl border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.06)]">
        {!capturedImage ? (
          <div>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center mb-4 sm:mb-space-lg">
              <div className="inline-flex p-1 rounded-2xl bg-surface-container-low border border-surface-container w-full sm:w-auto max-w-xs sm:max-w-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('camera')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-label-lg font-semibold transition-all ${
                    activeTab === 'camera'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Camera size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Live Camera</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-label-lg font-semibold transition-all ${
                    activeTab === 'upload'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Upload Photo</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Live Camera View */}
            {activeTab === 'camera' && (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-4/3 max-h-[55vh] rounded-3xl overflow-hidden bg-black/90 shadow-inner flex items-center justify-center border-2 border-primary/25">
                  {cameraError ? (
                    <div className="p-4 sm:p-6 text-center space-y-3 max-w-xs">
                      <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container mx-auto flex items-center justify-center">
                        <AlertCircle size={24} />
                      </div>
                      <p className="text-xs sm:text-sm text-white">{cameraError}</p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold"
                      >
                        Retry Access
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${
                          facingMode === 'user' ? 'scale-x-[-1]' : ''
                        }`}
                      />

                      {/* Viewfinder Target Overlay */}
                      <div className="absolute inset-4 sm:inset-6 rounded-2xl border-2 border-dashed border-primary/40 pointer-events-none flex flex-col items-center justify-between p-3">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-white bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          Position face inside frame
                        </span>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/50 animate-pulse pointer-events-none"></div>
                        <span className="text-[10px] sm:text-[11px] text-white/80 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          Relax facial muscles
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile-Friendly Shutter Controls */}
                {!cameraError && isCameraActive && (
                  <div className="flex items-center justify-center gap-6 mt-4 sm:mt-6 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={switchCamera}
                      className="w-12 h-12 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center active:scale-95 transition-all shadow-sm"
                      title="Switch Camera (Front/Back)"
                      aria-label="Switch camera"
                    >
                      <RefreshCw size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-primary text-on-primary ring-4 ring-primary/25 shadow-lg flex items-center justify-center active:scale-90 transition-transform"
                      title="Take Snapshot"
                      aria-label="Snap photo"
                    >
                      <Camera size={26} />
                    </button>

                    <div className="w-12 h-12"></div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Upload Photo View */}
            {activeTab === 'upload' && (
              <div className="flex flex-col items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (typeof ev.target?.result === 'string') {
                          setCapturedImage(ev.target.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-4/3 max-h-[50vh] rounded-3xl border-2 border-dashed border-primary/30 bg-surface-container-low hover:bg-surface-container/60 hover:border-primary transition-all flex flex-col items-center justify-center p-4 sm:p-6 text-center cursor-pointer group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform shadow-sm">
                    <Upload size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-base sm:text-headline-sm text-on-surface font-semibold">
                    Upload a portrait or selfie
                  </h3>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant mt-1 max-w-xs">
                    Tap to take photo or browse image files (JPEG, PNG, WEBP)
                  </p>
                  <div className="mt-3 sm:mt-4 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] sm:text-[11px] font-medium">
                    Encrypted &amp; analyzed with Gemini 3.6 Flash
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Image Ready Preview & Confirmation */
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-space-lg">
            <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[3/4] sm:aspect-4/3 rounded-3xl overflow-hidden bg-black/5 shadow-md shrink-0 mx-auto">
              <img
                src={capturedImage}
                alt="Captured for mood analysis"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-primary">
                Ready for Analysis
              </div>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left w-full">
              <div>
                <h3 className="text-lg sm:text-headline-md text-on-surface font-bold leading-tight">
                  Photo Ready for Emotion &amp; Mood Analysis
                </h3>
                <p className="text-xs sm:text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Gemini 3.6 Flash will evaluate your facial expression, posture, and affective cues to curate wellness activities, music, and yoga poses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={runMoodAnalysis}
                  disabled={isAnalyzing}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-on-primary text-sm sm:text-label-lg font-semibold shadow-md hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Sparkles size={18} className={isAnalyzing ? 'animate-spin' : ''} />
                  <span>{isAnalyzing ? 'Analyzing with Gemini AI...' : 'Analyze My Mood'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetake}
                  disabled={isAnalyzing}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-label-lg transition-colors"
                >
                  <RotateCcw size={16} />
                  <span>Retake / Upload New</span>
                </button>
              </div>

              {isAnalyzing && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-primary-container/20 border border-primary/20 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span>Gemini 3.6 Flash is synthesizing affective cues...</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* AI Analysis Results Section */}
      {analysisResult && (
        <section className="space-y-4 sm:space-y-space-lg animate-fade-in">
          {/* Card 1: Primary Mood Assessment */}
          <div className="bg-surface-container-lowest rounded-3xl p-4 sm:p-space-lg lg:p-space-xl border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.06)]">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-space-md">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-label-sm uppercase tracking-wider text-primary font-bold">
                    Detected Emotional State
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-container/40 text-on-primary-container text-xs font-semibold flex items-center gap-1">
                    <Zap size={12} className="text-primary" />
                    <span>{analysisResult.energyLevel} Energy</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 rounded-2xl bg-primary-container/30 shrink-0">
                    <MoodIcon mood={analysisResult.detectedMood} size={28} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-headline-lg text-on-surface font-bold leading-tight">
                      {analysisResult.detectedMood} • {analysisResult.moodTag}
                    </h2>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                      Psychophysiological valence score: <strong>{analysisResult.valenceScore}/100</strong>
                    </p>
                  </div>
                </div>

                {/* Valence Progress Bar */}
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden mt-1">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(Math.max(analysisResult.valenceScore, 10), 100)}%` }}
                  ></div>
                </div>

                <p className="text-xs sm:text-body-md text-on-surface bg-surface-container-low/70 p-3 sm:p-4 rounded-2xl border border-surface-container leading-relaxed">
                  {analysisResult.expressionAnalysis}
                </p>
              </div>

              {/* Log to Check-In Action Button */}
              <div className="shrink-0 space-y-1.5 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={handleLogToJournal}
                  disabled={saveSuccess}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-label-lg font-semibold transition-all shadow-sm ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary text-on-primary hover:bg-primary/90 active:scale-95'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Logged to Daily Check-In!</span>
                    </>
                  ) : (
                    <>
                      <Heart size={16} />
                      <span>Log to Daily Check-In</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant text-center">
                  Saves this mood and reflection into your wellness trends
                </p>
              </div>
            </div>
          </div>

          {/* Grid: 4 Dimension Recommendations (Activities, Songs, Yoga, Breathing) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-space-lg">
            {/* 1. Tailored Activities */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 sm:p-space-lg border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-space-md">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-sm">
                      <Activity size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-label-sm uppercase tracking-wider text-outline font-semibold">
                        Action Plan
                      </span>
                      <h3 className="text-sm sm:text-headline-sm text-on-surface font-semibold">
                        Recommended Activities
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] sm:text-[11px] font-semibold">
                    {analysisResult.activities.length} Practices
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {analysisResult.activities.map((act, index) => (
                    <div
                      key={index}
                      className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-surface-container/60 hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs sm:text-label-md text-on-surface font-bold">
                          {act.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] sm:text-[11px] font-semibold">
                            {act.duration}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] sm:text-[11px]">
                            {act.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Curated Songs & Acoustic Frequencies */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 sm:p-space-lg border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-space-md">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-sm">
                      <Music size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-label-sm uppercase tracking-wider text-outline font-semibold">
                        Acoustic Healing
                      </span>
                      <h3 className="text-sm sm:text-headline-sm text-on-surface font-semibold">
                        Curated Songs &amp; Music
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] sm:text-[11px] font-semibold">
                    Mood Synced
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {analysisResult.songs.map((song, index) => {
                    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `${song.title} ${song.artist}`
                    )}`;
                    return (
                      <div
                        key={index}
                        className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-surface-container/60 hover:bg-surface-container transition-colors flex items-start justify-between gap-2.5"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-label-md text-on-surface font-bold truncate">
                              {song.title}
                            </span>
                            <span className="text-on-surface-variant text-[11px] sm:text-xs truncate">
                              • {song.artist}
                            </span>
                          </div>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed text-[10px] sm:text-[11px] font-medium">
                            {song.genre}
                          </span>
                          <p className="text-xs sm:text-body-sm text-on-surface-variant pt-0.5 leading-relaxed">
                            {song.moodVibe}
                          </p>
                        </div>

                        <a
                          href={searchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-2.5 sm:p-3 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                          title="Listen on YouTube / Music"
                          aria-label={`Listen to ${song.title}`}
                        >
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Targeted Yoga Asanas */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 sm:p-space-lg border border-surface-container shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)]">
              <div className="flex items-center justify-between mb-3 sm:mb-space-md">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                    <Flame size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Somatic Alignment
                    </span>
                    <h3 className="text-sm sm:text-headline-sm text-on-surface font-semibold">
                      Targeted Yoga Asanas
                    </h3>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] sm:text-[11px] font-semibold">
                  Restorative Flow
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {analysisResult.yogaPoses.map((pose, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-surface-container/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <div>
                        <span className="text-xs sm:text-label-md text-on-surface font-bold">
                          {pose.englishName}
                        </span>
                        <span className="text-primary font-medium text-xs ml-1.5 italic">
                          ({pose.sanskritName})
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px]">
                        {pose.difficulty}
                      </span>
                    </div>

                    <p className="text-xs sm:text-body-sm text-primary font-medium">
                      Benefit: {pose.targetBenefit}
                    </p>

                    <div className="space-y-1 pt-1 border-t border-surface-container/50">
                      {pose.instructions.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-xs sm:text-body-sm text-on-surface-variant">
                          <span className="w-4 h-4 rounded-full bg-surface-container text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Live Guided Breathing Visualizer */}
            <div className="bg-gradient-to-br from-primary-container/20 to-tertiary-fixed/20 rounded-3xl p-4 sm:p-space-lg border border-primary/20 shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-space-md">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
                    <Wind size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-label-sm uppercase tracking-wider text-primary font-bold">
                      Interactive Breathwork
                    </span>
                    <h3 className="text-sm sm:text-headline-sm text-on-surface font-semibold">
                      {analysisResult.breathingTechnique.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-body-sm text-on-surface-variant mb-3 sm:mb-space-md leading-relaxed">
                  {analysisResult.breathingTechnique.guidance}
                </p>

                {/* Breathing Orb */}
                <div className="flex flex-col items-center justify-center py-4 sm:py-6">
                  <div
                    className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-xl border-4 ${
                      breathPhase === 'Inhale'
                        ? 'scale-110 bg-primary/25 border-primary text-primary'
                        : breathPhase === 'Hold'
                        ? 'scale-110 bg-tertiary-fixed border-tertiary text-on-tertiary-fixed'
                        : 'scale-90 bg-surface-container-high border-outline text-on-surface-variant'
                    }`}
                  >
                    <span className="text-sm sm:text-headline-md font-bold tracking-wider uppercase">
                      {breathPhase}
                    </span>
                    <span className="text-base sm:text-label-lg font-mono font-bold mt-0.5">
                      {breathSeconds}s
                    </span>
                  </div>

                  <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-surface-container-lowest/90 text-on-surface text-[11px] sm:text-label-sm font-semibold backdrop-blur-sm border border-surface-container text-center">
                    Pattern: {analysisResult.breathingTechnique.pattern}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-primary/10 text-center text-on-surface-variant text-[11px] sm:text-label-sm">
                <span>Follow the rhythm for 3–5 cycles to reset autonomic equilibrium</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
