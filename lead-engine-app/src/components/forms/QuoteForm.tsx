'use client';

import { useActionState } from 'react';
import { submitLead } from '@/app/actions/submitLead';
import { getSiteConfig } from '@/lib/site-config';

export default function QuoteForm() {
  const config = getSiteConfig();
  const [state, formAction, isPending] = useActionState(submitLead, null);

  if (state?.success) {
    return (
      <div className="glass-dark border border-emerald-500/30 text-emerald-100 p-8 rounded-2xl text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-2 text-white">Quote Request Sent!</h3>
        <p className="mb-6 text-emerald-100/80">Thank you. We will review your details and be in touch shortly to arrange a free site survey.</p>
        <button className="btn-accent px-8" onClick={() => window.location.reload()}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 text-left relative">
      <div>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
          <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
          Project Details
        </h3>
      </div>
      
      {state?.error && (
         <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl font-semibold mb-6">
            ⚠️ {state.error}
         </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Service Type *</label>
          <select name="serviceType" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none">
            <option value="" className="text-slate-900">Select a service...</option>
            {config.services.map(s => (
               <option key={s} value={s.toLowerCase()} className="text-slate-900">{s}</option>
            ))}
            <option value="other" className="text-slate-900">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Timeline *</label>
          <select name="timeline" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none">
            <option value="" className="text-slate-900">When do you need it?</option>
            <option value="asap" className="text-slate-900">ASAP / Ready now</option>
            <option value="1_month" className="text-slate-900">Within 1 Month</option>
            <option value="3_months" className="text-slate-900">1-3 Months</option>
            <option value="flexible" className="text-slate-900">Flexible / Planning</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-100 mb-2">Estimated Budget *</label>
          <select name="budgetRange" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none">
             <option value="" className="text-slate-900">Select budget range...</option>
             <option value="under_1000" className="text-slate-900">Under £1,000</option>
             <option value="1000_5000" className="text-slate-900">£1,000 - £5,000</option>
             <option value="5000_10000" className="text-slate-900">£5,000 - £10,000</option>
             <option value="10000_plus" className="text-slate-900">£10,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-blue-100 mb-2">Project Notes & Requirements</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none" placeholder="Tell us more about what you need..."></textarea>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mt-8 mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
          <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
          Your Details
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Full Name *</label>
          <input type="text" name="fullName" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Postcode *</label>
          <input type="text" name="postcode" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none" placeholder="CR0 1AB" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Phone Number *</label>
          <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none" placeholder="07123 456789" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">Email Address</label>
          <input type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all outline-none" placeholder="john@example.com" />
        </div>
      </div>

      <div className="pt-8">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full btn-accent text-lg shadow-2xl py-4 rounded-2xl"
        >
          {isPending ? 'Processing Lead...' : 'Get My Free Quote →'}
        </button>
        <div className="flex items-center justify-center gap-2 mt-6 text-blue-200/60">
           <svg className="w-4 h-4 shadow-inner" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
           <p className="text-xs">Your data is encrypted and secure.</p>
        </div>
      </div>
    </form>
  );
}
