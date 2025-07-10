"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import LoginPage from "@/components/login-page"
import AdminDashboard from "@/components/admin-dashboard"
import EmployeeDashboard from "@/components/employee-dashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "admin" | "employee">("landing")
  const [user, setUser] = useState<{ name: string; role: "admin" | "employee" } | null>(null)

  const handleLogin = (role: "admin" | "employee") => {
    const userData =
      role === "admin"
        ? { name: "Sarah Johnson", role: "admin" as const }
        : { name: "John Doe", role: "employee" as const }

    setUser(userData)
    setCurrentPage(role)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("landing")
  }

  return (
    <div className="min-h-screen">
      {currentPage === "landing" && <LandingPage onEnterPlatform={() => setCurrentPage("login")} />}
      {currentPage === "login" && <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage("landing")} />}
      {currentPage === "admin" && user && <AdminDashboard user={user} onLogout={handleLogout} />}
      {currentPage === "employee" && user && <EmployeeDashboard user={user} onLogout={handleLogout} />}
    </div>
  )
}
