import Link from 'next/link';
import { Shield, Anchor, Handshake } from 'lucide-react';
const reasons = [
  {
    Icon: Anchor,
    title: 'Onshore and offshore reach',
    desc: 'Supporting operations across offshore, swamp, shallow-water and onshore locations.',
  },
  {
    Icon: Shield,
    title: 'Environmental responsibility',
    desc: 'An environmental management system focused on pollution prevention, responsible waste handling and protecting local communities.',
  },
  {
    Icon: Handshake,
    title: 'Built around your operation',
    desc: 'Engineering and logistics expertise, backed by technical partnerships and a commitment to dependable service.',
  },
];
export default function WhyPartner() {
  return (
    <section className="why-partner" id="about">
      <div className="container why-partner__inner">
        <div className="why-partner__img-wrap">
          <img
            src="/profile-hero.png"
            alt="Offshore energy infrastructure"
            className="why-partner__img"
          />
          <div className="why-partner__badge">
            <Anchor size={30} />
            <div>
              <strong>Warri, Nigeria</strong>
              <span>Connected to your operation</span>
            </div>
          </div>
        </div>
        <div>
          <span className="eyebrow">A PROMISE OF QUALITY</span>
          <h2 className="section-title">
            The right support.
            <br />
            Where it matters.
          </h2>
          <div className="section-divider" />
          <p className="why-partner__lead">
            At Shoshos Oil and Gas Intl. Limited, lasting partnerships start
            with understanding your operational needs.
          </p>
          <div className="reasons">
            {reasons.map((r) => (
              <div key={r.title} className="reason">
                <r.Icon className="reason__icon" />
                <div>
                  <h3 className="reason__title">{r.title}</h3>
                  <p className="reason__desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn-red">
            Meet shoshos →
          </Link>
        </div>
      </div>
    </section>
  );
}
