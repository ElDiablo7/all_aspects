import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/site-config';

export default function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="bg-blue-950/40 backdrop-blur-3xl text-blue-200/60 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] orb-blue opacity-10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-10 group">
            <div className="relative w-64 h-16 md:w-[480px] md:h-[120px] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Image
                src="/logo_premium.png"
                alt={config.name}
                fill
                className="object-contain drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
                unoptimized
              />
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Premium {config.services[0].toLowerCase()} and {config.services[1].toLowerCase()} solutions. Built on trust, delivered with excellence across Surrey and South London.
          </p>
          <div className="pt-4">
            <a href={`tel:${config.phone.replace(/ /g, '')}`} className="text-white hover:text-amber-400 transition-colors font-bold text-lg flex items-center gap-2">
              <span className="text-amber-500">📞</span> {config.phone}
            </a>
            <a href={`mailto:${config.email}`} className="text-blue-200/40 hover:text-white transition-colors text-xs mt-2 block tracking-wide">{config.email}</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase font-bold text-white mb-6 tracking-[0.2em]">Core Services</h4>
          <ul className="space-y-3 text-sm">
            {config.services.slice(0, 5).map((service, i) => (
              <li key={i}>
                <Link href={`/${service.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-500 transition-colors"></span>
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase font-bold text-white mb-6 tracking-[0.2em]">Information</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</Link></li>
            <li><Link href="/faq" className="hover:text-amber-400 transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-white/5">
          <h4 className="text-sm uppercase font-bold text-white mb-4 tracking-widest text-center">Get a Quote</h4>
          <p className="text-xs mb-6 text-center leading-relaxed">Ready to start? We offer free, no-obligation quotes and site surveys within 24 hours.</p>
          <Link href="#quote" className="btn-accent w-full text-center py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            Request Quote Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 mt-16 pt-8 text-center text-[10px] uppercase tracking-[0.3em] text-blue-200/20 pb-4">
        <p>&copy; {new Date().getFullYear()} {config.name}. Professional Paving Excellence.</p>
        <p className="mt-2 text-amber-500/40 tracking-[0.1em] transition-all hover:text-amber-500 hover:scale-105 inline-block cursor-default font-bold">Powered by GRACE-X AI &copy; Zac Crockett 2025</p>
      </div>
    </footer>
  );
}
