"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calculator,
  FileText,
  BarChart3,
  Shield,
  LogOut,
  Download,
  Mail,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Brain,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  Scan,
} from "lucide-react"
import { glassCard, glassButton, gradientBg, glassInput } from "@/lib/glassmorphism"

interface AdminDashboardProps {
  user: { name: string; role: "admin" }
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showViewDocuments, setShowViewDocuments] = useState(false)
  const [showGenerateReport, setShowGenerateReport] = useState(false)
  const [showScanCertificate, setShowScanCertificate] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0)
  const [employeeScrollIndex, setEmployeeScrollIndex] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)
  const [certificateFile, setCertificateFile] = useState<File | null>(null)

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "employees", label: "Employees", icon: <Users className="h-4 w-4" /> },
    { id: "payroll", label: "Payroll", icon: <Calculator className="h-4 w-4" /> },
    { id: "compliance", label: "Compliance", icon: <Shield className="h-4 w-4" /> },
    { id: "reports", label: "Reports", icon: <FileText className="h-4 w-4" /> },
    { id: "harmony-ai", label: "Harmony AI", icon: <Brain className="h-4 w-4" /> },
    { id: "gamify", label: "Gamify", icon: <Trophy className="h-4 w-4" /> },
  ]

  const employees = [
    {
      id: 1,
      name: "Marcus Johnson",
      department: "Electrical",
      position: "Senior Electrician",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Un%20%C3%A9lectricien%20noir%20am%C3%A9ricain%20tenant%20des%20outils_%20_%20Image%20Premium%20g%C3%A9n%C3%A9r%C3%A9e%20%C3%A0%20base%20d%E2%80%99IA-NB3KpSsKScxvnNx2SOUBrUjXIvEDN7.jpeg",
      email: "marcus.johnson@harmony.com",
      phone: "+254 712 345 678",
      startDate: "Jan 15, 2022",
      salary: "KES 650,000",
      leaveBalance: "18 days",
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Aisha Williams",
      department: "Engineering",
      position: "Civil Engineer",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rihanna%20%28%20engenheira%20civil%29-uohy00IWhfkKXuFdkVMBxWMPY5PdYk.jpeg",
      email: "aisha.williams@harmony.com",
      phone: "+254 723 456 789",
      startDate: "Mar 10, 2021",
      salary: "KES 780,000",
      leaveBalance: "22 days",
      performance: "Outstanding",
    },
    {
      id: 3,
      name: "Keisha Davis",
      department: "Operations",
      position: "Warehouse Supervisor",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Contractor%20Photos%20-%20Download%20Free%20High-Quality%20Pictures%20_%20Freepik%20%282%29-Di6afQJY5IfdKXh5tztaO9Wi83zV5i.jpeg",
      email: "keisha.davis@harmony.com",
      phone: "+254 734 567 890",
      startDate: "Aug 5, 2020",
      salary: "KES 580,000",
      leaveBalance: "15 days",
      performance: "Good",
    },
    {
      id: 4,
      name: "Zara Thompson",
      department: "Construction",
      position: "Site Engineer",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Download%20free%20image%20of%20African%20woman%20civil%20engineer%20blueprint%20helmet%20worker_%20by%20Busbus%20about%20construction%2C%20person%2C%20orange%2C%20clothing%2C%20and%20woman%2016853732-VkQvHhVDqzDulp2JAIQpdqXvjDKq8F.jpeg",
      email: "zara.thompson@harmony.com",
      phone: "+254 745 678 901",
      startDate: "Nov 20, 2021",
      salary: "KES 720,000",
      leaveBalance: "20 days",
      performance: "Excellent",
    },
    {
      id: 5,
      name: "Amara Brown",
      department: "Safety",
      position: "Safety Inspector",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quirky%20Electrician%20with%20a%20Sense%20of%20Humor-YPAyIkj3Y16dSQvrrGkd4nBOPVbydA.jpeg",
      email: "amara.brown@harmony.com",
      phone: "+254 756 789 012",
      startDate: "Feb 14, 2023",
      salary: "KES 620,000",
      leaveBalance: "25 days",
      performance: "Good",
    },
    {
      id: 6,
      name: "Francisco Martinez",
      department: "Construction",
      position: "Construction Foreman",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Male%20construction%20worker-6h2CXfP2piqtTu0bJ2P6guiYxtYpzc.jpeg",
      email: "francisco.martinez@harmony.com",
      phone: "+254 767 890 123",
      startDate: "Jun 8, 2019",
      salary: "KES 680,000",
      leaveBalance: "12 days",
      performance: "Outstanding",
    },
    {
      id: 7,
      name: "Maya Johnson",
      department: "Construction",
      position: "Site Supervisor",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Construction%20workers%20working%20on%20a%20construction%20site%20_%20Premium%20Photo-kyC6nJaf1MCM2ncsfUqUX4essE4mW6.jpeg",
      email: "maya.johnson@harmony.com",
      phone: "+254 778 901 234",
      startDate: "Apr 12, 2022",
      salary: "KES 640,000",
      leaveBalance: "19 days",
      performance: "Excellent",
    },
    {
      id: 8,
      name: "Kendra Wilson",
      department: "Agriculture",
      position: "Farm Manager",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Corporate%20Employee%20PSD%2C%20High%20Quality%20Free%20PSD%20Templates%20for%20Download%20_%20Freepik%20%281%29-KBGvm5s0ZFOxoDFlThNNoP0VK0SqX1.jpeg",
      email: "kendra.wilson@harmony.com",
      phone: "+254 789 012 345",
      startDate: "Sep 3, 2021",
      salary: "KES 560,000",
      leaveBalance: "21 days",
      performance: "Good",
    },
    {
      id: 9,
      name: "Jasmine Carter",
      department: "Safety",
      position: "Safety Engineer",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quirky%20Electrician%20with%20a%20Sense%20of%20Humor-YPAyIkj3Y16dSQvrrGkd4nBOPVbydA.jpeg",
      email: "jasmine.carter@harmony.com",
      phone: "+254 790 123 456",
      startDate: "Dec 1, 2022",
      salary: "KES 670,000",
      leaveBalance: "24 days",
      performance: "Outstanding",
    },
    {
      id: 10,
      name: "David Thompson",
      department: "Construction",
      position: "Safety Coordinator",
      status: "Active",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Un%20%C3%A9lectricien%20noir%20am%C3%A9ricain%20tenant%20des%20outils_%20_%20Image%20Premium%20g%C3%A9n%C3%A9r%C3%A9e%20%C3%A0%20base%20d%E2%80%99IA-NB3KpSsKScxvnNx2SOUBrUjXIvEDN7.jpeg",
      email: "david.thompson@harmony.com",
      phone: "+254 701 234 567",
      startDate: "May 18, 2020",
      salary: "KES 610,000",
      leaveBalance: "16 days",
      performance: "Excellent",
    },
  ]

  const selectedEmployee = employees[selectedEmployeeIndex]
  const visibleEmployees = employees.slice(employeeScrollIndex, employeeScrollIndex + 5)

  const handlePrevious = () => {
    setSelectedEmployeeIndex((prev) => (prev > 0 ? prev - 1 : employees.length - 1))
  }

  const handleNext = () => {
    setSelectedEmployeeIndex((prev) => (prev < employees.length - 1 ? prev + 1 : 0))
  }

  const handleEmployeeScrollLeft = () => {
    setEmployeeScrollIndex((prev) => Math.max(0, prev - 1))
  }

  const handleEmployeeScrollRight = () => {
    setEmployeeScrollIndex((prev) => Math.min(employees.length - 5, prev + 1))
  }

  const handleScanCertificate = () => {
    if (!certificateFile) {
      alert("Please upload a certificate first")
      return
    }

    setIsScanning(true)
    setScanResults(null)

    // Simulate AI scanning process
    setTimeout(() => {
      setScanResults({
        certificateType: "Professional Engineering License",
        issuer: "Engineers Board of Kenya",
        validUntil: "Dec 2025",
        confidence: {
          authenticity: 94.5,
          validity: 98.2,
          match: 87.3,
          overall: 93.3,
        },
        status: "Valid",
        details: {
          licenseNumber: "EBK/PE/2023/1847",
          holderName: selectedEmployee.name,
          specialization: "Civil Engineering",
          issueDate: "Jan 2023",
        },
      })
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className={`min-h-screen ${gradientBg}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <header className={`${glassCard} m-4 p-4`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">HARMONY Admin</h1>
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-300/30">Administrator</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}</span>
              <Button onClick={onLogout} className={`${glassButton} text-white`}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <nav className={`${glassCard} m-4 p-2`}>
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${tab.id === activeTab ? "bg-white/20" : ""} ${glassButton} text-white whitespace-nowrap`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        <main className="p-4">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "employees" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Employee Management</h2>
                <Button onClick={() => setShowAddEmployee(true)} className={`${glassButton} text-white`}>
                  <Users className="h-4 w-4 mr-2" /> Add Employee
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`${glassCard} lg:col-span-2 relative`}>
                  <div className="w-full h-96 relative">
                    <img
                      src={selectedEmployee.photo || "/placeholder.svg"}
                      alt={selectedEmployee.name}
                      className="w-full h-full object-contain"
                    />

                    {/* AI Scanning Animation */}
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="relative w-full h-full">
                          {/* Neon scanning line */}
                          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse">
                            <div
                              className="w-full h-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-bounce"
                              style={{
                                animation: "scan 2s linear infinite",
                                boxShadow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
                              }}
                            ></div>
                          </div>

                          {/* Scanning grid overlay */}
                          <div className="absolute inset-0 opacity-30">
                            <svg className="w-full h-full" viewBox="0 0 400 400">
                              <defs>
                                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path
                                    d="M 20 0 L 0 0 0 20"
                                    fill="none"
                                    stroke="cyan"
                                    strokeWidth="0.5"
                                    opacity="0.5"
                                  />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                          </div>

                          {/* Scanning text */}
                          <div className="absolute bottom-4 left-4 right-4 text-center">
                            <div className="text-cyan-400 font-bold text-lg animate-pulse">
                              🔍 AI Scanning Certificate...
                            </div>
                            <div className="text-cyan-300 text-sm mt-2">
                              Analyzing document authenticity and validity
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <style jsx>{`
                    @keyframes scan {
                      0% { transform: translateY(-100%); }
                      100% { transform: translateY(400px); }
                    }
                  `}</style>
                </div>

                <div className={`${glassCard} p-6`}>
                  <h3 className="text-xl font-semibold text-white mb-6">Employee Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/70 text-sm">Name</label>
                      <p className="text-white font-medium">{selectedEmployee.name}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Position</label>
                      <p className="text-white font-medium">{selectedEmployee.position}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Department</label>
                      <p className="text-white font-medium">{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Email</label>
                      <p className="text-white font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Phone</label>
                      <p className="text-white font-medium">{selectedEmployee.phone}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Start Date</label>
                      <p className="text-white font-medium">{selectedEmployee.startDate}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Salary</label>
                      <p className="text-white font-medium">{selectedEmployee.salary}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Leave Balance</label>
                      <p className="text-white font-medium">{selectedEmployee.leaveBalance}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Performance</label>
                      <Badge
                        className={
                          selectedEmployee.performance === "Outstanding"
                            ? "bg-green-500/20 text-green-200"
                            : selectedEmployee.performance === "Excellent"
                              ? "bg-blue-500/20 text-blue-200"
                              : "bg-yellow-500/20 text-yellow-200"
                        }
                      >
                        {selectedEmployee.performance}
                      </Badge>
                    </div>
                    <div className="pt-4">
                      <Badge
                        className={
                          selectedEmployee.status === "Active"
                            ? "bg-green-500/20 text-green-200"
                            : "bg-red-500/20 text-red-200"
                        }
                      >
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${glassCard} p-6`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Employee Details</h3>
                  <div className="flex space-x-2">
                    <Button onClick={() => setShowEditProfile(true)} className={`${glassButton} text-white`} size="sm">
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => setShowViewDocuments(true)}
                      className={`${glassButton} text-white`}
                      size="sm"
                    >
                      View Documents
                    </Button>
                    <Button
                      onClick={() => setShowGenerateReport(true)}
                      className={`${glassButton} text-white`}
                      size="sm"
                    >
                      Generate Report
                    </Button>
                    <Button
                      onClick={() => setShowScanCertificate(true)}
                      className={`${glassButton} text-white`}
                      size="sm"
                    >
                      <Scan className="h-4 w-4 mr-2" />
                      Scan Certificate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePrevious} className={`${glassButton} text-white p-3`} size="sm">
                  ←
                </Button>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleEmployeeScrollLeft}
                    disabled={employeeScrollIndex === 0}
                    className={`${glassButton} text-white p-2`}
                    size="sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex space-x-2">
                    {visibleEmployees.map((employee, index) => {
                      const actualIndex = employeeScrollIndex + index
                      return (
                        <div
                          key={employee.id}
                          onClick={() => setSelectedEmployeeIndex(actualIndex)}
                          className={`${glassCard} p-3 cursor-pointer transition-all duration-300 min-w-[120px] ${
                            actualIndex === selectedEmployeeIndex ? "ring-2 ring-blue-400" : ""
                          }`}
                        >
                          <img
                            src={employee.photo || "/placeholder.svg"}
                            alt={employee.name}
                            className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                          />
                          <p className="text-white text-xs text-center font-medium">{employee.name.split(" ")[0]}</p>
                          <p className="text-white/60 text-xs text-center">{employee.department}</p>
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    onClick={handleEmployeeScrollRight}
                    disabled={employeeScrollIndex >= employees.length - 5}
                    className={`${glassButton} text-white p-2`}
                    size="sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={handleNext} className={`${glassButton} text-white p-3`} size="sm">
                  →
                </Button>
              </div>

              {/* Certificate Scanning Modal */}
              {showScanCertificate && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        AI Certificate Scanner - {selectedEmployee.name}
                      </h3>
                      <Button
                        onClick={() => setShowScanCertificate(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Upload Certificate</label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2`}
                        />
                        {certificateFile && (
                          <p className="text-green-300 text-sm mt-2">✓ {certificateFile.name} uploaded</p>
                        )}
                      </div>

                      <Button
                        onClick={handleScanCertificate}
                        disabled={!certificateFile || isScanning}
                        className={`${glassButton} text-white w-full`}
                      >
                        {isScanning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Scan className="h-4 w-4 mr-2" />
                            Start AI Scan
                          </>
                        )}
                      </Button>

                      {scanResults && (
                        <div className={`${glassCard} p-6 space-y-4`}>
                          <h4 className="text-white font-semibold text-lg mb-4">🤖 AI Scan Results</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`${glassCard} p-4`}>
                              <h5 className="text-white font-medium mb-3">Certificate Details</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/70">Type:</span>
                                  <span className="text-white">{scanResults.certificateType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Issuer:</span>
                                  <span className="text-white">{scanResults.issuer}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">License #:</span>
                                  <span className="text-white">{scanResults.details.licenseNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Valid Until:</span>
                                  <span className="text-white">{scanResults.validUntil}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Status:</span>
                                  <Badge className="bg-green-500/20 text-green-200">{scanResults.status}</Badge>
                                </div>
                              </div>
                            </div>

                            <div className={`${glassCard} p-4`}>
                              <h5 className="text-white font-medium mb-3">Confidence Levels</h5>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/70">Authenticity</span>
                                    <span className="text-white">{scanResults.confidence.authenticity}%</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{ width: `${scanResults.confidence.authenticity}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/70">Validity</span>
                                    <span className="text-white">{scanResults.confidence.validity}%</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${scanResults.confidence.validity}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/70">Name Match</span>
                                    <span className="text-white">{scanResults.confidence.match}%</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                      className="bg-purple-500 h-2 rounded-full"
                                      style={{ width: `${scanResults.confidence.match}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-white/10">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white font-medium">Overall Confidence</span>
                                    <span className="text-white font-bold">{scanResults.confidence.overall}%</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-3">
                                    <div
                                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                                      style={{ width: `${scanResults.confidence.overall}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={`${glassCard} p-4`}>
                            <h5 className="text-white font-medium mb-2">🎯 AI Recommendations</h5>
                            <div className="text-sm text-white/80">
                              {scanResults.confidence.overall >= 90 ? (
                                <p className="text-green-300">
                                  ✅ Certificate appears authentic and valid. Recommended for approval.
                                </p>
                              ) : scanResults.confidence.overall >= 75 ? (
                                <p className="text-yellow-300">
                                  ⚠️ Certificate shows good confidence levels but requires manual review.
                                </p>
                              ) : (
                                <p className="text-red-300">
                                  ❌ Low confidence levels detected. Manual verification strongly recommended.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {showAddEmployee && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Add New Employee</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Full Name</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter full name" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Email</label>
                        <input className={`${glassInput} w-full p-2`} type="email" placeholder="Enter email" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Department</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>Engineering</option>
                          <option>Construction</option>
                          <option>Safety</option>
                          <option>Operations</option>
                          <option>Agriculture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Position</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter position" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Phone</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="+254 7XX XXX XXX" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Salary</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="KES XXX,XXX" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowAddEmployee(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Employee added successfully")
                          setShowAddEmployee(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Add Employee
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {showEditProfile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Edit Profile - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Full Name</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.name} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Email</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.email} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Phone</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.phone} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Position</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.position} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Salary</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.salary} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Update Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowEditProfile(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Profile updated successfully")
                          setShowEditProfile(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {showViewDocuments && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Documents - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">ID Card</h4>
                          <p className="text-white/60 text-sm">Expires: Dec 2026</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-500/20 text-green-200">Valid</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">Employment Contract</h4>
                          <p className="text-white/60 text-sm">Expires: Jan 2025</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-500/20 text-green-200">Valid</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">Safety Certificate</h4>
                          <p className="text-white/60 text-sm">Expires: Mar 2024</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-yellow-500/20 text-yellow-200">Expiring Soon</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-white/70 text-sm mb-2">Upload New Document</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2 mb-2`}
                        />
                        <Button
                          onClick={() => alert("Document uploaded successfully")}
                          className={`${glassButton} text-white`}
                        >
                          Upload Document
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button onClick={() => setShowViewDocuments(false)} className={`${glassButton} text-white`}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {showGenerateReport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Generate Report - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Report Type</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>Employee Profile Report</option>
                          <option>Performance Report</option>
                          <option>Attendance Report</option>
                          <option>Payroll Report</option>
                          <option>Compliance Report</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="date" className={`${glassInput} p-2`} />
                          <input type="date" className={`${glassInput} p-2`} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Format</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>PDF</option>
                          <option>Excel</option>
                          <option>Word</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowGenerateReport(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Report generated and downloaded")
                          setShowGenerateReport(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Generate & Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "payroll" && <PayrollTab />}
          {activeTab === "compliance" && <ComplianceTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "harmony-ai" && <HarmonyAITab />}
          {activeTab === "gamify" && <GamifyTab />}
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Total Employees" value="247" icon={<Users className="h-6 w-6" />} color="text-blue-300" />
      <StatsCard title="Pending Payroll" value="12" icon={<Calculator className="h-6 w-6" />} color="text-yellow-300" />
      <StatsCard
        title="Compliance Issues"
        value="3"
        icon={<AlertTriangle className="h-6 w-6" />}
        color="text-red-300"
      />
      <StatsCard title="Leave Requests" value="8" icon={<Clock className="h-6 w-6" />} color="text-green-300" />

      <div className={`${glassCard} p-6 md:col-span-2 lg:col-span-3`}>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <ActivityItem text="Payroll processed for Marketing Department" time="2 hours ago" />
          <ActivityItem text="New employee onboarded: Jane Smith" time="4 hours ago" />
          <ActivityItem text="Compliance document expired for John Doe" time="1 day ago" />
          <ActivityItem text="Leave request approved for Sarah Wilson" time="2 days ago" />
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            onClick={() => alert("Payroll processing started")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <Calculator className="h-4 w-4 mr-2" /> Process Payroll
          </Button>
          <Button
            onClick={() => alert("Add employee form opened")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <Users className="h-4 w-4 mr-2" /> Add Employee
          </Button>
          <Button
            onClick={() => alert("Generate report form opened")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>
    </div>
  )
}

function PayrollTab() {
  const [selectedPayrollAction, setSelectedPayrollAction] = useState<string | null>(null)

  const handlePayrollActionClick = (actionType: string) => {
    setSelectedPayrollAction(selectedPayrollAction === actionType ? null : actionType)
  }

  const generatePDF = (actionType: string) => {
    const pdfContent = `
    HARMONY HR SYSTEM - ${actionType.toUpperCase()} REPORT
    Generated on: ${new Date().toLocaleDateString()}
    
    ${
      actionType === "calculate"
        ? "SALARY CALCULATION REPORT"
        : actionType === "export"
          ? "PAYSLIP EXPORT REPORT"
          : actionType === "email"
            ? "EMAIL DELIVERY REPORT"
            : actionType === "whatsapp"
              ? "WHATSAPP DELIVERY REPORT"
              : "NET PAY CALCULATOR REPORT"
    }
    
    Total Employees: 247
    Processed: 235
    Pending: 12
    Total Payroll: KES 12,450,000
    
    Department Breakdown:
    - Engineering: KES 4,500,000
    - Construction: KES 3,800,000
    - Safety: KES 2,200,000
    - Operations: KES 1,950,000
    
    Status: Completed Successfully
    Generated by: Admin User
  `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${actionType}-report-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} report generated and downloaded!`)
  }

  function PayrollActionCard({
    title,
    icon,
    onClick,
    onGeneratePDF,
    isSelected,
  }: {
    title: string
    icon: React.ReactNode
    onClick: () => void
    onGeneratePDF: () => void
    isSelected: boolean
  }) {
    return (
      <div className="relative overflow-hidden">
        <Button
          onClick={onClick}
          className={`${glassButton} text-white p-6 h-auto w-full flex-col cursor-pointer transition-all duration-500 transform hover:scale-105 ${
            isSelected ? "ring-2 ring-blue-400 bg-white/20 shadow-2xl" : "hover:bg-white/15"
          }`}
        >
          <div className="relative z-10">
            {icon}
            <span className="mb-3 text-center">{title}</span>

            {isSelected && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-pulse rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse transform -skew-x-12"></div>
              </div>
            )}

            {isSelected && (
              <div className="mt-4 space-y-2 relative z-20">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onGeneratePDF()
                  }}
                  className={`${glassButton} text-white w-full`}
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>

                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>

                <div className="text-blue-300 text-sm animate-pulse">✨ Processing...</div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

          {isSelected && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 animate-pulse rounded-lg"></div>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
        <Button onClick={() => alert("Payroll processing initiated")} className={`${glassButton} text-white`}>
          <Calculator className="h-4 w-4 mr-2" /> Process Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Payroll"
          value="KES 12.45M"
          icon={<DollarSign className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard title="Processed" value="235" icon={<CheckCircle className="h-6 w-6" />} color="text-blue-300" />
        <StatsCard title="Pending" value="12" icon={<Clock className="h-6 w-6" />} color="text-yellow-300" />
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Payroll Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PayrollActionCard
            title="Calculate Salaries"
            icon={<Calculator className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("calculate")}
            onGeneratePDF={() => generatePDF("calculate")}
            isSelected={selectedPayrollAction === "calculate"}
          />
          <PayrollActionCard
            title="Export Payslips"
            icon={<Download className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("export")}
            onGeneratePDF={() => generatePDF("export")}
            isSelected={selectedPayrollAction === "export"}
          />
          <PayrollActionCard
            title="Send via Email"
            icon={<Mail className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("email")}
            onGeneratePDF={() => generatePDF("email")}
            isSelected={selectedPayrollAction === "email"}
          />
          <PayrollActionCard
            title="Send via WhatsApp"
            icon={<MessageSquare className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("whatsapp")}
            onGeneratePDF={() => generatePDF("whatsapp")}
            isSelected={selectedPayrollAction === "whatsapp"}
          />
          <PayrollActionCard
            title="NET PAY CALCULATOR 2025"
            icon={<DollarSign className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("netpay-calculator")}
            onGeneratePDF={() => generatePDF("netpay-calculator")}
            isSelected={selectedPayrollAction === "netpay-calculator"}
          />
        </div>
      </div>

      {selectedPayrollAction && (
        <div className={`${glassCard} p-6`}>
          <SalaryCalculationChart />
        </div>
      )}
    </div>
  )
}

function SalaryCalculationChart() {
  const calculationData = [
    { department: "Engineering", employees: 45, grossTotal: 33750000, netTotal: 25650000, deductions: 8100000 },
    { department: "Construction", employees: 78, grossTotal: 50700000, netTotal: 38520000, deductions: 12180000 },
    { department: "Safety", employees: 32, grossTotal: 19840000, netTotal: 15080000, deductions: 4760000 },
    { department: "Operations", employees: 28, grossTotal: 16240000, netTotal: 12340000, deductions: 3900000 },
    { department: "Agriculture", employees: 24, grossTotal: 13440000, netTotal: 10210000, deductions: 3230000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">💰</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Salary Calculation Analytics</h3>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>

          <h4 className="text-white font-medium mb-6 flex items-center space-x-2">
            <span>📊 Department Salary Breakdown</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </h4>

          <div className="space-y-6">
            {calculationData.map((dept, index) => (
              <div key={dept.department} className="space-y-3 group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index === 0
                          ? "bg-blue-500"
                          : index === 1
                            ? "bg-green-500"
                            : index === 2
                              ? "bg-yellow-500"
                              : index === 3
                                ? "bg-purple-500"
                                : "bg-pink-500"
                      } animate-pulse`}
                    ></div>
                    <span className="text-white/70 group-hover:text-white transition-colors">{dept.department}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">KES {(dept.grossTotal / 1000000).toFixed(1)}M</div>
                    <div className="text-white/60 text-sm">{dept.employees} employees</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-2000 ease-out rounded-full relative ${
                        index === 0
                          ? "bg-gradient-to-r from-blue-400 to-blue-600"
                          : index === 1
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : index === 2
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : index === 3
                                ? "bg-gradient-to-r from-purple-400 to-purple-600"
                                : "bg-gradient-to-r from-pink-400 to-pink-600"
                      }`}
                      style={{ width: `${(dept.grossTotal / 50700000) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="absolute -top-8 right-0 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    KES {dept.grossTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glassCard} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl"></div>

          <h4 className="text-white font-medium mb-6 flex items-center space-x-2">
            <span>📋 Calculation Summary</span>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          </h4>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
              <span className="text-white/70 group-hover:text-white transition-colors">Total Gross Salary</span>
              <div className="text-right">
                <span className="text-green-300 font-bold text-xl">
                  KES {(calculationData.reduce((sum, dept) => sum + dept.grossTotal, 0) / 1000000).toFixed(1)}M
                </span>
                <div className="w-full h-1 bg-green-500/30 rounded-full mt-1">
                  <div className="h-full bg-green-400 rounded-full animate-pulse" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
              <span className="text-white/70 group-hover:text-white transition-colors">Total Net Salary</span>
              <div className="text-right">
                <span className="text-blue-300 font-bold text-xl">
                  KES {(calculationData.reduce((sum, dept) => sum + dept.netTotal, 0) / 1000000).toFixed(1)}M
                </span>
                <div className="w-full h-1 bg-blue-500/30 rounded-full mt-1">
                  <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group">
              <span className="text-white/70 group-hover:text-white transition-colors">Total Deductions</span>
              <div className="text-right">
                <span className="text-red-300 font-bold text-xl">
                  KES {(calculationData.reduce((sum, dept) => sum + dept.deductions, 0) / 1000000).toFixed(1)}M
                </span>
                <div className="w-full h-1 bg-red-500/30 rounded-full mt-1">
                  <div className="h-full bg-red-400 rounded-full animate-pulse" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
              <span className="text-white/70 group-hover:text-white transition-colors">Total Employees</span>
              <div className="text-right">
                <span className="text-purple-300 font-bold text-xl">
                  {calculationData.reduce((sum, dept) => sum + dept.employees, 0)}
                </span>
                <div className="flex space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse"></div>

        <h4 className="text-white font-medium mb-6 flex items-center space-x-2">
          <span>⚡ Processing Status</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="relative mb-3">
              <div className="text-4xl font-bold text-green-300 group-hover:scale-110 transition-transform duration-300">
                235
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-white/60 text-sm">Calculated</div>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative mb-3">
              <div className="text-4xl font-bold text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                12
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <div className="text-white/60 text-sm">Pending</div>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"
                style={{ width: "5%" }}
              ></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative mb-3">
              <div className="text-4xl font-bold text-blue-300 group-hover:scale-110 transition-transform duration-300">
                95.1%
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-spin"></div>
            </div>
            <div className="text-white/60 text-sm">Success Rate</div>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative mb-3">
              <div className="text-4xl font-bold text-purple-300 group-hover:scale-110 transition-transform duration-300">
                2.5min
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-white/60 text-sm">Avg Time</div>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-black/20 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Real-time Processing Status</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full animate-pulse transform origin-left scale-x-95"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComplianceTab() {
  const complianceItems = [
    { employee: "John Doe", document: "ID Card", status: "Expiring Soon", daysLeft: 15 },
    { employee: "Jane Smith", document: "Contract", status: "Valid", daysLeft: 180 },
    { employee: "Mike Johnson", document: "Certificate", status: "Expired", daysLeft: -5 },
    { employee: "Sarah Wilson", document: "License", status: "Valid", daysLeft: 90 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Compliance Management</h2>
        <Button onClick={() => alert("Compliance check completed")} className={`${glassButton} text-white`}>
          <Shield className="h-4 w-4 mr-2" /> Run Compliance Check
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Valid Documents"
          value="89%"
          icon={<CheckCircle className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard
          title="Expiring Soon"
          value="8"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="text-yellow-300"
        />
        <StatsCard title="Expired" value="3" icon={<AlertTriangle className="h-6 w-6" />} color="text-red-300" />
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Document Status</h3>
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div key={index} className={`${glassCard} p-4 flex justify-between items-center`}>
              <div>
                <h4 className="text-white font-semibold">{item.employee}</h4>
                <p className="text-white/70">{item.document}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  className={
                    item.status === "Valid"
                      ? "bg-green-500/20 text-green-200"
                      : item.status === "Expiring Soon"
                        ? "bg-yellow-500/20 text-yellow-200"
                        : "bg-red-500/20 text-red-200"
                  }
                >
                  {item.status}
                </Badge>
                <span className="text-white/70 text-sm">
                  {item.daysLeft > 0 ? `${item.daysLeft} days left` : `${Math.abs(item.daysLeft)} days overdue`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const handleReportClick = (reportType: string) => {
    setSelectedReport(selectedReport === reportType ? null : reportType)
  }

  function ReportCard({
    title,
    description,
    onClick,
    isSelected,
  }: {
    title: string
    description: string
    onClick: () => void
    isSelected: boolean
  }) {
    return (
      <div
        className={`${glassButton} text-white p-4 h-auto flex-col cursor-pointer transition-all duration-300 ${
          isSelected ? "ring-2 ring-blue-400 bg-white/20" : "hover:bg-white/15"
        }`}
        onClick={onClick}
      >
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
        {isSelected && (
          <div className="mt-4 space-y-2">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                alert(`${title} generated and downloaded`)
              }}
              className={`${glassButton} text-white w-full`}
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
        <Button onClick={() => alert("Custom report builder opened")} className={`${glassButton} text-white`}>
          <FileText className="h-4 w-4 mr-2" /> Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard
          title="Employee Report"
          description="Comprehensive employee data and statistics"
          onClick={() => handleReportClick("employee")}
          isSelected={selectedReport === "employee"}
        />
        <ReportCard
          title="Payroll Report"
          description="Salary calculations and payment history"
          onClick={() => handleReportClick("payroll")}
          isSelected={selectedReport === "payroll"}
        />
        <ReportCard
          title="Attendance Report"
          description="Employee attendance and leave records"
          onClick={() => handleReportClick("attendance")}
          isSelected={selectedReport === "attendance"}
        />
        <ReportCard
          title="Performance Report"
          description="Employee performance metrics and reviews"
          onClick={() => handleReportClick("performance")}
          isSelected={selectedReport === "performance"}
        />
        <ReportCard
          title="Compliance Report"
          description="Document status and compliance tracking"
          onClick={() => handleReportClick("compliance")}
          isSelected={selectedReport === "compliance"}
        />
        <ReportCard
          title="Department Report"
          description="Department-wise analytics and insights"
          onClick={() => handleReportClick("department")}
          isSelected={selectedReport === "department"}
        />
      </div>
    </div>
  )
}

function HarmonyAITab() {
  const [aiQuery, setAiQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState<string | null>(null)

  const handleAIQuery = async () => {
    if (!aiQuery.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setAiResponse(
        `Based on your query "${aiQuery}", here are the insights:\n\n• Employee productivity has increased by 15% this quarter\n• Recommended actions: Focus on team collaboration tools\n• Predicted trends: Remote work efficiency will continue to improve\n• Suggested optimizations: Implement flexible working hours`,
      )
      setIsLoading(false)
    }, 2000)
  }

  const handleQuickAction = (actionType: string) => {
    setShowAnalyticsPanel(actionType)
  }

  const closeAnalyticsPanel = () => {
    setShowAnalyticsPanel(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Harmony AI Assistant</h2>
        <Badge className="bg-purple-500/20 text-purple-200 border-purple-300/30">AI Powered</Badge>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Ask Harmony AI</h3>
        <div className="space-y-4">
          <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask me anything about your HR data, employee insights, or recommendations..."
            className={`${glassInput} w-full p-4 h-32 resize-none`}
          />
          <Button
            onClick={handleAIQuery}
            disabled={isLoading || !aiQuery.trim()}
            className={`${glassButton} text-white`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Ask AI
              </>
            )}
          </Button>
        </div>

        {aiResponse && (
          <div className={`${glassCard} p-4 mt-6`}>
            <h4 className="text-white font-semibold mb-2">AI Response:</h4>
            <pre className="text-white/80 whitespace-pre-wrap text-sm">{aiResponse}</pre>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
          <div className="space-y-3">
            <div className={`${glassCard} p-3`}>
              <p className="text-white/80 text-sm">
                🎯 <strong>Productivity Trend:</strong> 15% increase in overall team productivity this month
              </p>
            </div>
            <div className={`${glassCard} p-3`}>
              <p className="text-white/80 text-sm">
                📊 <strong>Attendance Pattern:</strong> Remote work days show 8% higher efficiency
              </p>
            </div>
            <div className={`${glassCard} p-3`}>
              <p className="text-white/80 text-sm">
                💡 <strong>Recommendation:</strong> Consider implementing flexible work schedules
              </p>
            </div>
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              onClick={() => handleQuickAction("performance")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              📈 Analyze Performance Trends
            </Button>
            <Button
              onClick={() => handleQuickAction("staffing")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              🔮 Predict Staffing Needs
            </Button>
            <Button
              onClick={() => handleQuickAction("payroll")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              💰 Optimize Payroll
            </Button>
            <Button
              onClick={() => handleQuickAction("satisfaction")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              😊 Satisfaction Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Overlay Panels */}
      {showAnalyticsPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`${glassCard} p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">
                {showAnalyticsPanel === "performance" && "📈 Performance Trends Analysis"}
                {showAnalyticsPanel === "staffing" && "🔮 Staffing Needs Prediction"}
                {showAnalyticsPanel === "payroll" && "💰 Payroll Optimization"}
                {showAnalyticsPanel === "satisfaction" && "😊 Employee Satisfaction Analysis"}
              </h3>
              <Button onClick={closeAnalyticsPanel} variant="ghost" className="text-white/70 hover:text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>

            {showAnalyticsPanel === "performance" && <PerformanceAnalytics />}
            {showAnalyticsPanel === "staffing" && <StaffingPrediction />}
            {showAnalyticsPanel === "payroll" && <PayrollOptimization />}
            {showAnalyticsPanel === "satisfaction" && <SatisfactionAnalysis />}
          </div>
        </div>
      )}
    </div>
  )
}

function PerformanceAnalytics() {
  const performanceData = [
    { month: "Jan", productivity: 85, efficiency: 78, quality: 92 },
    { month: "Feb", productivity: 88, efficiency: 82, quality: 89 },
    { month: "Mar", productivity: 92, efficiency: 85, quality: 94 },
    { month: "Apr", productivity: 89, efficiency: 88, quality: 91 },
    { month: "May", productivity: 95, efficiency: 91, quality: 96 },
    { month: "Jun", productivity: 98, efficiency: 94, quality: 98 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">📊 Performance Trends</h4>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="productivityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="50"
                  y1={40 + i * 30}
                  x2="350"
                  y2={40 + i * 30}
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Productivity line */}
              <polyline
                fill="none"
                stroke="rgb(34 197 94)"
                strokeWidth="3"
                points={performanceData.map((d, i) => `${70 + i * 50},${180 - d.productivity * 1.4}`).join(" ")}
              />

              {/* Efficiency line */}
              <polyline
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="3"
                points={performanceData.map((d, i) => `${70 + i * 50},${180 - d.efficiency * 1.4}`).join(" ")}
              />

              {/* Quality line */}
              <polyline
                fill="none"
                stroke="rgb(168 85 247)"
                strokeWidth="3"
                points={performanceData.map((d, i) => `${70 + i * 50},${180 - d.quality * 1.4}`).join(" ")}
              />

              {/* Data points */}
              {performanceData.map((d, i) => (
                <g key={i}>
                  <circle cx={70 + i * 50} cy={180 - d.productivity * 1.4} r="4" fill="rgb(34 197 94)" />
                  <circle cx={70 + i * 50} cy={180 - d.efficiency * 1.4} r="4" fill="rgb(59 130 246)" />
                  <circle cx={70 + i * 50} cy={180 - d.quality * 1.4} r="4" fill="rgb(168 85 247)" />
                </g>
              ))}

              {/* Labels */}
              {performanceData.map((d, i) => (
                <text key={i} x={70 + i * 50} y="195" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
                  {d.month}
                </text>
              ))}
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-white/70 text-sm">Productivity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-white/70 text-sm">Efficiency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-white/70 text-sm">Quality</span>
            </div>
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">🎯 Key Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
              <span className="text-white/70">Current Productivity</span>
              <span className="text-green-300 font-bold text-xl">98%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
              <span className="text-white/70">Efficiency Rate</span>
              <span className="text-blue-300 font-bold text-xl">94%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
              <span className="text-white/70">Quality Score</span>
              <span className="text-purple-300 font-bold text-xl">98%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
              <span className="text-white/70">Growth Rate</span>
              <span className="text-yellow-300 font-bold text-xl">+15%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">📋 AI Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">🚀 Productivity Boost</h5>
            <p className="text-white/70 text-sm">
              Implement automated task scheduling to increase productivity by an estimated 12%
            </p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">⚡ Efficiency Optimization</h5>
            <p className="text-white/70 text-sm">Reduce meeting times by 25% and focus on asynchronous communication</p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">🎯 Quality Enhancement</h5>
            <p className="text-white/70 text-sm">
              Introduce peer review processes to maintain quality standards above 95%
            </p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">📈 Growth Strategy</h5>
            <p className="text-white/70 text-sm">
              Focus on skill development programs to sustain current growth trajectory
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StaffingPrediction() {
  const staffingData = [
    { department: "Engineering", current: 45, predicted: 52, growth: "+15%" },
    { department: "Construction", current: 78, predicted: 85, growth: "+9%" },
    { department: "Safety", current: 32, predicted: 38, growth: "+19%" },
    { department: "Operations", current: 28, predicted: 31, growth: "+11%" },
    { department: "Agriculture", current: 24, predicted: 26, growth: "+8%" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">📊 Staffing Forecast</h4>
          <div className="space-y-4">
            {staffingData.map((dept, index) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{dept.department}</span>
                  <div className="text-right">
                    <span className="text-white font-medium">
                      {dept.current} → {dept.predicted}
                    </span>
                    <span className="text-green-300 text-sm ml-2">{dept.growth}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500/80 rounded-full"
                      style={{ width: `${(dept.current / 85) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500/80 rounded-full"
                      style={{ width: `${(dept.predicted / 85) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">🎯 Hiring Timeline</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Q1 2025</div>
                <div className="text-white/70 text-sm">Hire 8 new employees</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Q2 2025</div>
                <div className="text-white/70 text-sm">Hire 12 new employees</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Q3 2025</div>
                <div className="text-white/70 text-sm">Hire 6 new employees</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Q4 2025</div>
                <div className="text-white/70 text-sm">Hire 6 new employees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">🔮 AI Predictions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
            <div className="text-3xl font-bold text-blue-300 mb-2">32</div>
            <div className="text-white/70 text-sm">Total New Hires Needed</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
            <div className="text-3xl font-bold text-green-300 mb-2">KES 21M</div>
            <div className="text-white/70 text-sm">Estimated Hiring Budget</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
            <div className="text-3xl font-bold text-purple-300 mb-2">85%</div>
            <div className="text-white/70 text-sm">Prediction Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PayrollOptimization() {
  const optimizationData = [
    { category: "Base Salaries", current: 85000000, optimized: 82000000, savings: 3000000 },
    { category: "Overtime", current: 4500000, optimized: 3200000, savings: 1300000 },
    { category: "Benefits", current: 12000000, optimized: 11500000, savings: 500000 },
    { category: "Bonuses", current: 6800000, optimized: 7200000, savings: -400000 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">💰 Cost Optimization</h4>
          <div className="space-y-4">
            {optimizationData.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{item.category}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      KES {(item.current / 1000000).toFixed(0)}M → KES {(item.optimized / 1000000).toFixed(0)}M
                    </div>
                    <div
                      className={`text-sm ${
                        item.savings > 0 ? "text-green-300" : item.savings < 0 ? "text-red-300" : "text-white/70"
                      }`}
                    >
                      {item.savings > 0 ? "-" : item.savings < 0 ? "+" : ""}KES{" "}
                      {Math.abs(item.savings / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div className="bg-blue-500/80" style={{ width: `${(item.current / 85000000) * 100}%` }}></div>
                    <div
                      className={`${item.savings > 0 ? "bg-green-500/80" : "bg-red-500/80"}`}
                      style={{ width: `${(Math.abs(item.savings) / 85000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">📊 Savings Breakdown</h4>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Pie chart segments */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgb(34 197 94)"
                strokeWidth="20"
                strokeDasharray="188.5 62.8"
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="20"
                strokeDasharray="81.7 169.6"
                strokeDashoffset="-188.5"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgb(168 85 247)"
                strokeWidth="20"
                strokeDasharray="31.4 219.9"
                strokeDashoffset="-270.2"
                transform="rotate(-90 100 100)"
              />

              <text x="100" y="100" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                KES 4.4M
              </text>
              <text x="100" y="115" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
                Total Savings
              </text>
            </svg>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-white/70 text-sm">Base Salaries</span>
              </div>
              <span className="text-white">KES 3M (68%)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-white/70 text-sm">Overtime</span>
              </div>
              <span className="text-white">KES 1.3M (30%)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-white/70 text-sm">Benefits</span>
              </div>
              <span className="text-white">KES 0.5M (11%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">🎯 Optimization Strategies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">💡 Salary Restructuring</h5>
            <p className="text-white/70 text-sm">
              Implement performance-based pay scales to optimize salary distribution across departments
            </p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">⏰ Overtime Management</h5>
            <p className="text-white/70 text-sm">
              Reduce overtime costs by 29% through better scheduling and workload distribution
            </p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">🏥 Benefits Optimization</h5>
            <p className="text-white/70 text-sm">
              Negotiate better rates with providers while maintaining employee satisfaction
            </p>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">🏆 Bonus Reallocation</h5>
            <p className="text-white/70 text-sm">
              Increase performance bonuses to motivate high achievers and retain top talent
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SatisfactionAnalysis() {
  const satisfactionData = [
    { department: "Engineering", score: 8.5, trend: "+0.3" },
    { department: "Construction", score: 7.8, trend: "+0.1" },
    { department: "Safety", score: 9.1, trend: "+0.5" },
    { department: "Operations", score: 7.2, trend: "-0.2" },
    { department: "Agriculture", score: 8.0, trend: "+0.4" },
  ]

  const factorData = [
    { factor: "Work-Life Balance", score: 8.2, impact: "High" },
    { factor: "Compensation", score: 7.5, impact: "High" },
    { factor: "Career Growth", score: 7.8, impact: "Medium" },
    { factor: "Management", score: 8.0, impact: "High" },
    { factor: "Work Environment", score: 8.5, impact: "Medium" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">😊 Department Satisfaction</h4>
          <div className="space-y-4">
            {satisfactionData.map((dept, index) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{dept.department}</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{dept.score}/10</span>
                    <span className={`text-sm ml-2 ${dept.trend.startsWith("+") ? "text-green-300" : "text-red-300"}`}>
                      {dept.trend}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      dept.score >= 8.5 ? "bg-green-500/80" : dept.score >= 7.5 ? "bg-yellow-500/80" : "bg-red-500/80"
                    }`}
                    style={{ width: `${(dept.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">📊 Satisfaction Factors</h4>
          <div className="space-y-4">
            {factorData.map((factor, index) => (
              <div key={factor.factor} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{factor.factor}</div>
                  <div className="text-white/60 text-sm">Impact: {factor.impact}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{factor.score}/10</div>
                  <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full ${
                        factor.score >= 8 ? "bg-green-500" : factor.score >= 7 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${(factor.score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">📈 Satisfaction Trends</h4>
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="50"
                y1={40 + i * 30}
                x2="350"
                y2={40 + i * 30}
                stroke="rgb(255 255 255 / 0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Satisfaction trend line */}
            <polyline
              fill="none"
              stroke="rgb(34 197 94)"
              strokeWidth="3"
              points="70,120 120,110 170,100 220,95 270,85 320,80"
            />

            {/* Data points */}
            {[120, 110, 100, 95, 85, 80].map((y, i) => (
              <circle key={i} cx={70 + i * 50} cy={y} r="4" fill="rgb(34 197 94)" />
            ))}

            {/* Labels */}
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
              <text key={i} x={70 + i * 50} y="185" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
                {month}
              </text>
            ))}
          </svg>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">💡 Improvement Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">🎯 Focus Areas</h5>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Improve compensation packages in Operations</li>
              <li>• Enhance career development programs</li>
              <li>• Implement flexible work arrangements</li>
            </ul>
          </div>
          <div className={`${glassCard} p-4`}>
            <h5 className="text-white font-medium mb-2">📊 Expected Impact</h5>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• +0.5 point increase in overall satisfaction</li>
              <li>• 15% reduction in turnover rate</li>
              <li>• 20% improvement in productivity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function GamifyTab() {
  const leaderboard = [
    { name: "Marcus Johnson", points: 2450, badge: "🏆 Top Performer", department: "Electrical" },
    { name: "Aisha Williams", points: 2380, badge: "⭐ Excellence", department: "Engineering" },
    { name: "Francisco Martinez", points: 2290, badge: "🎯 Achiever", department: "Construction" },
    { name: "Zara Thompson", points: 2150, badge: "🚀 Rising Star", department: "Construction" },
    { name: "Jasmine Carter", points: 2080, badge: "💎 Quality Expert", department: "Safety" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gamification Hub</h2>
        <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-300/30">🎮 Gamified</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Active Players" value="247" icon={<Trophy className="h-6 w-6" />} color="text-yellow-300" />
        <StatsCard title="Badges Earned" value="1,234" icon={<Trophy className="h-6 w-6" />} color="text-purple-300" />
        <StatsCard title="Challenges" value="15" icon={<Trophy className="h-6 w-6" />} color="text-green-300" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">🏆 Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((employee, index) => (
              <div key={index} className={`${glassCard} p-4 flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-orange-500"
                            : "bg-blue-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{employee.name}</h4>
                    <p className="text-white/70 text-sm">{employee.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{employee.points} pts</div>
                  <div className="text-xs">{employee.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">🎯 Active Challenges</h3>
          <div className="space-y-4">
            <div className={`${glassCard} p-4`}>
              <h4 className="text-white font-semibold mb-2">Safety First Challenge</h4>
              <p className="text-white/70 text-sm mb-3">Complete safety training modules</p>
              <div className="flex justify-between items-center">
                <div className="w-full bg-white/20 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <span className="text-white text-sm">75%</span>
              </div>
            </div>

            <div className={`${glassCard} p-4`}>
              <h4 className="text-white font-semibold mb-2">Team Collaboration</h4>
              <p className="text-white/70 text-sm mb-3">Work together on 5 projects</p>
              <div className="flex justify-between items-center">
                <div className="w-full bg-white/20 rounded-full h-2 mr-3">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-white text-sm">3/5</span>
              </div>
            </div>

            <div className={`${glassCard} p-4`}>
              <h4 className="text-white font-semibold mb-2">Skill Development</h4>
              <p className="text-white/70 text-sm mb-3">Complete 3 training courses</p>
              <div className="flex justify-between items-center">
                <div className="w-full bg-white/20 rounded-full h-2 mr-3">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                </div>
                <span className="text-white text-sm">1/3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">🏅 Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "🏆 Top Performer",
            "⭐ Excellence",
            "🎯 Achiever",
            "🚀 Rising Star",
            "💎 Quality Expert",
            "🔥 Streak Master",
            "🤝 Team Player",
            "📚 Knowledge Seeker",
            "⚡ Quick Learner",
            "🎨 Innovator",
            "🛡️ Safety Champion",
            "💪 Consistency King",
          ].map((badge, index) => (
            <div key={index} className={`${glassCard} p-3 text-center`}>
              <div className="text-2xl mb-2">{badge.split(" ")[0]}</div>
              <div className="text-white/80 text-xs">{badge.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className={`${glassCard} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  )
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className={`${glassCard} p-3 flex justify-between items-center`}>
      <span className="text-white/80 text-sm">{text}</span>
      <span className="text-white/60 text-xs">{time}</span>
    </div>
  )
}
