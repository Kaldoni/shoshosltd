import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title:
    'Shoshos Oil and Gas Intl. Limited | Engineering, Energy, Marine & Logistics',
  description:
    'Well intervention, pipeline, marine, engineering and logistics services from Warri, Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
