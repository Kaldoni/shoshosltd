import Link from 'next/link';
export default function Hero() {
  return (
    <section className="hero">
      <img
        src="/profile-hero.png"
        alt="Offshore platform and marine support vessel at sunset"
        className="hero__bg"
      />
      <div className="hero__overlay" />
      <div className="container">
        <div className="hero__content">
          <span className="hero__eyebrow">
            ENGINEERING · ENERGY · MARINE · LOGISTICS
          </span>
          <h1 className="hero__heading">
            Integrated support.
            <br />
            <span className="hero__heading--red">
              From shore
              <br />
              to offshore.
            </span>
          </h1>
          <p className="hero__subtext">
            Shoshos Oil and Gas Intl. Limited brings well services, pipeline
            expertise and marine logistics together to support demanding energy
            operations.
          </p>
          <div className="hero__actions">
            <Link href="/services" className="btn-red">
              Explore our services →
            </Link>
            <a href="/brochure.pdf" download className="btn-outline-white">
              Company profile ↗
            </a>
          </div>
          <div className="hero-location">
            BASED IN WARRI, NIGERIA · ONSHORE &amp; OFFSHORE
          </div>
        </div>
      </div>
    </section>
  );
}
