import axios from "axios";
import React, { useEffect, useState } from "react";

// the structure of websites table
type Website = {
  id: number;
  url: string;
  status: "up" | "down" | "unknown";
  last_checked_at: string | null;
}

const Websites = () => {

  // data fetching part
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/websites", {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    })
      .then((response) => {
        setWebsites(response.data.websites);
      })
      .catch((error) => {
        console.error("Error fetching websites: ", error);
      })
    // finally we have to add an empty array for ensures it runs only once when the component mounts
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Monitored Websites</h2>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">URL</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id}>
              <td className="py-2 px-4 border-b text-center">{website.url}</td>
              <td className="py-2 px-4 border-b text-center">
                <span
                  className={`px-2 py-1 rounded text-white ${website.status === "up"
                    ? "bg-green-500"
                    : website.status === "down"
                      ? "bg-red-500"
                      : "bg-gray-500"
                    }`}
                >{website.status.toUpperCase()}</span>
              </td>
              <td className="py-2 px-4 border-b text-center">{website.last_checked_at ? website.last_checked_at : "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Websites;