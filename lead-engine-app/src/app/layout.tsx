import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GraceChatbot from '@/components/ui/GraceChatbot';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'All Aspects Solutions',
  description: 'Premium Paving and Building Solutions. Request a free quote today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col font-sans`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <GraceChatbot />
      </body>
    </html>
  );
}
