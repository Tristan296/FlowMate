"use client";

import React, { useState } from 'react';
import { CheckCircle, Workflow, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PRICING_PLANS, PlanKey } from '@/lib/stripe';

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planKey: PlanKey) => {
    setLoading(planKey);
    
    // For now, redirect to signup with plan parameter
    // In a full implementation, you'd collect email first
    window.location.href = `/auth/signup?plan=${planKey}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Workflow className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FlowMate</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Replaces a $25-30/hr admin assistant. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(PRICING_PLANS).map(([key, plan]) => (
              <div 
                key={key}
                className={`p-8 rounded-lg border-2 ${
                  plan.highlighted 
                    ? 'border-blue-500 bg-white shadow-xl relative' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">14-day free trial</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSelectPlan(key as PlanKey)}
                  disabled={loading === key}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50'
                  }`}
                >
                  {loading === key ? 'Loading...' : 'Start Free Trial'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Need help choosing? <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact our team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}