import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/site-config';

export default function Header() {
  const config = getSiteConfig();

  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" prefetch={false} className="flex items-center gap-3 group">
          <div className="relative w-64 h-16 md:w-[480px] md:h-[120px] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]">
            <Image
              src="/logo_neon.png"
              alt={config.name}
              fill
              className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              unoptimized
            />
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 font-semibold text-slate-700">
          <Link href={`/${config.services[0].toLowerCase().replace(' ', '-')}`} className="hover:text-amber-600 transition-colors">{config.services[0]}</Link>
          <Link href={`/${config.services[1].toLowerCase().replace(' ', '-')}`} className="hover:text-amber-600 transition-colors">{config.services[1]}</Link>
          <Link href="/services" className="hover:text-amber-600 transition-colors">All Services</Link>
          <Link href="/about" className="hover:text-amber-600 transition-colors">Why Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href={`tel:${config.phone.replace(/ /g, '')}`}
             className="hidden lg:flex items-center gap-2 font-bold text-slate-800 hover:text-amber-600 transition-colors px-4 py-2 rounded-lg glass-dark border border-blue-100/30">
            <span className="text-red-500">📞</span>
            <span>{config.phone}</span>
          </a>
          <a href="#quote" className="btn-accent px-5 py-2 text-sm animate-pulse-slow rounded-xl">
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
