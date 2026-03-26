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
  
  const hotKeywords = ['full', 'new', 'install', 'complete'];
  if (data.message && hotKeywords.some(kw => data.message.toLowerCase().includes(kw))) {
    score += 2;
  }

  // Simple postcode check (mocking core radius logic)
  const coreRegions = ['CR', 'SM', 'KT']; // Croydon, Sutton, Kingston
  if (data.postcode && coreRegions.some(region => data.postcode.toUpperCase().startsWith(region))) {
    score += 2;
  }

  // Photo upload (mocked absent for now)
  // score += 1

  let temperature = 'Cold';
  if (score >= 6) temperature = 'Hot';
  else if (score >= 3) temperature = 'Warm';

  // Here you would normally send this to a CRM or Webhook
  console.log(`[LEAD RECEIVED] ${bucket} Pipeline | Temp: ${temperature} | Score: ${score}`);
  console.log(data);

  return { 
    success: true, 
    message: 'Thank you! Your request has been received.',
    leadData: { bucket, score, temperature }
  };
}
