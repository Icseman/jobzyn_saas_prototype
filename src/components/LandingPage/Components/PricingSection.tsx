import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 job postings",
        "Basic candidate management",
        "Email support",
        "Standard templates",
        "Basic analytics"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "secondary",
      popular: false
    },
    {
      name: "Professional",
      price: "300 MAD",
      period: "per month",
      description: "Ideal for growing recruitment teams",
      features: [
        "Unlimited job postings",
        "Advanced candidate management",
        "Priority support",
        "Custom templates",
        "Advanced analytics",
        "Team collaboration",
        "API access",
        "Custom branding"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantees",
        "Custom workflows",
        "White-label solution",
        "24/7 phone support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
      popular: false
    }
  ];

  return (
    <div className="bg-white py-20 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Orange gradient shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-500/15 to-orange-700/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/10 to-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-400/25 to-orange-600/25 rounded-full blur-xl"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-32 right-10 w-16 h-16 bg-orange-200/30 rounded-lg rotate-45 blur-sm"></div>
        <div className="absolute bottom-32 left-10 w-20 h-20 bg-orange-300/20 rounded-lg rotate-12 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-400/15 rounded-full blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-orange-600 text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.p>
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Start free and scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${
                plan.popular 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white transform scale-105 shadow-2xl' 
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
              } rounded-2xl p-8 transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ml-2 ${plan.popular ? 'text-orange-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-base ${plan.popular ? 'text-orange-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-orange-200' : 'text-orange-500'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-orange-100' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                className={`w-full py-4 px-6 rounded-lg font-semibold text-base transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl'
                    : plan.buttonVariant === 'primary'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index * 0.1) + 0.4 }}
                viewport={{ once: true }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>


        {/* FAQ or additional info */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ 24/7 Support</span>
            <span>✓ 99.9% Uptime</span>
            <span>✓ GDPR Compliant</span>
            <span>✓ SOC 2 Certified</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;
