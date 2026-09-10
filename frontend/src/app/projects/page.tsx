import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { company, services } from '@/data/company';
export const metadata = { title: 'Operational Capabilities | ' + company.name };
export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="services-page-hero">
          <div className="container">
            <span className="eyebrow">OPERATIONAL CAPABILITIES</span>
            <h1 className="services-page-hero__title">
              From the wellhead
              <br />
              to the water.
            </h1>
            <p className="services-page-hero__sub">
              Explore the technical scope described in our company profile,
              spanning asset integrity, field execution and offshore support.
            </p>
          </div>
        </section>
        <section className="services-section">
          <div className="container services-grid">
            {services
              .filter((s) =>
                [
                  'pipeline-laying',
                  'pipeline-integrity',
                  'welding-fabrication',
                  'marine-services',
                  'construction',
                  'maintenance',
                ].includes(s.slug),
              )
              .map((s) => (
                <article key={s.slug} className="service-card">
                  <h2 className="service-card__title">{s.title}</h2>
                  <p className="service-card__desc">{s.description}</p>
                  <ul className="capability-list">
                    {s.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <Link
                    className="service-card__link"
                    href={'/services/' + s.slug}
                  >
                    Explore capability →
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
