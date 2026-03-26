import { notFound } from 'next/navigation';
import Hero from '@/components/ui/Hero';
import QuoteForm from '@/components/forms/QuoteForm';
import { getSiteConfig } from '@/lib/site-config';

// The 30 pages mapped to slugs
const pavingPages = [
  'driveways-croydon', 'driveways-sutton', 'driveways-surrey',
  'block-paving-croydon', 'block-paving-sutton', 
  'resin-driveways-croydon', 'resin-driveways-sutton',
  'patios-croydon', 'patios-epsom', 'landscaping-croydon',
  'driveway-cost-guide', 'patio-cost-guide', 'resin-vs-block-paving',
  'why-choose-us', 'reviews'
];

const buildingPages = [
  'builders-croydon', 'builders-sutton', 'builders-surrey',
  'home-extensions-surrey', 'home-extensions-croydon',
  'loft-conversions-croydon', 'renovations-sutton',
  'roofing-croydon', 'roofing-surrey',
  'extension-cost-guide', 'renovation-cost-guide',
  'planning-permission-guide', 'house-refurbishment-croydon',
  'why-choose-us', 'reviews'
];

export function generateStaticParams() {
  return [...pavingPages, ...buildingPages].map(slug => ({ slug }));
}

function generateMetadataTitle(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${generateMetadataTitle(slug)} | Premium Solutions`,
    description: `Expert ${generateMetadataTitle(slug).toLowerCase()} services with free quotes and guaranteed quality.`
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const config = getSiteConfig();
  
  // Decide if this page is known
  const isPavingSlug = pavingPages.includes(slug);
  const isBuildingSlug = buildingPages.includes(slug);
  
  if (!isPavingSlug && !isBuildingSlug) {
    if (slug !== 'services' && slug !== 'about' && slug !== 'contact') {
       notFound();
    }
  }

  const title = generateMetadataTitle(slug);

  return (
    <>
      <Hero 
        title={title}
        subtitle={`The leading specialists for ${title.toLowerCase()} in your local area. Get a guaranteed quote today.`}
        themeColor={config.domain.includes('paving') ? 'bg-blue-900' : 'bg-slate-900'}
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl font-bold text-slate-800 mb-6">Expert {title}</h2>
           <p className="text-lg text-slate-600 mb-6">
             When you&apos;re looking for reliable <strong>{title.toLowerCase()}</strong>, quality and trust are everything. 
             At {config.name}, we pride ourselves on delivering outstanding results on every single project. 
             Whether you need a full installation or minor repairs, our team has the experience to get it done right, on time, and within budget.
           </p>
           
           <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Our Process</h3>
           <ul className="space-y-4 mb-10 text-slate-600">
             <li className="flex gap-4"><span className="font-bold text-amber-500 w-6">1.</span> <div><strong>Free Site Survey:</strong> We assess your requirements and provide honest advice.</div></li>
             <li className="flex gap-4"><span className="font-bold text-amber-500 w-6">2.</span> <div><strong>Detailed Quote:</strong> Transparent pricing with no hidden surprises.</div></li>
             <li className="flex gap-4"><span className="font-bold text-amber-500 w-6">3.</span> <div><strong>Professional Execution:</strong> High-quality materials and expert craftsmanship.</div></li>
             <li className="flex gap-4"><span className="font-bold text-amber-500 w-6">4.</span> <div><strong>Final Sign-off:</strong> We only finish when you are 100% satisfied.</div></li>
           </ul>
        </div>
      </section>
      
      {/* Quote Form Embed */}
      <section id="quote" className="py-20 bg-slate-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="container relative z-10 mx-auto px-4 max-w-4xl pt-8">
            <div className="text-center mb-10">
              <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${config.textColor}`}>Get Your Free Quote</h2>
              <p className="text-slate-600 text-lg md:text-xl">Enquire about <strong>{title.toLowerCase()}</strong> today.</p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
               <QuoteForm />
            </div>
         </div>
      </section>
    </>
  );
}
