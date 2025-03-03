import React, { useEffect, useState } from "react";
import axios from "axios";

interface DashboardData {
  total_websites: number;
  total_logs: number;
  uptime_percentage: string;
}

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/dashboard", {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      withCredentials: true, // If using Sanctum cookie-based auth
    })
      .then((response) => {
        // Adjust this line based on your API response structure
        setDashboard(response.data.dashboard);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading Dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!dashboard) return <div className="p-4">No data available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Websites Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Websites</h3>
          <p className="text-3xl font-bold text-blue-500">{dashboard.total_websites}</p>
        </div>
        {/* Total Logs Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Logs</h3>
          <p className="text-3xl font-bold text-green-500">{dashboard.total_logs}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
