import Link from 'next/link';
import { getSiteConfig } from '@/lib/site-config';

export default function Header() {
  const config = getSiteConfig();

  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded shadow-md flex items-center justify-center text-white font-bold text-xl ${config.primaryColor}`}>
             {config.name.charAt(0)}
          </div>
          <span className={`text-xl font-bold tracking-tight ${config.textColor}`}>
            {config.name}
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 font-semibold text-slate-700">
          <Link href={`/${config.services[0].toLowerCase().replace(' ', '-')}`} className="hover:text-amber-600 transition-colors">{config.services[0]}</Link>
          <Link href={`/${config.services[1].toLowerCase().replace(' ', '-')}`} className="hover:text-amber-600 transition-colors">{config.services[1]}</Link>
          <Link href="/services" className="hover:text-amber-600 transition-colors">All Services</Link>
          <Link href="/about" className="hover:text-amber-600 transition-colors">Why Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href={`tel:${config.phone.replace(/ /g, '')}`} className="hidden lg:block font-bold text-lg text-slate-800 hover:text-amber-600">
            📞 {config.phone}
          </a>
          <a href="#quote" className="btn-accent px-5 py-2 text-sm shadow animate-pulse-slow">
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
