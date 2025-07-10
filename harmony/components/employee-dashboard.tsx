"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  FileText,
  Calendar,
  Download,
  Upload,
  LogOut,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Mail,
} from "lucide-react"
import { glassCard, glassButton, glassInput, gradientBg } from "@/lib/glassmorphism"

interface EmployeeDashboardProps {
  user: { name: string; role: "employee" }
  onLogout: () => void
}

export default function EmployeeDashboard({ user, onLogout }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
    { id: "profile", label: "My Profile", icon: <User className="h-4 w-4" /> },
    { id: "payslips", label: "Payslips", icon: <FileText className="h-4 w-4" /> },
    { id: "leave", label: "Leave Requests", icon: <Calendar className="h-4 w-4" /> },
    { id: "documents", label: "Documents", icon: <Upload className="h-4 w-4" /> },
  ]

  return (
    <div className={`min-h-screen ${gradientBg}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className={`${glassCard} m-4 p-4`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">HARMONY Employee Portal</h1>
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-300/30">Employee</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}</span>
              <Button onClick={onLogout} className={`${glassButton} text-white`}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className={`${glassCard} m-4 p-2`}>
          <div className="flex space-x-2 overflow-x-auto">
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

        {/* Content */}
        <main className="p-4">
          {activeTab === "overview" && <EmployeeOverviewTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "payslips" && <PayslipsTab />}
          {activeTab === "leave" && <LeaveTab />}
          {activeTab === "documents" && <DocumentsTab />}
        </main>
      </div>
    </div>
  )
}

function EmployeeOverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Leave Balance"
          value="18 days"
          icon={<Calendar className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard title="Pending Requests" value="2" icon={<Clock className="h-6 w-6" />} color="text-yellow-300" />
        <StatsCard
          title="Documents Status"
          value="95%"
          icon={<CheckCircle className="h-6 w-6" />}
          color="text-blue-300"
        />
        <StatsCard
          title="Last Payslip"
          value="Dec 2024"
          icon={<DollarSign className="h-6 w-6" />}
          color="text-pink-300"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <ActivityItem text="Payslip for December 2024 available" time="2 hours ago" />
            <ActivityItem text="Leave request approved" time="1 day ago" />
            <ActivityItem text="Document uploaded: ID Card" time="3 days ago" />
            <ActivityItem text="Profile updated successfully" time="1 week ago" />
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={() => alert("Leave request form opened")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              <Calendar className="h-4 w-4 mr-2" /> Request Leave
            </Button>
            <Button
              onClick={() => alert("Payslip download started")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              <Download className="h-4 w-4 mr-2" /> Download Payslip
            </Button>
            <Button
              onClick={() => alert("Document upload dialog opened")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              <Upload className="h-4 w-4 mr-2" /> Upload Document
            </Button>
            <Button
              onClick={() => alert("Profile update form opened")}
              className={`${glassButton} w-full text-white justify-start`}
            >
              <User className="h-4 w-4 mr-2" /> Update Profile
            </Button>
          </div>
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Notifications</h3>
        <div className="space-y-3">
          <NotificationItem
            type="info"
            message="Your December payslip is now available for download"
            time="2 hours ago"
          />
          <NotificationItem type="success" message="Your leave request has been approved" time="1 day ago" />
          <NotificationItem
            type="warning"
            message="Please update your emergency contact information"
            time="3 days ago"
          />
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-1">Full Name</label>
              <Input defaultValue="John Doe" className={`${glassInput}`} />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Email</label>
              <Input defaultValue="john.doe@company.com" className={`${glassInput}`} />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Phone</label>
              <Input defaultValue="+1 (555) 123-4567" className={`${glassInput}`} />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Address</label>
              <Textarea defaultValue="123 Main St, City, State 12345" className={`${glassInput}`} />
            </div>
          </div>
        </div>

        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">Job Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-1">Employee ID</label>
              <Input defaultValue="EMP001" className={`${glassInput}`} disabled />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Department</label>
              <Input defaultValue="Engineering" className={`${glassInput}`} disabled />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Position</label>
              <Input defaultValue="Senior Developer" className={`${glassInput}`} disabled />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Start Date</label>
              <Input defaultValue="January 15, 2022" className={`${glassInput}`} disabled />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => alert("Profile updated successfully")} className={`${glassButton} text-white`}>
          Update Profile
        </Button>
      </div>
    </div>
  )
}

function PayslipsTab() {
  const payslips = [
    { month: "December 2024", gross: "$5,500", deductions: "$1,100", net: "$4,400", status: "Available" },
    { month: "November 2024", gross: "$5,500", deductions: "$1,100", net: "$4,400", status: "Downloaded" },
    { month: "October 2024", gross: "$5,500", deductions: "$1,100", net: "$4,400", status: "Downloaded" },
    { month: "September 2024", gross: "$5,500", deductions: "$1,100", net: "$4,400", status: "Downloaded" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Payslips</h2>
        <Button onClick={() => alert("Payslip emailed successfully")} className={`${glassButton} text-white`}>
          <Mail className="h-4 w-4 mr-2" /> Email Latest Payslip
        </Button>
      </div>

      <div className={`${glassCard} p-6`}>
        <div className="space-y-4">
          {payslips.map((payslip, index) => (
            <div key={index} className={`${glassCard} p-4 flex justify-between items-center`}>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{payslip.month}</h3>
                <div className="flex space-x-6 text-sm text-white/70 mt-1">
                  <span>Gross: {payslip.gross}</span>
                  <span>Deductions: {payslip.deductions}</span>
                  <span>Net: {payslip.net}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  className={
                    payslip.status === "Available" ? "bg-green-500/20 text-green-200" : "bg-blue-500/20 text-blue-200"
                  }
                >
                  {payslip.status}
                </Badge>
                <Button
                  onClick={() => alert(`${payslip.month} payslip downloaded`)}
                  className={`${glassButton} text-white`}
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LeaveTab() {
  const [showRequestForm, setShowRequestForm] = useState(false)

  const leaveRequests = [
    { type: "Annual Leave", dates: "Dec 20-24, 2024", days: 5, status: "Approved" },
    { type: "Sick Leave", dates: "Nov 15, 2024", days: 1, status: "Approved" },
    { type: "Personal Leave", dates: "Jan 10-12, 2025", days: 3, status: "Pending" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Leave Management</h2>
        <Button onClick={() => setShowRequestForm(!showRequestForm)} className={`${glassButton} text-white`}>
          <Calendar className="h-4 w-4 mr-2" /> Request Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Annual Leave"
          value="18 days"
          icon={<Calendar className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard title="Sick Leave" value="5 days" icon={<Calendar className="h-6 w-6" />} color="text-blue-300" />
        <StatsCard
          title="Personal Leave"
          value="3 days"
          icon={<Calendar className="h-6 w-6" />}
          color="text-purple-300"
        />
      </div>

      {showRequestForm && (
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">New Leave Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-1">Leave Type</label>
              <select className={`${glassInput} w-full p-2`}>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Personal Leave</option>
                <option>Emergency Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Number of Days</label>
              <Input type="number" className={`${glassInput}`} />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">Start Date</label>
              <Input type="date" className={`${glassInput}`} />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1">End Date</label>
              <Input type="date" className={`${glassInput}`} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm mb-1">Reason</label>
              <Textarea className={`${glassInput}`} placeholder="Please provide a reason for your leave request..." />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button
              onClick={() => setShowRequestForm(false)}
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Leave request submitted successfully")
                setShowRequestForm(false)
              }}
              className={`${glassButton} text-white`}
            >
              Submit Request
            </Button>
          </div>
        </div>
      )}

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Leave History</h3>
        <div className="space-y-3">
          {leaveRequests.map((request, index) => (
            <div key={index} className={`${glassCard} p-4 flex justify-between items-center`}>
              <div>
                <h4 className="text-white font-semibold">{request.type}</h4>
                <p className="text-white/70">
                  {request.dates} • {request.days} days
                </p>
              </div>
              <Badge
                className={
                  request.status === "Approved"
                    ? "bg-green-500/20 text-green-200"
                    : request.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-200"
                      : "bg-red-500/20 text-red-200"
                }
              >
                {request.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DocumentsTab() {
  const documents = [
    { name: "ID Card", type: "Identity", status: "Valid", expiry: "2026-05-15" },
    { name: "Employment Contract", type: "Contract", status: "Valid", expiry: "2025-01-15" },
    { name: "Professional Certificate", type: "Certificate", status: "Expiring Soon", expiry: "2025-02-28" },
    { name: "Emergency Contact Form", type: "Personal", status: "Valid", expiry: "N/A" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Documents</h2>
        <Button onClick={() => alert("Document upload dialog opened")} className={`${glassButton} text-white`}>
          <Upload className="h-4 w-4 mr-2" /> Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Documents" value="12" icon={<FileText className="h-6 w-6" />} color="text-blue-300" />
        <StatsCard title="Valid" value="10" icon={<CheckCircle className="h-6 w-6" />} color="text-green-300" />
        <StatsCard
          title="Expiring Soon"
          value="2"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="text-yellow-300"
        />
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Document Status</h3>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className={`${glassCard} p-4 flex justify-between items-center`}>
              <div>
                <h4 className="text-white font-semibold">{doc.name}</h4>
                <p className="text-white/70">
                  {doc.type} • Expires: {doc.expiry}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  className={
                    doc.status === "Valid"
                      ? "bg-green-500/20 text-green-200"
                      : doc.status === "Expiring Soon"
                        ? "bg-yellow-500/20 text-yellow-200"
                        : "bg-red-500/20 text-red-200"
                  }
                >
                  {doc.status}
                </Badge>
                <Button
                  onClick={() => alert(`${doc.name} downloaded`)}
                  className={`${glassButton} text-white`}
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
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
}: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`${glassCard} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  )
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
      <span className="text-white">{text}</span>
      <span className="text-white/60 text-sm">{time}</span>
    </div>
  )
}

function NotificationItem({
  type,
  message,
  time,
}: { type: "info" | "success" | "warning" | "error"; message: string; time: string }) {
  return (
    <div className={`${glassCard} p-4 flex items-start space-x-3`}>
      <div
        className={`p-2 rounded-full ${
          type === "warning"
            ? "bg-yellow-500/20"
            : type === "success"
              ? "bg-green-500/20"
              : type === "error"
                ? "bg-red-500/20"
                : "bg-blue-500/20"
        }`}
      >
        <Bell
          className={`h-4 w-4 ${
            type === "warning"
              ? "text-yellow-300"
              : type === "success"
                ? "text-green-300"
                : type === "error"
                  ? "text-red-300"
                  : "text-blue-300"
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="text-white">{message}</p>
        <p className="text-white/60 text-sm">{time}</p>
      </div>
    </div>
  )
}
