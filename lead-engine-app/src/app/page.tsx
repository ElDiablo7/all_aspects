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
          
          <div className="grid md:grid-cols-3 gap-8">
            {config.services.slice(0, 3).map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
                <div className={`w-14 h-14 rounded-xl ${config.primaryColor} flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:-translate-y-2 transition-transform`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service}</h3>
                <p className="text-slate-600 mb-6">Expert {service.toLowerCase()} installed with precision and care to stand the test of time.</p>
                <a href={`/${service.toLowerCase().replace(' ', '-')}`} className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1">
                  Learn more <span>→</span>
                </a>
              </div>
            ))}
          </div>
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
                    Expert Tradesmen
                  </li>
                </ul>
                <a href="#quote" className="btn-accent inline-block">Request a Site Survey</a>
             </div>
             <div className="md:w-1/2 min-h-64 bg-slate-800 relative w-full h-full p-8 flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-pattern-dots-dark"></div>
                 <div className="text-center relative z-10 glass-panel p-8 rounded-xl shadow-2xl">
                    <div className="text-6xl mb-4">🏠</div>
                    <div className="text-2xl font-bold text-slate-800">Transforming Homes</div>
                 </div>
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
