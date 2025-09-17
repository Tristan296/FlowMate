import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICING_PLANS, PlanKey } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { planKey, email, name } = await request.json();

    if (!planKey || !email) {
      return NextResponse.json(
        { error: 'Plan key and email are required' },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS[planKey as PlanKey];
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Check if we're in demo mode (using demo Stripe keys)
    const isDemoMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_demo_key';
    
    if (!plan.priceId) {
      return NextResponse.json(
        { error: 'Price ID is missing for this plan. Please configure Stripe price IDs.' },
        { status: 400 }
      );
    }

    // In demo mode, simulate checkout session creation for demo price IDs
    if (isDemoMode && plan.priceId.includes('demo')) {
      // Return a simulated checkout session for demo purposes
      const demoSessionId = `cs_demo_${Date.now()}`;
      const demoUrl = `${request.nextUrl.origin}/dashboard?success=true&session_id=${demoSessionId}&demo=true`;
      
      console.log('Demo mode: Simulating Stripe checkout session creation');
      return NextResponse.json({ 
        sessionId: demoSessionId, 
        url: demoUrl,
        demo: true 
      });
    }

    // In production mode, block demo price IDs
    if (!isDemoMode && plan.priceId.includes('demo')) {
      return NextResponse.json(
        { error: 'This is a demo. Please configure real Stripe price IDs to enable payments.' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/auth/signup?canceled=true`,
      customer_email: email,
      metadata: {
        planKey,
        customerName: name || '',
      },
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        metadata: {
          planKey,
          customerEmail: email,
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}