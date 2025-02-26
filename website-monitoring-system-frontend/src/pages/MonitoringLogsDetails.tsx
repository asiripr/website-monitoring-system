import React from 'react';
import { useParams } from 'react-router-dom';

type LogEntry = {
    id: number;
    status: "up" | "down" | "unknown";
    responseTime: number;
    timestamp: string;
};

type WebsiteDetails = {
    id: number;
    url: string;
    logs: LogEntry[];
}

// Dummy data for demonstration
const dummyData: WebsiteDetails[] = [
    {
        id: 1,
        url: "https://google.com",
        logs: [
            { id: 1, status: "up", responseTime: 120, timestamp: "2025-02-26 10:00 AM" },
            { id: 2, status: "down", responseTime: 0, timestamp: "2025-02-26 10:05 AM" },
            { id: 3, status: "up", responseTime: 95, timestamp: "2025-02-26 10:10 AM" },
        ],
    },
    {
        id: 2,
        url: "https://facebook.com",
        logs: [
            { id: 1, status: "up", responseTime: 90, timestamp: "2025-02-26 10:00 AM" },
            { id: 2, status: "up", responseTime: 100, timestamp: "2025-02-26 10:05 AM" },
        ],
    },
];

const MonitoringLogsDetails: React.FC = () => {
    // extract the website id from the route parameters
    const { id } = useParams<{ id: string }>();
    const websiteId = parseInt(id || "0", 10);

    // find the corresponding website
    const website = dummyData.find((item) => item.id === websiteId);

    if (!website) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold">Website Not Found</h2>
                <p>No logs available for website with ID {id}.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Logs Details for {website.url}</h2>
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
                    {website.logs.map((log) => (
                        <tr key={log.id}>
                            <td className="py-2 px-4 border-b text-center">{log.id}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <span
                                    className={`px-2 py-1 rounded text-white ${
                                        log.status === "up"
                                        ? "bg-green-500"
                                        : log.status === "down"
                                        ? "bg-red-500"
                                        :"bg-gray-500"    
                                    }`}
                                >
                                    {log.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {log.responseTime > 0 ? `${log.responseTime} ms` : "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b text-center">{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MonitoringLogsDetails