'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error?.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          border: 'solid 1px #B94312',
          background: '#B94312',
          color: '#fff',
        }}
      >
        Try again
      </button>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
