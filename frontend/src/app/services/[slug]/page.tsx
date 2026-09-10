import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { company, services } from '@/data/company';
const aliases: Record<string, string> = {
  'control-systems': 'engineering-design',
  'field-support': 'well-intervention',
  testing: 'maintenance',
  automation: 'engineering-design',
  inspection: 'corrosion-monitoring',
};
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = services.find((s) => s.slug === params.slug);
  return {
    title: (s?.title || 'Services') + ' | ' + company.name,
    description: s?.description,
  };
}
export default function ServicePage({ params }: { params: { slug: string } }) {
  if (aliases[params.slug])
    permanentRedirect('/services/' + aliases[params.slug]);
  const s = services.find((s) => s.slug === params.slug);
  if (!s) notFound();
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="services-page-hero">
          <div className="container">
            <Link href="/services" className="eyebrow">
              ← ALL SERVICES
            </Link>
            <h1 className="services-page-hero__title">{s.title}</h1>
            <p className="services-page-hero__sub">{s.description}</p>
          </div>
        </section>
        <section className="hse-section">
          <div className="container hse-inner">
            <div>
              <span className="eyebrow">TECHNICAL SCOPE</span>
              <h2 className="section-title">How we support your operation</h2>
              <ul className="capability-list">
                {s.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <aside className="info-card">
              <h2 className="info-card__title">Discuss your requirements</h2>
              <p className="body-text">
                Share your location, equipment and intended scope so our team
                can discuss the right service approach.
              </p>
              <Link href={'/contact?service=' + s.slug} className="btn-red">
                Enquire about this service →
              </Link>
              <a
                className="profile-download"
                href={company.brochure + '#page=' + s.profilePage}
              >
                Read the company profile ↗
              </a>
              <a href={company.phoneHref}>{company.phone}</a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
