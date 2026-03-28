import { notFound } from 'next/navigation';
import Hero from '@/components/ui/Hero';
import QuoteForm from '@/components/forms/QuoteForm';
import { getSiteConfig } from '@/lib/site-config';

// The 30 pages mapped to slugs
const pavingPages = [
  'driveways', 'patios', 'block-paving', 'resin', 'landscaping',
  'driveways-croydon', 'driveways-sutton', 'driveways-surrey',
  'block-paving-croydon', 'block-paving-sutton', 
  'resin-driveways-croydon', 'resin-driveways-sutton',
  'patios-croydon', 'patios-epsom', 'landscaping-croydon',
  'driveway-cost-guide', 'patio-cost-guide', 'resin-vs-block-paving',
  'why-choose-us', 'reviews', 'privacy', 'faq'
];

const buildingPages = [
  'extensions', 'loft-conversions', 'renovations', 'roofing', 'builders',
  'builders-croydon', 'builders-sutton', 'builders-surrey',
  'home-extensions-surrey', 'home-extensions-croydon',
  'loft-conversions-croydon', 'renovations-sutton',
  'roofing-croydon', 'roofing-surrey',
  'extension-cost-guide', 'renovation-cost-guide',
  'planning-permission-guide', 'house-refurbishment-croydon',
  'why-choose-us', 'reviews', 'privacy', 'faq'
];

export function generateStaticParams() {
  return [...new Set([...pavingPages, ...buildingPages])].map(slug => ({ slug }));
}

function generateMetadataTitle(slug: string) {
  if (slug === 'faq') return 'Frequently Asked Questions';
  if (slug === 'privacy') return 'Privacy Policy';
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

  if (slug === 'privacy') {
    return (
      <>
        <Hero title="Privacy Policy" subtitle="How we protect your data at All Aspects." themeColor={config.primaryColor} />
        <section className="py-20 bg-white min-h-[60vh]">
          <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
            <h2 className="text-3xl font-bold mb-8">Data Protection & Privacy</h2>
            <p className="mb-6 text-slate-600">
              At {config.name}, we are committed to protecting and respecting your privacy. This policy explains when and why we collect personal information about people who visit our website, how we use it, the conditions under which we may disclose it to others and how we keep it secure.
            </p>
            <h3 className="text-2xl font-bold mb-4">How do we collect information?</h3>
            <p className="mb-6 text-slate-600">
              We obtain information about you when you use our website, for example, when you contact us about products and services or if you complete our Get a Quote form.
            </p>
            <h3 className="text-2xl font-bold mb-4">What type of information is collected?</h3>
            <p className="mb-6 text-slate-600">
              The personal information we collect might include your name, address, email address, phone number, and IP address. If you make a purchase from us, your card information is not held by us, it is collected by our third party payment processors, who specialize in the secure online capture and processing of credit/debit card transactions.
            </p>
            <p className="text-slate-500 text-sm mt-12 italic border-t pt-8">
              Last updated: March 2026. For further enquiries, please contact us at {config.email}.
            </p>
          </div>
        </section>
      </>
    );
  }

  if (slug === 'faq') {
    return (
      <>
        <Hero title="Frequently Asked Questions" subtitle="Common questions about our paving and building services." themeColor={config.primaryColor} />
        <section className="py-20 bg-white min-h-[60vh]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {[
                { q: "How long does a typical driveway installation take?", a: "Most residential driveways are completed within 5-7 working days, depending on the scale and material chosen (Block paving, resin, etc)." },
                { q: "Do you offer free quotes and site surveys?", a: "Yes, we provide 100% free, no-obligation site surveys and written quotations within 24-48 hours of visiting your property." },
                { q: "Are your works guaranteed?", a: "Absolutely. All our installations come with a comprehensive guarantee. We are fully insured and Checkatrade vetted." },
                { q: "What areas do you cover?", a: "We cover all of Surrey and South London, including Croydon, Sutton, Epsom, Kingston, and surrounding areas." }
              ].map((item, i) => (
                <div key={i} className="glass-dark-light p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {item.q}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium pl-5">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center glass-dark p-10 rounded-3xl border border-white/10">
               <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
               <p className="text-blue-200 mb-8 max-w-lg mx-auto italic">Our team is always happy to help with technical queries or planning advice.</p>
               <QuoteForm />
            </div>
          </div>
        </section>
      </>
    );
  }

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
            <div className="glass-dark p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 group transition-all duration-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.1)]">
               <QuoteForm />
            </div>
         </div>
      </section>
    </>
  );
}
