"use client";

import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Target,
  Activity,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Lock,
} from "lucide-react";
import PasscodeModal from "../components/global/PasscodeModal";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // 4-digit passcode - you can change this to any 4 digits
  const correctPasscode = "1234";

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/analytics");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePasscodeSuccess = () => {
    setIsAuthenticated(true);
    setShowPasscodeModal(false);
    fetchAnalytics();
  };

  const handlePasscodeClose = () => {
    // Redirect to home page if user closes the modal
    window.location.href = "/";
  };

  useEffect(() => {
    // Only fetch analytics if authenticated
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  // Show passcode modal if not authenticated
  if (!isAuthenticated) {
    return (
      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={handlePasscodeClose}
        onSuccess={handlePasscodeSuccess}
        correctPasscode={correctPasscode}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Error Loading Analytics
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              University Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time insights into student enrollment and certificate
              generation
            </p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setShowPasscodeModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Lock className="h-4 w-4" />
            <span>Lock</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>
            Last updated: {new Date(analytics.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-700">
              Total Students
            </h3>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {analytics.overview.totalStudents.toLocaleString()}
          </div>
          <p className="text-xs text-blue-600 mt-1">All enrolled students</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-700">
              Certificates Generated
            </h3>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-900">
            {analytics.overview.studentsWithCertificates.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 mt-1">
            {analytics.overview.certificateRate}% completion rate
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-700">
              Pending Certificates
            </h3>
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-900">
            {analytics.overview.studentsWithoutCertificates.toLocaleString()}
          </div>
          <p className="text-xs text-yellow-600 mt-1">Awaiting generation</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-700">Average GPA</h3>
            <Target className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {analytics.gpaStats.average}
          </div>
          <p className="text-xs text-purple-600 mt-1">Out of 5.00 scale</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Today's Enrollments</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {analytics.recentActivity.today}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            New students enrolled today
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Last 7 Days</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {analytics.recentActivity.last7Days}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Students enrolled this week
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Last 30 Days</h3>
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {analytics.recentActivity.last30Days}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Students enrolled this month
          </p>
        </div>
      </div>

      {/* GPA Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">GPA Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average GPA</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {analytics.gpaStats.average}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Highest GPA</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {analytics.gpaStats.maximum}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Lowest GPA</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border">
                {analytics.gpaStats.minimum}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Generation Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm md:col-span-2">
          <h3 className="font-semibold mb-4">
            Certificate Generation Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm text-gray-600">
                {analytics.overview.certificateRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${analytics.overview.certificateRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">
                  {analytics.overview.studentsWithCertificates}
                </div>
                <div className="text-green-600">Generated</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-700">
                  {analytics.overview.studentsWithoutCertificates}
                </div>
                <div className="text-yellow-600">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department and Degree Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Departments */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Top Departments</h3>
          </div>
          <div className="space-y-3">
            {analytics.departments.slice(0, 10).map((dept, index) => (
              <div
                key={dept.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {dept.name}
                  </span>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {dept.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Degree Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Degree Distribution</h3>
          </div>
          <div className="space-y-3">
            {analytics.degrees.map((degree, index) => (
              <div
                key={degree.level}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{degree.level}</span>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border">
                  {degree.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Analytics</span>
        </button>
      </div>
    </div>
  );
}
