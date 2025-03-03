import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  role_id: number;
};

const ManageUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        });
        console.log("Fetched user:", response.data);
        // If your API returns { user: {...} }
        setUser(response.data.user || response.data);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setError(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await axios.put(
        `/api/users/${user.id}`,
        { name: user.name, email: user.email, role_id: user.role_id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` } }
      );
      alert("User updated successfully!");
      navigate("/manage-users");
    } catch (error: any) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <div className="p-4 text-red-500">User not found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => {
              console.log("Updating name to:", e.target.value);
              setUser({ ...user, name: e.target.value });
            }}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Role</label>
          <select
            value={user.role_id}
            onChange={(e) => setUser({ ...user, role_id: parseInt(e.target.value) })}
            className="border p-2 rounded w-full"
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ManageUser;
