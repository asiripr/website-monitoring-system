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


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/websites", {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    })
      .then((response) => {
        setWebsite(response.data.websites);
      })
      .catch((error) => {
        console.error("Error fetching websites: ", error);
      })
    // finally we have to add an empty array for ensures it runs only once when the component mounts
  }, []);

  const handleViewDetails = (websiteId: number) => {
    // navigate to the details page for the selected website.
    navigate(`/monitoring-logs/${websiteId}`);
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Monitoring Logs</h2>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">URL</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {website.map((entry) => (
            <tr key={entry.id}>
              <td className="py-2 px-4 border-b text-center">{entry.url}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleViewDetails(entry.id)}
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