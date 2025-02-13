import '@/app/_styles/globals.css';

import { Josefin_Sans } from 'next/font/google';

import Header from './_components/Header';
import { ReservationProvider } from './_context/ReservationContext';

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

const josefinSans = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} text-primary-100 bg-primary-950 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
