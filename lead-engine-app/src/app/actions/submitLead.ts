'use server';

export async function submitLead(prevState: unknown, formData: FormData) {
  const data = {
    fullName: formData.get('fullName') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    postcode: formData.get('postcode') as string,
    serviceType: formData.get('serviceType') as string,
    budgetRange: formData.get('budgetRange') as string,
    timeline: formData.get('timeline') as string,
    message: formData.get('message') as string,
    timestamp: new Date().toISOString(),
  };

  // Validation
  if (!data.fullName || !data.phone || !data.postcode || !data.serviceType || !data.budgetRange || !data.timeline) {
    return { success: false, error: 'Please fill out all required fields.' };
  }

  // Routing Logic
  const pavingServices = ['driveway', 'block paving', 'resin driveway', 'patio', 'paving', 'landscaping'];
  const bucket = pavingServices.includes(data.serviceType.toLowerCase()) ? 'PAVING' : 'BUILDING';

  // Scoring Logic
  let score = 0;
  
  if (data.budgetRange === '10000_plus') score += 3;
  if (data.timeline === 'asap') score += 2;
  
  const hotKeywords = ['full', 'new', 'install', 'complete', 'urgently'];
  if (data.message && hotKeywords.some(kw => data.message.toLowerCase().includes(kw))) {
    score += 2;
  }

  const coreRegions = ['CR', 'SM', 'KT', 'TW', 'GU', 'RH']; // Surrey & South London coverage
  if (data.postcode && coreRegions.some(region => data.postcode.toUpperCase().startsWith(region))) {
    score += 3; // High regional intent
  }

  let temperature = 'Cold';
  if (score >= 8) temperature = 'Hot';
  else if (score >= 4) temperature = 'Warm';

  // Simulation of CRM / Webhook integration
  try {
     const leadSummary = `[NEW LEAD] ${bucket} Pipeline | ${data.fullName} | ${temperature} (${score} pts) | ${data.postcode}`;
     console.log('────────────────────────────────────────────────────────────────');
     console.log(leadSummary);
     console.log('Details:', JSON.stringify(data, null, 2));
     console.log('────────────────────────────────────────────────────────────────');

     // In production, uncomment this to send to a real endpoint:
     /*
     await fetch(process.env.WEBHOOK_URL!, {
       method: 'POST',
       body: JSON.stringify({ ...data, bucket, score, temperature }),
       headers: { 'Content-Type': 'application/json' }
     });
     */

     // Simulate a network delay for the UX
     await new Promise(resolve => setTimeout(resolve, 1500));

     return { 
       success: true, 
       message: 'Lead captured and routed successfully.',
       leadMetadata: { bucket, temperature, score }
     };
  } catch (err) {
     console.error('Lead submission failed:', err);
     return { success: false, error: 'An error occurred while processing your request. Please call us directly.' };
  }
}
