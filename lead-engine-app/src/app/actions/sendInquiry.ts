'use server';

import { getSiteConfig } from '@/lib/site-config';

export async function sendInquiry(messages: {role: string, text: string}[], siteContext: string) {
  const config = getSiteConfig();
  const businessEmail = config.email || 'info@allaspectspaving.co.uk';
  
  const transcript = messages
    .map(m => `${m.role.toUpperCase()}: ${m.text}`)
    .join('\n\n');

  console.log('────────────────────────────────────────────────────────────────');
  console.log(`[EMAIL INQUIRY] Sending to: ${businessEmail}`);
  console.log(`[CONTEXT] ${siteContext.toUpperCase()}`);
  console.log('────────────────────────────────────────────────────────────────');
  console.log(transcript);
  console.log('────────────────────────────────────────────────────────────────');

  // Simulation of email sending
  await new Promise(resolve => setTimeout(resolve, 1500));

  return { 
    success: true, 
    message: 'Your inquiry has been sent to our team. We\'ll be in touch shortly!' 
  };
}
