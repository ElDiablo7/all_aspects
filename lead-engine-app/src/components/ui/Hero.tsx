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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-pattern-dots">
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="#quote" className="btn-accent text-center text-lg">
              {primaryCtaText}
            </Link>
            <Link href="/services" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center text-lg backdrop-blur-sm border border-white/20">
              {secondaryCtaText}
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-sm font-semibold text-slate-400">
            <span className="flex items-center gap-2">✓ Fully Insured</span>
            <span className="flex items-center gap-2">✓ 15+ Years Exp.</span>
            <span className="flex items-center gap-2">✓ 5-Star Reviews</span>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 relative">
           <div className="aspect-square relative flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse-slow"></div>
             <div className="relative glass-panel w-5/6 h-5/6 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
               <Image
                 src="https://files.elfsightcdn.com/85ef4678-86da-4193-bb1f-16b97e295b4d/6571003b-70e6-4e48-a766-5b31e8cd53bd/unnamed-1.webp"
                 alt="Premium driveway installed by All Aspects Paving in Surrey"
                 fill
                 priority
                 unoptimized
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
               <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-slate-900/50 backdrop-blur border border-white/10 rounded-lg">
                 <div className="flex text-amber-500 text-xl mb-2">★★★★★</div>
                 <p className="italic text-slate-200 text-sm">&quot;Absolutely transformed our property. Professional, clean, and the quality is outstanding. Highly recommended!&quot;</p>
                 <p className="font-bold text-white mt-2 text-xs">— Sarah J., Local Customer</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
