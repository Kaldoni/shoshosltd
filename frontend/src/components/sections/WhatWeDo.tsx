import Link from 'next/link';
import { services } from '@/data/company';
export default function WhatWeDo() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">CONNECTED CAPABILITIES</span>
          <h2 className="section-title">
            One partner. A wider field of expertise.
          </h2>
          <div className="section-divider" />
          <p className="body-text">
            From the well to the supply base, our services support each stage of
            your operation.
          </p>
        </div>
        <div className="services-grid">
          {services
            .filter((s) =>
              [
                'well-intervention',
                'pipeline-laying',
                'marine-services',
                'welding-fabrication',
                'maintenance',
                'procurement',
              ].includes(s.slug),
            )
            .map((s, i) => (
              <div key={s.slug} className="service-card">
                <span className="service-number">0{i + 1}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.description}</p>
                <Link
                  href={'/services/' + s.slug}
                  className="service-card__link"
                >
                  Explore capability →
                </Link>
              </div>
            ))}
        </div>
        <div className="all-services">
          <Link href="/services" className="btn-red">
            View all 13 service areas →
          </Link>
        </div>
      </div>
    </section>
  );
}
