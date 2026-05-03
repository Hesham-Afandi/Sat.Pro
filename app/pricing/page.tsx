"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSession } from "next-auth/react";

export default function PricingPage() {
  const { t, dir } = useLanguage();
  const {  session } = useSession();

  const plans = [
    {
      name: "Free",
      price: "0",
      duration: "forever",
      description: "Perfect for getting started",
      features: [
        "✓ 3 Practice Tests",
        "✓ Basic Analytics",
        "✓ 5 Video Lessons",
        "✓ Community Access",
        "✗ Personalized Study Plan",
        "✗ 1-on-1 Tutoring",
      ],
      color: "from-gray-400 to-gray-600",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      name: "Premium",
      price: "29",
      duration: "per month",
      description: "Best for serious students",
      features: [
        "✓ Unlimited Practice Tests",
        "✓ Advanced Analytics",
        "✓ All Video Lessons",
        "✓ Priority Support",
        "✓ Personalized Study Plan",
        "✗ 1-on-1 Tutoring",
      ],
      color: "from-blue-500 to-indigo-600",
      buttonText: "Start Free Trial",
      buttonLink: "/register?plan=premium",
      popular: true,
    },
    {
      name: "Ultimate",
      price: "79",
      duration: "per month",
      description: "Complete SAT preparation",
      features: [
        "✓ Everything in Premium",
        "✓ Unlimited Practice Tests",
        "✓ Advanced Analytics",
        "✓ All Video Lessons",
        "✓ 24/7 Priority Support",
        "✓ 1-on-1 Tutoring (4 hrs/mo)",
      ],
      color: "from-purple-500 to-pink-600",
      buttonText: "Go Ultimate",
      buttonLink: "/register?plan=ultimate",
    },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/"><Logo className="w-16 h-16" /></Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {session ? (
              <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold">
                {t("dashboard")}
              </Link>
            ) : (
              <Link href="/login" className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-bold">
                {t("signIn")}
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Start your journey to SAT success today</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${plan.popular ? 'ring-4 ring-blue-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={feature.startsWith("✓") ? "text-green-500" : "text-gray-400"}>
                        {feature.startsWith("✓") ? "✓" : "✗"}
                      </span>
                      <span className="text-gray-700">{feature.replace(/[✓✗]\s*/, "")}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.buttonLink}
                  className={`block w-full py-4 bg-gradient-to-r ${plan.color} text-white rounded-xl font-bold text-center hover:shadow-lg hover:scale-105 transition transform`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes! You can cancel your subscription at any time with no questions asked.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Premium plan comes with a 7-day free trial. No credit card required.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Logo className="w-16 h-16 mx-auto mb-4" />
          <p>© 2026 SAT PRO. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}