import Head from 'next/head';

export default function Home() {
  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating checkout. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>BookedBot | AI Appointment Setter for Local Businesses</title>
        <meta name="description" content="Never miss another lead. Your AI receptionist works 24/7 to answer calls, qualify leads, and book appointments while you sleep." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
          color: #1a1a1a;
          line-height: 1.7;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .hero { text-align: center; padding: 60px 0; }
        .pre-headline {
          color: #dc2626;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        .headline {
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          color: #1a1a1a;
        }
        .headline span { color: #dc2626; }
        .subheadline {
          font-size: 20px;
          color: #525252;
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .video-container {
          background: #f5f5f5;
          border-radius: 16px;
          padding: 20px;
          margin: 40px 0;
          border: 1px solid #e5e5e5;
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          border-radius: 8px;
          overflow: hidden;
          background: #1a1a1a;
        }
        .video-wrapper video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .section { padding: 60px 0; }
        .section-dark { background: #1a1a1a; color: #ffffff; }
        .section-gray { background: #f5f5f5; }
        h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        p { margin-bottom: 20px; font-size: 18px; }
        .pain-list {
          list-style: none;
          padding: 0;
          margin: 30px 0;
        }
        .pain-list li {
          padding: 16px 0 16px 40px;
          position: relative;
          font-size: 18px;
          border-bottom: 1px solid #e5e5e5;
        }
        .pain-list li:before {
          content: "❌";
          position: absolute;
          left: 0;
        }
        .benefit-list {
          list-style: none;
          padding: 0;
          margin: 30px 0;
        }
        .benefit-list li {
          padding: 16px 0 16px 40px;
          position: relative;
          font-size: 18px;
        }
        .benefit-list li:before {
          content: "✅";
          position: absolute;
          left: 0;
        }
        .cta-button {
          display: inline-block;
          background: #dc2626;
          color: white;
          padding: 20px 48px;
          font-size: 20px;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }
        .cta-button:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }
        .price-box {
          background: #1a1a1a;
          color: white;
          padding: 40px;
          border-radius: 16px;
          text-align: center;
          margin: 40px 0;
        }
        .price {
          font-size: 64px;
          font-weight: 900;
          color: #dc2626;
        }
        .price-note {
          color: #a3a3a3;
          font-size: 16px;
        }
        .guarantee-box {
          background: #fef2f2;
          border: 2px solid #dc2626;
          padding: 30px;
          border-radius: 12px;
          margin: 40px 0;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 40px 0;
        }
        .stat-box {
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
        }
        .stat-number {
          font-size: 48px;
          font-weight: 900;
          color: #dc2626;
        }
        .module-card {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 20px;
        }
        .module-number {
          background: #dc2626;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .faq-item {
          border-bottom: 1px solid #e5e5e5;
          padding: 24px 0;
        }
        .faq-question {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 12px;
        }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container">
        {/* Hero */}
        <div className="hero">
          <div className="pre-headline">For Local Service Businesses</div>
          <h1 className="headline">
            Stop Losing Leads<br />
            <span>After 5pm</span>
          </h1>
          <p className="subheadline">
            Your AI receptionist answers calls, qualifies leads, and books appointments 24/7 — so you never miss another customer.
          </p>
        </div>

        {/* VSL */}
        <div className="video-container">
          <div className="video-wrapper">
            <video controls poster="" autoPlay muted>
              <source src="https://files.catbox.moe/mn9oyf.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Problem Section */}
        <div className="section">
          <h2>The $50,000 Problem You're Ignoring</h2>
          <p>Every missed call is money walking out the door.</p>
          <p>A plumber told me last week: "I checked my voicemails on Monday morning. Three people called Friday night with emergencies. All three had already hired someone else."</p>
          <p>That's $1,500 gone. From ONE weekend.</p>
          <p>Multiply that by 52 weeks. That's $78,000 in lost revenue. Every. Single. Year.</p>
          
          <ul className="pain-list">
            <li>Customer calls at 7pm — goes to voicemail, never calls back</li>
            <li>Lead texts on Saturday — you don't see it until Monday</li>
            <li>Website visitor has questions — no one there to answer</li>
            <li>Emergency job at 11pm — competitor gets it instead</li>
            <li>You're on a job — phone rings and rings and rings</li>
          </ul>

          <p><strong>Here's the truth:</strong> Your competitors who answer 24/7 are stealing your customers. Not because they're better. Because they're available.</p>
        </div>

        {/* Stats */}
        <div className="section section-gray">
          <div style={{textAlign: 'center'}}>
            <h2>The Numbers Don't Lie</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="stat-number">78%</div>
              <p>of customers hire the first business that responds</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">62%</div>
              <p>of calls to local businesses go unanswered</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">$50K+</div>
              <p>lost annually from missed after-hours calls</p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="section">
          <h2>What If You Never Missed Another Lead?</h2>
          <p>Imagine this:</p>
          <p>It's 9pm on a Friday. You're having dinner with your family. Your phone buzzes — but it's not a customer call you have to answer.</p>
          <p>It's a notification: "New appointment booked for Monday 10am - Water heater replacement - $2,400 estimate"</p>
          <p>Your AI receptionist just handled everything. Answered the call. Asked the right questions. Qualified the lead. Booked the appointment. Sent confirmation.</p>
          <p>You didn't lift a finger.</p>
          <p><strong>That's BookedBot.</strong></p>
        </div>

        {/* What You Get */}
        <div className="section section-gray">
          <h2>Everything You Need to Never Miss a Lead Again</h2>
          
          <div className="module-card">
            <div className="module-number">1</div>
            <h3>AI Script Templates (10 Industries)</h3>
            <p>Pre-built conversation flows for plumbers, electricians, HVAC, dentists, chiropractors, salons, med spas, contractors, cleaning services, and auto repair. Just plug in your business details.</p>
          </div>

          <div className="module-card">
            <div className="module-number">2</div>
            <h3>Complete Setup Training</h3>
            <p>Step-by-step video walkthrough. Even if you've never set up AI before, you'll have BookedBot running in under 2 hours. We show you exactly what to click.</p>
          </div>

          <div className="module-card">
            <div className="module-number">3</div>
            <h3>Calendar Integration Guides</h3>
            <p>Connect with Calendly, Acuity, Google Calendar, or any scheduling tool. Your AI books directly into your real calendar — no double bookings, no conflicts.</p>
          </div>

          <div className="module-card">
            <div className="module-number">4</div>
            <h3>SMS + Voice Templates</h3>
            <p>Scripts for text message responses and voice prompts. Your AI sounds professional and handles objections like a trained receptionist.</p>
          </div>

          <div className="module-card">
            <div className="module-number">5</div>
            <h3>Lead Qualification Framework</h3>
            <p>The exact questions to ask so you only book qualified leads. No more tire-kickers. No more price shoppers. Just ready-to-buy customers.</p>
          </div>

          <div className="module-card">
            <div className="module-number">6</div>
            <h3>30-Day Implementation Roadmap</h3>
            <p>Day-by-day checklist to get BookedBot fully operational. Follow the roadmap, and you'll be capturing leads 24/7 within a month.</p>
          </div>
        </div>

        {/* Transformation */}
        <div className="section">
          <h2>Before and After BookedBot</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
            <div>
              <h3 style={{color: '#dc2626'}}>Before</h3>
              <ul className="pain-list">
                <li>Missing calls while on jobs</li>
                <li>Losing weekend leads to competitors</li>
                <li>Checking voicemails Monday morning</li>
                <li>Manually scheduling every appointment</li>
                <li>Answering the same questions 50x/day</li>
              </ul>
            </div>
            <div>
              <h3 style={{color: '#16a34a'}}>After</h3>
              <ul className="benefit-list">
                <li>Every call answered instantly</li>
                <li>Leads booked 24/7/365</li>
                <li>Wake up to a full calendar</li>
                <li>Appointments scheduled automatically</li>
                <li>AI handles FAQs perfectly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who This Is For */}
        <div className="section section-dark">
          <div className="container">
            <h2>This Is For You If...</h2>
            <ul className="benefit-list">
              <li>You're a local service business losing leads after hours</li>
              <li>You're tired of playing phone tag with customers</li>
              <li>You want to capture weekend and evening leads</li>
              <li>You can't afford a full-time receptionist ($35K+/year)</li>
              <li>You're ready to stop leaving money on the table</li>
            </ul>
            <br />
            <h2>This Is NOT For You If...</h2>
            <ul className="pain-list" style={{borderColor: '#404040'}}>
              <li>You already have 24/7 coverage (congrats, you're ahead)</li>
              <li>You don't want more customers (seriously?)</li>
              <li>You're not willing to spend 2 hours on setup</li>
            </ul>
          </div>
        </div>

        {/* Objections */}
        <div className="section">
          <h2>Questions You're Probably Asking</h2>
          
          <div className="faq-item">
            <div className="faq-question">"Will customers know it's AI?"</div>
            <p>Modern AI is remarkably natural. Most customers won't notice — and frankly, they don't care. They care about getting their problem solved. BookedBot does that.</p>
          </div>

          <div className="faq-item">
            <div className="faq-question">"I'm not tech-savvy..."</div>
            <p>Neither are most of our users. If you can follow a video tutorial, you can set this up. We show you every click, every setting, every step.</p>
          </div>

          <div className="faq-item">
            <div className="faq-question">"What if the AI makes a mistake?"</div>
            <p>BookedBot is designed to qualify and book — not diagnose or give technical advice. For complex questions, it smoothly hands off to you. You stay in control.</p>
          </div>

          <div className="faq-item">
            <div className="faq-question">"Is this expensive to run monthly?"</div>
            <p>The AI services cost roughly $20-50/month depending on call volume. One booked job pays for an entire year of operation.</p>
          </div>

          <div className="faq-item">
            <div className="faq-question">"What if it doesn't work for my industry?"</div>
            <p>We include templates for 10 different industries. If yours isn't covered, the framework adapts to any local service business. Plus, there's a 30-day guarantee.</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="section">
          <div className="price-box">
            <p className="price-note">One-Time Investment</p>
            <div className="price">$497</div>
            <p className="price-note">Lifetime access. No monthly fees for the training.</p>
            <br />
            <button className="cta-button" onClick={handleCheckout}>
              Get BookedBot Now →
            </button>
          </div>

          <div className="guarantee-box">
            <h3>🛡️ 30-Day "First Booking" Guarantee</h3>
            <p>Set up BookedBot. Follow the training. If you don't get at least ONE booking from the AI within 30 days, email us for a full refund. No questions. No hoops. We take all the risk.</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="section" style={{textAlign: 'center'}}>
          <h2>Every Hour You Wait, Leads Are Calling Your Competitors</h2>
          <p>That emergency plumbing job at 10pm? Someone's getting it tonight.</p>
          <p>The only question is: will it be you?</p>
          <br />
          <button className="cta-button" onClick={handleCheckout}>
            Start Capturing Leads 24/7 →
          </button>
          <p style={{marginTop: '20px', color: '#737373', fontSize: '14px'}}>
            One-time payment of $497 • Instant access • 30-day guarantee
          </p>
        </div>

        {/* Footer */}
        <footer style={{textAlign: 'center', padding: '40px 0', borderTop: '1px solid #e5e5e5', marginTop: '60px', color: '#737373', fontSize: '14px'}}>
          <p>© 2026 BookedBot. All rights reserved.</p>
          <p>Questions? Email support@nicelysupport.com</p>
        </footer>
      </div>
    </>
  );
}
