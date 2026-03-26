'use client';

import { useActionState } from 'react';
import { submitLead } from '@/app/actions/submitLead';
import { getSiteConfig } from '@/lib/site-config';

export default function QuoteForm() {
  const config = getSiteConfig();
  const [state, formAction, isPending] = useActionState(submitLead, null);

  if (state?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center shadow-inner">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
        <p className="mb-6">Thank you. We will review your details and be in touch shortly to arrange a free site survey.</p>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 text-left relative">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Project Details</h3>
      </div>
      
      {state?.error && (
         <div className="bg-red-50 text-red-600 p-4 rounded-lg font-bold">
            {state.error}
         </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Service Type *</label>
          <select name="serviceType" aria-label="Service Type" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white">
            <option value="">Select a service...</option>
            {config.services.map(s => (
               <option key={s} value={s.toLowerCase()}>{s}</option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Timeline *</label>
          <select name="timeline" aria-label="Timeline" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white">
            <option value="">When do you need it?</option>
            <option value="asap">ASAP / Ready now</option>
            <option value="1_month">Within 1 Month</option>
            <option value="3_months">1-3 Months</option>
            <option value="flexible">Flexible / Planning</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Estimated Budget *</label>
          <select name="budgetRange" aria-label="Estimated Budget" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white">
             <option value="">Select budget range...</option>
             <option value="under_1000">Under £1,000</option>
             <option value="1000_5000">£1,000 - £5,000</option>
             <option value="5000_10000">£5,000 - £10,000</option>
             <option value="10000_plus">£10,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Project Notes & Requirements</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Tell us more about what you need..."></textarea>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-6 border-b pb-2">Your Details</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
          <input type="text" name="fullName" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Postcode *</label>
          <input type="text" name="postcode" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="CR0 1AB" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
          <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="07123 456789" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="john@example.com" />
        </div>
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full btn-accent text-lg shadow-xl"
        >
          {isPending ? 'Sending Request...' : 'Get My Free Quote'}
        </button>
        <p className="text-xs text-center text-slate-500 mt-4">We respect your privacy. Your information is 100% secure.</p>
      </div>
    </form>
  );
}
