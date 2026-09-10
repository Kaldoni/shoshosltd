import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CTABanner } from '@/components/sections/CTAAndFooter';
import { company, services } from '@/data/company';
export const metadata = {
  title: 'Our Services | ' + company.name,
  description:
    'Well intervention, pipeline systems, marine logistics, fabrication, engineering and procurement.',
};
export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="services-page-hero">
          <div className="container">
            <span className="eyebrow">OUR SERVICE PORTFOLIO</span>
            <h1 className="services-page-hero__title">
              Built for the demands
              <br />
              of energy operations.
            </h1>
            <p className="services-page-hero__sub">
              Thirteen connected service areas. Onshore and offshore support
              shaped around your operational requirements.
            </p>
          </div>
        </section>
        <section className="services-section">
          <div className="container services-full-grid">
            {services.map((s, i) => (
              <article className="service-detail-card" key={s.slug}>
                <span className="service-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="service-detail-title">{s.title}</h2>
                <p className="service-detail-desc">{s.description}</p>
                <ul className="capability-list">
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <Link
                  className="service-detail-link"
                  href={'/services/' + s.slug}
                >
                  Explore service →
                </Link>
              </article>
            ))}
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
