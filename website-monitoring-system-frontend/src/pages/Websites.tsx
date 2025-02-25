import React from "react";

// the structur of websites table
type Website = {
  id: number;
  url: string;
  status: "up"|"down"|"unknown";
  lastCheckedAt: string;
}

// dummy data
const dummyWebsites: Website[] = [
  {id:1, url:"https://fourpixell.com", status:"up", lastCheckedAt:"2025-02-17 09:00"},
  {id:2, url:"https://swarnawahini.com", status:"down", lastCheckedAt:"2025-02-17 09:00"},
  {id:3, url:"https://facebook.com", status:"unknown", lastCheckedAt:"2025-02-17 09:00"},
]

const Websites = () => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Monitored Websites</h2>
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">URL</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {dummyWebsites.map((website)=>(
              <tr key={website.id}>
                <td className="py-2 px-4 border-b text-center">{website.id}</td>
                <td className="py-2 px-4 border-b text-center">{website.url}</td>
                <td className="py-2 px-4 border-b text-center">
                  <span
                  className={`px-2 py-1 rounded text-white ${
                    website.status==="up"
                    ? "bg-green-500"
                    : website.status === "down"
                    ? "bg-red-500"
                    :"bg-gray-500"
                    }`}
                  >{website.status.toUpperCase()}</span>
                </td>
                <td className="py-2 px-4 border-b text-center">{website.lastCheckedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Websites;