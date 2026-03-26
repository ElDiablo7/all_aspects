import { getSiteConfig } from '@/lib/site-config';
import Hero from '@/components/ui/Hero';
import QuoteForm from '@/components/forms/QuoteForm';

export default function Home() {
  const config = getSiteConfig();

  return (
    <div>
      <Hero 
        title={`Premium ${config.services[0]} & ${config.services[1]} Solutions`}
        subtitle={`Transform your property with ${config.name}'s expert team. Trusted by hundreds of homeowners for quality and reliability.`}
        themeColor={config.domain.includes('paving') ? 'bg-blue-900' : 'bg-slate-900'}
      />
      
      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${config.textColor}`}>Our Core Services</h2>
            <p className="text-slate-600 text-lg">We specialize in a wide range of services to improve and expand your home. Every project is completed to the highest standard.</p>
          </div>
          
          {(() => {
            const serviceData = [
              {
                image: 'https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/7b302b74-3ea4-4031-8877-cf8107b9ff5d/unnamed-2.webp',
                alt: 'Driveway installation by All Aspects Paving',
                description: 'From block paving to resin-bound surfaces — our driveways are built for beauty, durability, and long-lasting kerb appeal.',
              },
              {
                image: 'https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/a17be0a2-7086-4c54-8aa3-1be7a42b7253/unnamed-3.webp',
                alt: 'Patio installation by All Aspects Paving',
                description: 'Transform your outdoor space with a bespoke patio, expertly laid using Indian stone, porcelain, or block paving.',
              },
              {
                image: 'https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/615aab4f-ce9c-4f7e-9e5d-4ee81890ad1e/unnamed-4.webp',
                alt: 'Block paving installed by All Aspects Paving',
                description: 'Our signature block paving solutions offer unmatched precision and a premium finish that adds real value to your property.',
              },
            ];
            return (
              <div className="grid md:grid-cols-3 gap-8">
                {config.services.slice(0, 3).map((service, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={serviceData[index].image}
                        alt={serviceData[index].alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{service}</h3>
                      <p className="text-slate-600 mb-6">{serviceData[index].description}</p>
                      <a href={`/${service.toLowerCase().replace(' ', '-')}`} className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1">
                        Learn more <span>→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
             <div className="md:w-1/2 p-12 md:p-16 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose {config.name}?</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    No-Obligation Free Quotes
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    Fully Insured & Guaranteed Work
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    Transparent Pricing, No Hidden Fees
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    20+ Years Experience & Checkatrade 9.6/10 Rating
                  </li>
                </ul>
                <a href="#quote" className="btn-accent inline-block">Request a Site Survey</a>
             </div>
             <div className="md:w-1/2 min-h-64 relative w-full overflow-hidden" style={{minHeight: '300px'}}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                 src="https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/6571003b-70e6-4e48-a766-5b31e8cd53bd/unnamed-1.webp"
                 alt="All Aspects Paving completed project in Surrey"
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-slate-900/40"></div>
             </div>
           </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section id="quote" className="py-20 bg-slate-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="container relative z-10 mx-auto px-4 max-w-4xl pt-8">
            <div className="text-center mb-10">
              <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${config.textColor}`}>Get Your Free Quote</h2>
              <p className="text-slate-600 text-lg md:text-xl">Fill out the details below and our expert team will get right back to you.</p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
               <QuoteForm />
            </div>
         </div>
      </section>
    </div>
  );
}
