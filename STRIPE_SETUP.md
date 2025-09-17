# Stripe Payments Setup Guide

This guide explains how to configure Stripe payments in FlowMate.

## Prerequisites

1. A Stripe account (create one at [stripe.com](https://stripe.com))
2. Access to your Stripe Dashboard

## Setup Steps

### 1. Get Stripe API Keys

1. Log into your Stripe Dashboard
2. Go to Developers > API keys
3. Copy your **Publishable key** and **Secret key**
4. For webhooks, go to Developers > Webhooks and create a new endpoint

### 2. Create Subscription Products and Prices

In your Stripe Dashboard:

1. Go to Products > Add Product
2. Create three products matching our plans:

**Starter Plan:**
- Name: FlowMate Starter
- Price: $29/month
- Copy the Price ID (starts with `price_`)

**Professional Plan:**
- Name: FlowMate Professional  
- Price: $59/month
- Copy the Price ID (starts with `price_`)

**Business Plan:**
- Name: FlowMate Business
- Price: $99/month
- Copy the Price ID (starts with `price_`)

### 3. Configure Environment Variables

Update your `.env.local` file with your real Stripe credentials:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Stripe Price IDs (replace with your actual price IDs)
STRIPE_STARTER_PRICE_ID=price_your_starter_price_id
STRIPE_PROFESSIONAL_PRICE_ID=price_your_professional_price_id
STRIPE_BUSINESS_PRICE_ID=price_your_business_price_id
```

### 4. Set Up Webhooks

1. In Stripe Dashboard, go to Developers > Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://your-domain.com/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret and add it to your environment variables

### 5. Test the Integration

1. Use Stripe's test card numbers for testing:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Requires authentication: `4000 0025 0000 3155`

2. Complete the signup flow and verify:
   - User is redirected to Stripe Checkout
   - Payment processes correctly
   - User is redirected back to your success page
   - Webhook events are received and processed

### 6. Go Live

1. Switch to live API keys in production
2. Create live products and prices
3. Update environment variables with live credentials
4. Test with real payment methods

## Features Included

- **14-day free trial** for all plans
- **Subscription management** via Stripe Customer Portal
- **Webhook handling** for subscription events
- **Plan upgrades/downgrades** (can be implemented)
- **Failed payment handling**
- **Automatic cancellation** processing

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- Verify webhook signatures to prevent fraud
- Use HTTPS in production for all endpoints

## Troubleshooting

### Common Issues

1. **"Price ID not found"**: Verify your price IDs are correct and match the environment
2. **Webhook signature verification failed**: Check your webhook secret is correct
3. **Permission denied**: Ensure your API keys have the correct permissions

### Testing Webhooks Locally

Use Stripe CLI to forward webhooks to your local development server:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will give you a webhook signing secret for local testing.