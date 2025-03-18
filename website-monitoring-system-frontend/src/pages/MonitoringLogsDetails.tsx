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


    // fetch monitoring logs data
    const fetchMonitoringLogsData = async () => {

    }


    // Function to fetch website details
    const fetchWebsiteDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/monitoring-logs-data/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });

            const website = response.data.website;
            // Sort logs from latest to oldest
            website.logs.sort((a, b) => {
                return new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime();
            });
            setDetails(website);
            setError(null);
        } catch (error) {
            console.error("Error fetching website details:", error);
            setError("Failed to load website details.");
        } finally {
            setLoading(false);
        }
    };
    // useEffect for live monitoring
    useEffect(() => {
        fetchWebsiteDetails();
        // Set polling every 30 seconds
        const intervalId = setInterval(fetchWebsiteDetails, 30000);
        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, [id]);

    if (loading) return (
        <div className="p-4 flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
            </div>
        </div>
    );
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!details) return <div className="p-4">No details found.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Logs Details for {details.url}</h2>
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left">Log ID</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Response Time</th>
                        <th className="py-3 px-6 text-center">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {details.logs.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-4 px-6 text-center">
                                No website downs detected
                            </td>
                        </tr>
                    ) : (
                        details.logs.map((log) => (
                            <tr key={log.id} className="transition-colors hover:bg-gray-50">
                                <td className="py-4 px-6">{log.id}</td>
                                <td className="py-4 px-6 text-center">
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
                                <td className="py-4 px-6 text-center">
                                    {log.response_time > 0 ? `${log.response_time} ms` : "N/A"}
                                </td>
                                <td className="py-4 px-6 text-center">{log.checked_at}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default MonitoringLogsDetails