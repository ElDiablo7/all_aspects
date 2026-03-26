import Link from 'next/link';
import { getSiteConfig } from '@/lib/site-config';

export default function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{config.name}</h3>
          <p className="text-sm mb-4">
            Premium {config.services[0].toLowerCase()} and {config.services[1].toLowerCase()} solutions. Built on trust, delivered with excellence.
          </p>
          <div className="flex gap-4">
            <a href={`tel:${config.phone.replace(/ /g, '')}`} className="text-white hover:text-amber-500 transition font-bold">{config.phone}</a>
          </div>
          <div className="mt-2">
            <a href={`mailto:${config.email}`} className="text-slate-400 hover:text-white transition text-sm">{config.email}</a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Core Services</h4>
          <ul className="space-y-2 text-sm">
            {config.services.map((service, i) => (
              <li key={i}>
                <Link href={`/${service.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition">Customer Reviews</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Get a Quote</h4>
          <p className="text-sm mb-4">Ready to start your project? We offer free, no-obligation quotes and site surveys.</p>
          <Link href="#quote" className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105">
            Request Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
