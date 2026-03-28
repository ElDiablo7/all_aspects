'use server';

import { z } from 'zod';
import { getSiteConfig } from '@/lib/site-config';

const LeadSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  postcode: z.string().min(5, 'Valid UK postcode is required'),
  serviceType: z.string().min(1, 'Please select a service'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected'), // Must be empty
});

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  leadMetadata?: {
    bucket: string;
    temperature: string;
    score: number;
  };
};

export async function submitLead(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const config = getSiteConfig();
  const businessEmail = config.email || 'info@allaspectspaving.co.uk';

  const rawData = {
    fullName: formData.get('fullName') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    postcode: formData.get('postcode') as string,
    serviceType: formData.get('serviceType') as string,
    budgetRange: formData.get('budgetRange') as string,
    timeline: formData.get('timeline') as string,
    message: formData.get('message') as string,
    honeypot: formData.get('fax_number') as string, // Updated field name
  };

  // 1. Validate with Zod
  const validatedFields = LeadSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = validatedFields.data;

  // 2. Routing Logic
  const pavingServices = ['driveway', 'driveways', 'block paving', 'resin', 'resin driveway', 'patio', 'patios', 'paving', 'landscaping'];
  const bucket = pavingServices.includes(data.serviceType.toLowerCase()) ? 'PAVING' : 'BUILDING';

  // 3. Scoring Logic
  let score = 0;
  
  if (data.budgetRange === '10000_plus') score += 3;
  if (data.timeline === 'asap') score += 2;
  
  const hotKeywords = ['full', 'new', 'install', 'complete', 'urgently'];
  if (data.message && hotKeywords.some(kw => data.message?.toLowerCase().includes(kw))) {
    score += 2;
  }

  const coreRegions = ['CR', 'SM', 'KT', 'TW', 'GU', 'RH'];
  if (data.postcode && coreRegions.some(region => data.postcode.toUpperCase().startsWith(region))) {
    score += 3;
  }

  let temperature = 'Cold';
  if (score >= 8) temperature = 'Hot';
  else if (score >= 4) temperature = 'Warm';

  // 4. Submission Processing
  try {
     const leadSummary = `[NEW LEAD] ${bucket} Pipeline | ${data.fullName} | ${temperature} (${score} pts) | ${data.postcode}`;
     console.log('────────────────────────────────────────────────────────────────');
     console.log(leadSummary);
     console.log(`[EMAIL ROUTING] Forwarding to: ${businessEmail}`);
     console.log('Details:', JSON.stringify({ ...data, timestamp: new Date().toISOString() }, null, 2));
     console.log('────────────────────────────────────────────────────────────────');

     // Simulate network delay
     await new Promise(resolve => setTimeout(resolve, 1500));

     return { 
       success: true, 
       message: 'Your request has been received. Our team will contact you shortly.',
       leadMetadata: { bucket, temperature, score }
     };
  } catch (err) {
     console.error('Lead submission failure:', err);
     return { 
       success: false, 
       message: 'A technical error occurred. Please call us directly for a faster response.' 
     };
  }
}
