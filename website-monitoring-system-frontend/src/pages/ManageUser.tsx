import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

interface Role {
  id: number;
  name: string;
  description: string;
}

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    role_id: 2
  });
  const [admin, setAdmin] = useState({
    id: 0,
    name: "",
    email: ""
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<Role[]>([]);

  // fetch user data on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await API.get("/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setAdmin(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch admin:", error);
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // fetch user data on component mount

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/manage-users/edit/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await API.get('/api/roles', {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await API.get("/sanctum/csrf-cookie");

      const response = await API.put(`/api/manage-users/edit/${id}`, {
        name: user.name,
        email: user.email,
        role_id: user.role_id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      });
      alert("Profile Updated Successfully!");
      setUser(response.data.user);
    } catch (error) {
      alert("Failed to update profile");
      console.error(error);
    }
    setIsUpdating(false);
  };

  // handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await API.get('/sanctum/csrf-cookie');
      await API.post(`/api/manage-users/edit/${id}`, {
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      });
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      alert("Failed to change password");
      console.error(error);
    }
  };

  // handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setIsDeleting(true);

    try {
      await API.get('/sanctum/csrf-cookie');
      await API.delete(`/api/manage-users/edit/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        data: { password: currentPassword }
      });
      alert("Account deleted successfully!");
      // clear tokens
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/musers");
    } catch (error) {
      alert("Failed to delete account");
      console.error(error);
    }

  };
  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
      </div>
    </div>
  );
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage User</h2>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h3>
        <form className="space-y-6" onSubmit={handleProfileUpdate}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
              <input
                type="text"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <input
                type="email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Role</label>
              <select
                value={user.role_id}
                onChange={(e) => setUser({ ...user, role_id: parseInt(e.target.value) })}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Delete Account Section */}
      {
        user?.id !== admin?.id && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Delete Account</h3>
            <div className="space-y-6">

              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        )
      }
    </div>
  );


};

export default ManageUser;