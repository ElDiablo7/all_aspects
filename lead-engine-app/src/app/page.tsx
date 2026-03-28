import Image from 'next/image';
import { getSiteConfig } from '@/lib/site-config';
import Hero from '@/components/ui/Hero';
import QuoteForm from '@/components/forms/QuoteForm';

export default function Home() {
  const config = getSiteConfig();

  return (
    <div>
      <Hero 
        title={`Premium ${config.services[0]} & ${config.services[1]} Solutions`}
        subtitle={`20+ Years Excellence in ${config.services[0]}. Trusted by hundreds across Surrey & London for quality workmanship and bespoke designs.`}
        themeColor={config.domain.includes('paving') ? 'bg-blue-900' : 'bg-slate-900'}
      />
      
      {/* Services Section */}
      <section className="py-24 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1a2e6e_0%,_#0f1e4a_100%)]">
        {/* Animated Orbs for Depth */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] orb-blue opacity-20 blur-[120px] animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] orb-amber opacity-10 blur-[120px] animate-pulse-slow pointer-events-none"></div>
        <div className="bg-pattern-dots-dark absolute inset-0 opacity-30 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Core Services</h2>
            <p className="text-blue-200 text-lg">We specialize in a wide range of services to improve and expand your home. Every project is completed to the highest standard.</p>
          </div>
          
          {(() => {
            const serviceData = [
              {
                image: '/images/paving_driveway.png',
                alt: 'Premium driveway installation by All Aspects Paving',
                description: 'From block paving to resin-bound surfaces — our driveways are built for beauty, durability, and long-lasting kerb appeal.',
              },
              {
                image: '/images/paving_patio.png',
                alt: 'Bespoke patio installation by All Aspects Paving',
                description: 'Transform your outdoor space with a bespoke patio, expertly laid using Indian stone, porcelain, or block paving.',
              },
              {
                image: '/images/paving_block.png',
                alt: 'High-quality block paving installed by All Aspects Paving',
                description: 'Our signature block paving solutions offer unmatched precision and a premium finish that adds real value to your property.',
              },
            ];
            return (
              <div className="grid md:grid-cols-3 gap-8">
                {config.services.slice(0, 3).map((service, index) => (
                  <div key={index} className="glass-card rounded-3xl group overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-500">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={serviceData[index].image}
                        alt={serviceData[index].alt}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 glass-shiny p-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-amber-400 text-xs font-bold tracking-tighter">PREMIUM</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-white mb-3">{service}</h3>
                      <p className="text-blue-200 mb-6">{serviceData[index].description}</p>
                      <a href={`/${service.toLowerCase().replace(' ', '-')}`} className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1 transition-colors">
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

      {/* Trust Block with Depth */}
      <section className="py-24 relative overflow-hidden bg-[#0f1e4a]">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center gap-12 glass-shiny rounded-[40px] overflow-hidden depth-3d border border-white/10 group">
             <div className="md:w-1/2 p-12 md:p-16 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose {config.name}?</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    10-Year Guarantee on All Workmanship
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    Checkatrade Member with 9.6/10 Average Score
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    Fully Insured & Family Run Since 2004
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">✓</span>
                    No-Obligation Free Written Quotations
                  </li>
                </ul>
                <a href="#quote" className="btn-accent inline-block">Request a Site Survey</a>
             </div>
              <div className="md:w-1/2 min-h-[300px] relative w-full overflow-hidden">
                <Image
                  src="https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/6571003b-70e6-4e48-a766-5b31e8cd53bd/unnamed-1.webp"
                  alt="All Aspects Paving completed project in Surrey"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-slate-900/40"></div>
              </div>
           </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section id="quote" className="py-24 relative overflow-hidden bg-[radial-gradient(circle_at_bottom,_#1a2e6e_0%,_#050b1d_100%)]">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] orb-amber opacity-10 blur-[150px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] orb-blue opacity-15 blur-[150px] pointer-events-none"></div>
         <div className="bg-pattern-dots absolute inset-0 pointer-events-none"></div>
         
         <div className="container relative z-10 mx-auto px-4 max-w-4xl pt-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Get Your Free Quote</h2>
              <p className="text-blue-200 text-lg md:text-xl">Fill out the details below and our expert team will get right back to you.</p>
            </div>
            <div className="glass-dark p-8 md:p-12 rounded-3xl group transition-all duration-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.1)]">
               <QuoteForm />
            </div>
         </div>
      </section>

      {/* Areas We Cover */}
      <section className="py-20 bg-[#0a1535] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-xl mb-2">Areas We Cover</h3>
              <p className="text-blue-200/60 text-sm max-w-md">Proudly serving Surrey, London, and West Sussex — including Wallington, Croydon, Sutton, Epsom, and surrounding boroughs.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-amber-500/80 font-bold text-xs tracking-widest uppercase">
               <span>Surrey</span> • <span>London</span> • <span>West Sussex</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
