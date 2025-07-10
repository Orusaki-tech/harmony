"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, Shield } from "lucide-react"
import { glassCard, glassButton, glassInput, gradientBg } from "@/lib/glassmorphism"

interface LoginPageProps {
  onLogin: (role: "admin" | "employee") => void
  onBack: () => void
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "employee" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole)
    }
  }

  const demoCredentials = {
    admin: { email: "admin@harmony.com", password: "admin123" },
    employee: { email: "employee@harmony.com", password: "emp123" },
  }

  return (
    <div className={`min-h-screen ${gradientBg} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Button onClick={onBack} className={`${glassButton} text-white mb-8`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="max-w-md mx-auto">
          <div className={`${glassCard} p-8`}>
            <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome to HARMONY</h1>

            {!selectedRole ? (
              <div className="space-y-4">
                <h2 className="text-xl text-white text-center mb-6">Select Your Role</h2>

                <Button
                  onClick={() => setSelectedRole("admin")}
                  className={`${glassButton} w-full p-6 text-white flex items-center justify-center space-x-3`}
                >
                  <Shield className="h-6 w-6" />
                  <span className="text-lg">Admin Login</span>
                </Button>

                <Button
                  onClick={() => setSelectedRole("employee")}
                  className={`${glassButton} w-full p-6 text-white flex items-center justify-center space-x-3`}
                >
                  <User className="h-6 w-6" />
                  <span className="text-lg">Employee Login</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {selectedRole === "admin" ? (
                      <Shield className="h-6 w-6 text-pink-300" />
                    ) : (
                      <User className="h-6 w-6 text-pink-300" />
                    )}
                    <h2 className="text-xl text-white capitalize">{selectedRole} Login</h2>
                  </div>

                  <div className={`${glassCard} p-4 mb-4`}>
                    <p className="text-white/80 text-sm mb-2">Demo Credentials:</p>
                    <p className="text-white text-sm">Email: {demoCredentials[selectedRole].email}</p>
                    <p className="text-white text-sm">Password: {demoCredentials[selectedRole].password}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${glassInput} w-full p-3`}
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${glassInput} w-full p-3`}
                  />

                  <Button onClick={handleLogin} className={`${glassButton} w-full p-3 text-white`}>
                    Login as {selectedRole}
                  </Button>

                  <Button
                    onClick={() => setSelectedRole(null)}
                    variant="ghost"
                    className="w-full text-white/70 hover:text-white"
                  >
                    Change Role
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
