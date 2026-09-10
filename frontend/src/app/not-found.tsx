import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" style={{ color: '#B94312', fontWeight: 'bold' }}>
        Go back home
      </Link>
    </main>
  );
}
