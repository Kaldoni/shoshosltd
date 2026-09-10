import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { articles } from '@/data/articles';
export const metadata = {
  title: 'Company Insights | Shoshos Oil and Gas Intl. Limited',
};
export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="services-page-hero">
          <div className="container">
            <span className="eyebrow">INSIDE SHOSHOS</span>
            <h1 className="services-page-hero__title">
              Our capabilities.
              <br />
              Our perspective.
            </h1>
            <p className="services-page-hero__sub">
              An introduction to our operations and principles, drawn from the
              shoshos company profile.
            </p>
          </div>
        </section>
        <section className="services-section">
          <div className="container services-grid">
            {articles.map((a) => (
              <article className="service-card" key={a.slug}>
                <span className="eyebrow">{a.category}</span>
                <h2 className="service-card__title">{a.title}</h2>
                <p className="service-card__desc">{a.text.slice(0, 160)}…</p>
                <Link className="service-card__link" href={'/blog/' + a.slug}>
                  Read more →
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
