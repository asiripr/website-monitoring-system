import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Website {
  id: number;
  url: string;
}

const MonitoringLogs: React.FC = () => {
  const navigate = useNavigate();

  // data fetching part
  const [website, setWebsite] = useState<Website[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/websites", {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    })
      .then((response) => {
        setWebsite(response.data.websites);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching websites: ", error);
        setLoading(false);
      })
    // finally we have to add an empty array for ensures it runs only once when the component mounts
  }, []);

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
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Monitoring Logs</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-center">
              URL
            </th>
            <th className="py-3 px-6 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {website.map((entry) => (
            <tr key={entry.id} className="transition-colors hover:bg-gray-50">
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="ml-2 text-sm font-medium text-gray-800 truncate" title={entry.url}>
                    {entry.url}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <button
                  onClick={() => handleViewDetails(entry.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitoringLogs;