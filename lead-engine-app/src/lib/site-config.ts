export const getSiteConfig = () => {
  // Use environment variable to determine which site builds
  const isBuilding = process.env.NEXT_PUBLIC_SITE === 'building';
  
  if (isBuilding) {
    return {
      domain: 'allaspectsbuilding.co.uk',
      name: 'All Aspects Building',
      phone: '0800 765 4321',
      primaryColor: 'bg-slate-800',
      textColor: 'text-slate-800',
      services: ['Extensions', 'Loft Conversions', 'Renovations', 'Roofing', 'Builders'],
      email: 'info@allaspectsbuilding.co.uk'
    };
  }

  return {
    domain: 'allaspectspaving.co.uk',
    name: 'All Aspects Paving',
    phone: '0800 959 6695',
    primaryColor: 'bg-blue-800',
    textColor: 'text-blue-800',
    services: ['Driveways', 'Patios', 'Block Paving', 'Resin', 'Landscaping', 'Garden Paths', 'Fencing', 'Brick Walls'],
    email: 'info@allaspectspaving.co.uk'
  };
};
