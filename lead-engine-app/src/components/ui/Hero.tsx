import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  themeColor?: string;
}

export default function Hero({ 
  title, 
  subtitle, 
  primaryCtaText = "Get a Free Quote", 
  secondaryCtaText = "View Our Services",
  themeColor = "bg-slate-900"
}: HeroProps) {
  return (
    <section className={`relative ${themeColor} text-white py-24 md:py-32 overflow-hidden`}>
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tighter mb-6 text-white drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/80 font-medium mb-10 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <Link href="#quote" className="btn-accent text-center text-lg active:scale-95 transition-all">
              {primaryCtaText}
            </Link>
            <Link href="/services" className="glass-shiny hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl transition-all text-center text-lg flex items-center justify-center gap-2">
              {secondaryCtaText} <span className="opacity-50">→</span>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm font-bold text-blue-200/60 uppercase tracking-widest">
            <span className="flex items-center gap-2 glow-blue">✓ Fully Insured</span>
            <span className="flex items-center gap-2 glow-blue">✓ 20+ Years Exp.</span>
            <span className="flex items-center gap-2 glow-blue">✓ 5-Star Reviews</span>
          </div>
        </div>
        
        {/* Hero Image with 3D Depth */}
        <div className="md:w-1/2 relative perspective-1000">
           <div className="aspect-square relative flex items-center justify-center animate-float">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-blue-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse-slow"></div>
             <div className="relative glass-shiny w-5/6 h-5/6 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 overflow-hidden border border-white/20">
               <Image
                 src="/images/paving_driveway.png"
                 alt="Premium driveway installed by All Aspects Paving"
                 fill
                 priority
                 className="object-cover scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 z-10 p-5 glass-shiny backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl translate-z-10">
                 <div className="flex text-amber-400 text-xl mb-2 glow-amber">★★★★★</div>
                 <p className="italic text-slate-100 text-sm leading-relaxed">&quot;Absolutely transformed our property. Professional, clean, and the quality is outstanding. Highly recommended!&quot;</p>
                 <div className="flex items-center gap-3 mt-3">
                    <div className="w-8 h-1 bg-amber-500 rounded-full"></div>
                    <p className="font-bold text-white text-xs tracking-widest uppercase">Sarah J., Local Customer</p>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
