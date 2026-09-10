'use client';
import { company, services } from '@/data/company';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      'service',
    );
    const service = services.find((s) => s.slug === requested);
    if (service) setForm((prev) => ({ ...prev, subject: service.title }));
  }, []);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
          }),
        },
      );
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        <div className="contact-page-wrap">
          <div className="container">
            <div className="contact-header">
              <h1 className="contact-title">Get in Touch</h1>
              <p className="contact-sub">
                Talk to our Warri team about well services, engineering, marine
                support, pipeline operations or procurement.
              </p>
            </div>
            <div className="contact-grid">
              {/* Left */}
              <div>
                <div className="info-card">
                  <h2 className="info-card__title">Head Office Details</h2>
                  {[
                    { icon: '📍', label: 'Address', value: company.address },
                    {
                      icon: '📞',
                      label: 'Phone Numbers',
                      value: company.phone,
                    },
                    {
                      icon: '✉️',
                      label: 'Email Addresses',
                      value: company.email,
                    },
                    {
                      icon: '@',
                      label: 'Alternative Email',
                      value: company.secondaryEmail,
                    },
                  ].map((item) => (
                    <div key={item.label} className="info-row">
                      <div className="info-icon-wrap">{item.icon}</div>
                      <div>
                        <strong>{item.label}</strong>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="map-wrap">
                  <iframe
                    title="Location"
                    src="https://maps.google.com/maps?q=Ugbwangue+Warri+Delta+State+Nigeria&output=embed"
                    width="100%"
                    height="260"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Right */}
              <div className="form-panel">
                <h2 className="form-title">Tell Us What You need</h2>
                <p className="form-sub">
                  Complete the form below and our team will reach out to you as
                  soon as possible.
                </p>
                {status === 'success' && (
                  <div className="alert alert--success">
                    ✅ Message sent! We will be in touch as soon as possible.
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert alert--error">
                    ❌ Something went wrong. Please try again.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Energy"
                      />
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234 ..."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.slug}>{s.title}</option>
                      ))}
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message Details</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Briefly describe your requirements..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message ➤'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
