import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Welcome to BookedBot!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div style={{
        background: 'white',
        padding: '60px 40px',
        borderRadius: '16px',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>
          Welcome to BookedBot!
        </h1>
        <p style={{ fontSize: '18px', color: '#525252', marginBottom: '30px' }}>
          Your purchase was successful. Check your email for access details and next steps.
        </p>
        <p style={{ fontSize: '16px', color: '#737373' }}>
          Questions? Email support@nicelysupport.com
        </p>
      </div>
    </>
  );
}
