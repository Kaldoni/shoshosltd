import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CTABanner } from '@/components/sections/CTAAndFooter';
import { company, values } from '@/data/company';
export const metadata = {
  title: 'About Us | ' + company.name,
  description:
    'Onshore and offshore drilling, well services, engineering and logistics support from Warri, Nigeria.',
};
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="about-hero">
          <div className="about-hero__overlay" />
          <div className="container about-hero__content">
            <span className="eyebrow">WHO WE ARE</span>
            <h1 className="about-hero__title">
              A promise of quality.
              <br />
              <span className="text-red">A partnership that lasts.</span>
            </h1>
            <p className="about-hero__sub">
              Integrated support for demanding energy operations.
            </p>
          </div>
        </section>
        <section className="legacy-section">
          <div className="container legacy__inner">
            <div>
              <span className="eyebrow">
                ROOTED IN WARRI. READY FOR YOUR OPERATION.
              </span>
              <h2 className="section-title">
                Engineering, energy,
                <br />
                marine and logistics.
              </h2>
              <p className="body-text">
                {company.name} is an onshore and offshore drilling and well
                services company based in Warri, Delta State, Nigeria. Our
                portfolio brings together well intervention, marine services,
                construction, installation, logistics, procurement and general
                engineering.
              </p>
              <p className="body-text" style={{ marginTop: 16 }}>
                We work with technical partners and leading contractors to
                access technology and strengthen delivery. Quality, health,
                safety and the environment guide our approach to every customer
                relationship.
              </p>
              <a className="profile-download" href={company.brochure} download>
                Read our company profile ↗
              </a>
            </div>
            <img
              src="/profile-hero.png"
              alt="Offshore platform at sunset"
              className="about-profile-image"
            />
          </div>
        </section>
        <section className="mission-section">
          <div className="container">
            <span className="eyebrow">PURPOSE AND PRINCIPLES</span>
            <h2 className="section-title-white">The shoshos way</h2>
            <div className="mv-grid">
              <div className="mv-card">
                <h3 className="mv-card__title">Our mission</h3>
                <p className="mv-card__text">
                  To provide goods and services to the oil and gas industries
                  using engineering and logistics best practices while
                  protecting the environment.
                </p>
              </div>
              <div className="mv-card">
                <h3 className="mv-card__title">Our vision</h3>
                <p className="mv-card__text">
                  To provide reliable and professional services to major
                  customers and fulfil their diverse needs in a flexible and
                  secure manner.
                </p>
              </div>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={v}>
                  <span>0{i + 1}</span>
                  <h3>{v}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="hse-section">
          <div className="container hse-inner">
            <div>
              <span className="eyebrow">OUR OPERATING STANDARD</span>
              <h2 className="section-title">
                Responsibility in every operation.
              </h2>
              <p className="body-text">
                Our Environmental Management System focuses on reducing the
                impact of our operations and preventing environmental harm. We
                seek to protect local communities, heritage and wildlife while
                taking legal and community requirements into account.
              </p>
            </div>
            <div>
              <h3 className="hse-right__title">Prevention comes first</h3>
              <p className="body-text">
                Our goals are to deliver services without environmental
                incidents or statutory environmental liabilities, and in an
                environmentally friendly manner. These are operating goals,
                supported by pollution prevention and responsible management of
                waste generated on site.
              </p>
              <div className="qa-cards">
                <div className="qa-card">
                  <strong>Pollution prevention</strong>
                  <p>Plan operations to minimise environmental impact.</p>
                </div>
                <div className="qa-card">
                  <strong>Responsible waste handling</strong>
                  <p>Manage waste to reduce potential harm.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
