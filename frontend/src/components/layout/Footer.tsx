import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import Brand from './Brand';
import { company } from '@/data/company';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <Brand />
          </Link>
          <p className="footer__desc">
            Integrated engineering, energy, marine and logistics support for
            demanding onshore and offshore operations.
          </p>
          <a href={company.brochure} download className="profile-download">
            Download company profile ↗
          </a>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Explore shoshos</h4>
          <ul>
            {[
              ['About us', '/about'],
              ['Our services', '/services'],
              ['Capabilities', '/projects'],
              ['Company insights', '/blog'],
              ['Contact us', '/contact'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">
            Let’s support your next operation
          </h4>
          <div className="contact-item">
            <MapPin className="contact-icon" />
            <span>{company.address}</span>
          </div>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <a href={company.phoneHref} className="footer__link">
              {company.phone}
            </a>
          </div>
          <div className="contact-item">
            <Mail className="contact-icon" />
            <div>
              <a href={'mailto:' + company.email} className="footer__link">
                {company.email}
              </a>
              <a
                href={'mailto:' + company.secondaryEmail}
                className="footer__link"
              >
                {company.secondaryEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
