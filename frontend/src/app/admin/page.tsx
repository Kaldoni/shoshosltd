'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const form = new URLSearchParams();
      form.append('username', email.trim());
      form.append('password', password);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString(),
        },
      );
      if (!res.ok) {
        setError(
          res.status === 401
            ? 'Invalid email or password. Please try again.'
            : res.status === 403
              ? 'This account is inactive. Contact your administrator.'
              : 'Sign-in is temporarily unavailable. Please try again shortly.',
        );
        return;
      }
      const data = await res.json();
      localStorage.setItem('shoshos_token', data.access_token);
      localStorage.setItem('shoshos_user', data.user_email);
      router.push('/admin/dashboard');
    } catch {
      setError('Unable to connect to the sign-in service. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <img
            src="/logo.png"
            alt="Shoshos Oil and Gas Intl. Limited"
            className="logo-icon"
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#071827',
            }}
          >
            <strong>shoshos</strong>{' '}
            <span style={{ color: '#B94312' }}>ADMIN</span>
          </span>
        </div>
        <h1 className="login-title">Sign in to Dashboard</h1>
        <p className="login-sub">Manage website content and messages</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shoshosltd.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
