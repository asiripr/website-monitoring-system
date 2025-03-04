import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

// the structure of websites table
type Website = {
  id: number;
  url: string;
  status: "up" | "down" | "unknown";
  last_checked_at: string | null;
}

const Websites = () => {

  // data fetching part
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState({ role_id: 2 });
  const [websites, setWebsites] = useState<Website[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();



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

  // fetch user data on component mount

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await API.get('/sanctum/csrf-cookie');
        const response = await API.get("/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (websiteId: number) => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    setDeletingId(websiteId);
    setIsDeleting(true);

    try {
      await API.get('/sanctum/csrf-cookie');
      await API.delete(`/api/websites/delete/${websiteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      });
      setWebsites(prev => prev.filter(website => website.id !== websiteId));
      alert("Website deleted successfully!");
      setIsDeleting(false);
      navigate("/websites");
    } catch (error) {
      alert("Failed to delete account");
      console.error(error);
    }

  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Monitored Websites</h2>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">URL</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Last Checked</th>
            <th className="py-2 px-4 border-b">Action</th>
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
                >
                  {website.status.toUpperCase()}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                {website.last_checked_at || "Unknown"}
              </td>
              {
                user?.role_id === 1 ? (
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(website.id)}
                      className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2 ${deletingId === website.id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      disabled={deletingId === website.id}
                    >
                      {deletingId === website.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                ) :
                  (
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => { }}
                        className="bg-red-500 text-white px-3 py-1 rounded mr-2 opacity-50 cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  )
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Websites;