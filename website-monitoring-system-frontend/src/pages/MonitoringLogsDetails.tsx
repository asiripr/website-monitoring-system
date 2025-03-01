import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type LogEntry = {
    id: number;
    status: "up" | "down";
    response_time: number;
    checked_at: string;
};

type WebsiteDetails = {
    id: number;
    url: string;
    logs: LogEntry[];
}

const MonitoringLogsDetails: React.FC = () => {
    // extract the website id from the route parameters
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<WebsiteDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/monitoring-logs-data/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        })
          .then((response) => {
            // Assumes the API returns a website object with an embedded logs array
            setDetails(response.data.website);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching website details:", error);
            setError("Failed to load website details.");
            setLoading(false);
          });
      }, [id]);

      if (loading) return <div className="p-4">Loading...</div>;
      if (error) return <div className="p-4 text-red-500">{error}</div>;
      if (!details) return <div className="p-4">No details found.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Logs Details for {details.url}</h2>
            <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Log ID</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Response Time</th>
                        <th className="py-2 px-4 border-b">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {details.logs.map((log) => (
                        <tr key={log.id}>
                            <td className="py-2 px-4 border-b text-center">{log.id}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <span
                                    className={`px-2 py-1 rounded text-white ${log.status === "up"
                                            ? "bg-green-500"
                                            : log.status === "down"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                        }`}
                                >
                                    {log.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {log.response_time > 0 ? `${log.response_time} ms` : "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b text-center">{log.checked_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MonitoringLogsDetails