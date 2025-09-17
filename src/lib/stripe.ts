import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_demo_key';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
});

export const getStripePublishableKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';
};

// Pricing configuration that matches our plans
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    interval: 'month',
    description: 'Perfect for solo business owners',
    features: [
      'Up to 100 automated emails/month',
      'Basic follow-up sequences',
      'SMS reminders (50/month)',
      'Email support',
      'Industry templates'
    ],
    highlighted: false
  },
  professional: {
    name: 'Professional',
    price: 59,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    interval: 'month',
    description: 'For growing service businesses',
    features: [
      'Up to 500 automated emails/month',
      'Advanced automation sequences',
      'Unlimited SMS reminders',
      'Review automation',
      'Xero/QuickBooks integration',
      'Priority support'
    ],
    highlighted: true
  },
  business: {
    name: 'Business',
    price: 99,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    interval: 'month',
    description: 'For established SMBs',
    features: [
      'Unlimited automated emails',
      'Custom workflow builder',
      'Multi-location support',
      'Team collaboration',
      'Advanced analytics',
      'White-label options',
      'Dedicated support'
    ],
    highlighted: false
  }
} as const;

export type PlanKey = keyof typeof PRICING_PLANS;