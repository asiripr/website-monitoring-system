import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  role_id: number; // 1: admin, 2: user, etc.
};

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserIds, setUpdatingUserIds] = useState<number[]>([]);
  const navigate = useNavigate();

  // Fetch selected user data from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      })
      .then((response) => {
        // Assuming your API returns { users: [...] }
        const fetchedUsers = Array.isArray(response.data.users)
          ? response.data.users
          : response.data.users || [];
        setUsers(fetchedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  // Handle editing a user: navigate to the edit page (to be implemented)
  const handleEdit = (userId: number) => {
    navigate(`/manage-users/edit/${userId}`);
  };

  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
      </div>
    </div>
  );
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 px-6 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default ManageUsers;
