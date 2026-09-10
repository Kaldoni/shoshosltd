import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { articles } from '@/data/articles';
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title:
      (articles.find((a) => a.slug === params.slug)?.title || 'Insight') +
      ' | Shoshos Oil and Gas Intl. Limited',
  };
}
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  if (!a) notFound();
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <section className="services-page-hero">
          <div className="container">
            <Link className="eyebrow" href="/blog">
              ← COMPANY INSIGHTS
            </Link>
            <h1 className="services-page-hero__title">{a.title}</h1>
          </div>
        </section>
        <article className="container profile-article">
          <span className="eyebrow">{a.category}</span>
          <p className="body-text">{a.text}</p>
          <a className="profile-download" href="/brochure.pdf">
            Explore the company profile ↗
          </a>
          <Link className="btn-red" href="/contact">
            Speak to our team →
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
