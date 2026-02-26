export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID || 'acct_1T4AreCDxYH1XF8F';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bookedbot.vercel.app';

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Stripe-Account': STRIPE_ACCOUNT_ID,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'payment',
        success_url: `${baseUrl}/success`,
        cancel_url: baseUrl,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': 'BookedBot - AI Appointment Setter',
        'line_items[0][price_data][product_data][description]': 'Complete AI appointment booking system for local businesses',
        'line_items[0][price_data][unit_amount]': '49700',
        'line_items[0][quantity]': '1',
      }),
    });

    const session = await response.json();

    if (session.error) {
      return res.status(400).json({ error: session.error.message });
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
