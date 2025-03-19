import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// make a type for individual website information
interface Website {
  id: number;
  url: string;
  status: "up" | "down" | "unknown";
}

interface DashboardData {
  total_websites: number;
  total_logs: number;
  downed_websites: Website[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const data: DashboardData = {
        total_websites: response.data.dashboard.total_websites,
        total_logs: response.data.dashboard.total_logs,
        downed_websites: response.data.dashboard.downed_websites || []
      };

      setDashboard(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDashboardData();
    const intervalId = setInterval(()=>{
      fetchDashboardData();
    },30000);
    return () => clearInterval(intervalId);
  })

  const handleViewDetails = (websiteId: number) => {
    // navigate to the details page for the selected website.
    navigate(`/monitoring-logs/${websiteId}`);
  }

  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
      </div>
    </div>
  );
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!dashboard) return <div className="p-4">No data available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Add a third card for visual balance */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">System Status</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-green-500">
                {dashboard.total_websites - dashboard.downed_websites.length} out of {dashboard.total_websites}
              </p>
              <p className="text-sm text-gray-500">websites are up</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downed Websites Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-bold text-red-500 mb-4">Downed Websites</h3>
        <div className="space-y-4">
          {dashboard.downed_websites.length > 0 ? (
            dashboard.downed_websites.map((site) => (
              <div
                key={site.id}
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                  <span className="text-gray-700 font-medium">{site.url}</span>
                </div>
                <button
                  onClick={() => handleViewDetails(site.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-4">
              <div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">All Systems Operational</h3>
                <p className="text-gray-600">No downed websites detected.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
