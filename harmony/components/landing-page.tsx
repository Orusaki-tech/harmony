"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FileText, Calculator, Bell, BarChart3, Shield } from "lucide-react"
import { glassCard, glassButton, gradientBg } from "@/lib/glassmorphism"

interface LandingPageProps {
  onEnterPlatform: () => void
}

export default function LandingPage({ onEnterPlatform }: LandingPageProps) {
  return (
    <div className={`min-h-screen ${gradientBg} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-white font-bold text-xl">HARMONY</div>
          <Button onClick={onEnterPlatform} className={`${glassButton} text-white px-6 py-2`}>
            Enter Platform <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <img
              src="/harmony-platform.png"
              alt="HARMONY - Human Analytics Records Management & Onboarding Network"
              className="mx-auto max-w-2xl w-full h-auto"
            />
          </div>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Streamline your HR operations with our comprehensive platform for employee management, payroll automation,
            compliance tracking, and seamless communication.
          </p>

          <Button onClick={onEnterPlatform} className={`${glassButton} text-white px-8 py-4 text-lg`}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Employee Records"
            description="Centralized digital files with personal info, contracts, and compliance documents"
          />
          <FeatureCard
            icon={<Calculator className="h-8 w-8" />}
            title="Payroll Automation"
            description="Automated salary calculations, deductions, and payslip generation"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Compliance Management"
            description="Track certificates, contracts, and licenses with expiry alerts"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Leave Management"
            description="Online leave requests, approvals, and balance tracking"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="HR Reports"
            description="Comprehensive reports on payroll, compliance, and performance"
          />
          <FeatureCard
            icon={<Bell className="h-8 w-8" />}
            title="Smart Notifications"
            description="Automated reminders via email and WhatsApp"
          />
        </div>

        {/* CTA Section */}
        <div className={`${glassCard} p-8 text-center`}>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your HR?</h2>
          <p className="text-white/80 mb-6">Join thousands of companies already using HARMONY</p>
          <Button onClick={onEnterPlatform} className={`${glassButton} text-white px-8 py-3`}>
            Start Free Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className={`${glassCard} p-6 text-center hover:bg-white/15 transition-all duration-300`}>
      <div className="text-pink-300 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  )
}
