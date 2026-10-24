/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const HelpResources: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px] text-error">emergency</span>
          <span>SUPPORT &amp; CRISIS NETWORK</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Help &amp; Professional Support Directory
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          MindBloom is designed for proactive everyday self-care. If you or someone you care about is experiencing profound psychological distress, free and confidential support is accessible right now.
        </p>
      </section>

      {/* Immediate Emergency Notice Banner */}
      <div className="p-6 rounded-3xl bg-error-container/40 border border-error/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">crisis_alert</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              In Immediate Physical or Mental Emergency?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Please contact emergency response or reach out directly to licensed crisis counselors.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:18005990019"
            className="px-5 py-2.5 bg-error text-on-error font-label-md text-label-md font-semibold rounded-xl hover:opacity-95 shadow-sm transition-opacity"
          >
            Call Kiran (India)
          </a>
          <a
            href="tel:988"
            className="px-5 py-2.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold rounded-xl hover:bg-surface-container transition-colors shadow-sm"
          >
            Call 988 (USA)
          </a>
        </div>
      </div>

      {/* Verified Support Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resource 1: Kiran Helpline */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
              India • Govt. of India
            </span>
            <span className="material-symbols-outlined text-primary">verified</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Kiran Mental Health Toll-Free
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              24/7 dedicated helpline provided by the Ministry of Social Justice and Empowerment offering early screening, psychological first aid, and crisis management in 13 languages.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
            <span className="font-mono font-bold text-primary">1800-599-0019</span>
            <a
              href="tel:18005990019"
              className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary transition-colors"
            >
              Call Free
            </a>
          </div>
        </div>

        {/* Resource 2: Vandrevala Foundation */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
              India • 24/7 Crisis Support
            </span>
            <span className="material-symbols-outlined text-primary">support_agent</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Vandrevala Foundation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Experienced counseling psychologists addressing academic stress, anxiety, depression, and family challenges across India with complete anonymity.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
            <span className="font-mono font-bold text-primary">+91 9999 666 555</span>
            <a
              href="tel:+919999666555"
              className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary transition-colors"
            >
              Call Helpline
            </a>
          </div>
        </div>

        {/* Resource 3: Tele-MANAS */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
              India • NIMHANS Apex
            </span>
            <span className="material-symbols-outlined text-primary">local_hospital</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Tele-MANAS (NIMHANS)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              National tele-mental health programme of India spearheaded by NIMHANS, Bengaluru, delivering round-the-clock psychiatric and counseling consultations.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
            <span className="font-mono font-bold text-primary">14416 / 1800 891 4416</span>
            <a
              href="tel:14416"
              className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary transition-colors"
            >
              Dial 14416
            </a>
          </div>
        </div>

        {/* Resource 4: 988 Suicide & Crisis Lifeline */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold">
              USA &amp; International
            </span>
            <span className="material-symbols-outlined text-error">phone_in_talk</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              988 Suicide &amp; Crisis Lifeline
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Free, confidential 24/7 crisis support available by phone call or SMS text message for individuals in suicidal crisis or emotional distress.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
            <span className="font-mono font-bold text-primary">Call or Text 988</span>
            <a
              href="tel:988"
              className="px-4 py-1.5 bg-error text-on-error font-label-sm text-label-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact 988
            </a>
          </div>
        </div>
      </div>

      {/* Professional Counseling Network */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Professional Counseling &amp; Advisory Network
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Licensed Clinical Psychologists &amp; Certified Therapists
            </span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          If you are encountering persistent stress, anxiety, or burnout, connecting with a licensed mental health professional can provide structured therapeutic guidance and evidence-based coping strategies tailored to your life. Reaching out is an empowering act of self-care.
        </p>
      </div>
    </div>
  );
};
