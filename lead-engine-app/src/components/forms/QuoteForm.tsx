'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { submitLead } from '@/app/actions/submitLead';
import { getSiteConfig } from '@/lib/site-config';

export default function QuoteForm() {
  const config = getSiteConfig();
  const [state, formAction, isPending] = useActionState(submitLead, null);

  if (state?.success) {
    return (
      <div className="glass-dark border border-emerald-500/30 text-emerald-100 p-10 rounded-3xl text-center shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-7xl mb-6 animate-bounce">✨</div>
        <h3 className="text-3xl font-extrabold mb-4 text-white tracking-tight">Quote Request Sent!</h3>
        <p className="mb-8 text-emerald-100/80 text-lg leading-relaxed max-w-md mx-auto">
          Thank you, <strong>{state.message?.split('.')[0]}</strong>. We&apos;ve received your details and our experts are already reviewing your project.
        </p>
        <button 
          className="btn-accent px-10 py-4 text-lg rounded-2xl shadow-emerald-500/20" 
          onClick={() => window.location.reload()}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8 text-left relative">
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-3">
          <span className="w-2.5 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
          Project Details
        </h3>
      </div>
      
      {state?.message && !state.success && !state.errors && (
         <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-5 rounded-2xl font-medium mb-8 animate-in shake duration-300">
            ⚠️ {state.message}
         </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Service Type *</label>
          <div className="relative group">
            <select 
              name="serviceType" 
              required 
              aria-label="Select Service Type"
              className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.serviceType ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-white/5'} text-white text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer placeholder:text-blue-100/50 shadow-inner`}
            >
              <option value="" className="text-slate-900">Select a service...</option>
              {config.services.map(s => (
                 <option key={s} value={s.toLowerCase()} className="text-slate-900">{s}</option>
              ))}
              <option value="other" className="text-slate-900">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-amber-500 transition-colors">▼</div>
          </div>
          {state?.errors?.serviceType && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.serviceType[0]}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Timeline *</label>
          <div className="relative group">
            <select 
              name="timeline" 
              required 
              aria-label="Select Project Timeline"
              className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.timeline ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-white/5'} text-white text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer placeholder:text-blue-100/50 shadow-inner`}
            >
              <option value="" className="text-slate-900">When do you need it?</option>
              <option value="asap" className="text-slate-900">ASAP / Ready now</option>
              <option value="1_month" className="text-slate-900">Within 1 Month</option>
              <option value="3_months" className="text-slate-900">1-3 Months</option>
              <option value="flexible" className="text-slate-900">Flexible / Planning</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-amber-500 transition-colors">▼</div>
          </div>
          {state?.errors?.timeline && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.timeline[0]}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-blue-100 ml-1">Estimated Budget *</label>
        <div className="relative group">
          <select 
            name="budgetRange" 
            required 
            aria-label="Select Estimated Budget"
            className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.budgetRange ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-white/5'} text-white text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer placeholder:text-blue-100/50 shadow-inner`}
          >
             <option value="" className="text-slate-900">Select budget range...</option>
             <option value="under_1000" className="text-slate-900">Under £1,000</option>
             <option value="1000_5000" className="text-slate-900">£1,000 - £5,000</option>
             <option value="5000_10000" className="text-slate-900">£5,000 - £10,000</option>
             <option value="10000_plus" className="text-slate-900">£10,000+</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-amber-500 transition-colors">▼</div>
        </div>
        {state?.errors?.budgetRange && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.budgetRange[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-blue-100 ml-1">Project Notes & Requirements</label>
        <textarea 
          name="message" 
          rows={3} 
          className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all outline-none resize-none placeholder:text-blue-100/50 shadow-inner" 
          placeholder="Tell us more about what you need... (optional)"
        ></textarea>
      </div>

      <div className="pt-4">
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-3">
          <span className="w-2.5 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
          Your Details
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Full Name *</label>
          <input 
            type="text" 
            name="fullName" 
            required 
            className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.fullName ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-white/5'} text-white text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all outline-none placeholder:text-blue-100/50 shadow-inner`} 
            placeholder="John Doe" 
          />
          {state?.errors?.fullName && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.fullName[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Postcode *</label>
          <input 
            type="text" 
            name="postcode" 
            required 
            className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.postcode ? 'border-red-500/50 bg-red-500/10' : 'border-white/20 bg-white/10'} text-white text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/15 transition-all outline-none placeholder:text-blue-100/70`} 
            placeholder="CR0 1AB" 
          />
          {state?.errors?.postcode && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.postcode[0]}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Phone Number *</label>
          <input 
            type="tel" 
            name="phone" 
            required 
            className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.phone ? 'border-red-500/50 bg-red-500/10' : 'border-white/20 bg-white/10'} text-white text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/15 transition-all outline-none placeholder:text-blue-100/70`} 
            placeholder="07123 456789" 
          />
          {state?.errors?.phone && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.phone[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-blue-100 ml-1">Email Address</label>
          <input 
            type="email" 
            name="email" 
            className={`w-full px-5 py-4 rounded-2xl border ${state?.errors?.email ? 'border-red-500/50 bg-red-500/10' : 'border-white/20 bg-white/10'} text-white text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/15 transition-all outline-none placeholder:text-blue-100/70`} 
            placeholder="john@example.com" 
          />
          {state?.errors?.email && <p className="text-xs text-red-400 font-medium ml-1">{state.errors.email[0]}</p>}
        </div>
      </div>

      <div className="pt-10">
        <div className="mb-6 flex items-start gap-3 text-blue-200/60 ml-1">
           <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-amber-500 cursor-pointer" id="privacy" />
           <label htmlFor="privacy" className="text-xs leading-tight cursor-pointer">
             I agree to the <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link> and consent to being contacted regarding this project request.
           </label>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full btn-accent text-xl py-6 rounded-3xl flex items-center justify-center gap-3 transition-all ${isPending ? 'opacity-70 cursor-not-allowed grayscale' : 'hover:scale-102 active:scale-95'}`}
        >
          {isPending ? (
            <>
              <span className="w-6 h-6 border-4 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></span>
              Generating Quote...
            </>
          ) : 'Request My Free Quote ⚡'}
        </button>
        
        <div className="flex items-center justify-center gap-3 mt-8 text-blue-200/40">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
           <p className="text-xs font-medium tracking-wide">SECURE 256-BIT ENCRYPTED SUBMISSION</p>
        </div>
      </div>
    </form>
  );
}
