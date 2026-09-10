import Link from 'next/link';
export { default as Footer } from '@/components/layout/Footer';
export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__inner">
        <span className="eyebrow">BUILDING LASTING PARTNERSHIPS</span>
        <h2 className="cta-banner__title">
          Your next operation.
          <br />
          Our promise of quality.
        </h2>
        <p className="cta-banner__sub">
          Talk to shoshos about engineering, well services, marine support or
          your next supply requirement.
        </p>
        <Link href="/contact" className="btn-red">
          Discuss your requirements →
        </Link>
      </div>
    </section>
  );
}
