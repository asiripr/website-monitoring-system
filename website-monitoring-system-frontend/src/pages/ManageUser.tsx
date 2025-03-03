import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role_id: 2
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // fetch user data on component mount

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/manage-users/edit/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
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
  return (
    <div className="pl-20 pt-6">
      <h2 className="text-2xl font-bold mb-4">Manage User</h2>

      {/* Profile Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Profile Information</h3>
        <form className="mt-4" onSubmit={handleProfileUpdate}>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            className="w-3/4 border p-2 rounded mb-2"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            className="w-3/4 border p-2 rounded mb-4"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <div className="mb-4">
            <label className="block">Role</label>
            <select
              value={user.role_id}
              onChange={(e) => setUser({ ...user, role_id: parseInt(e.target.value) })}
              className="border p-2 rounded w-3/4"
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-3/4  bg-blue-500 text-white p-2 rounded ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>


      {/* Change Password Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
        <form onSubmit={handleChangePassword} className="mt-4">

          <label className="block text-gray-600">New Password</label>
          <input
            type="password"
            className="w-3/4 border p-2 rounded mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label className="block text-gray-600">Confirm Password</label>
          <input
            type="password"
            className="w-3/4 border p-2 rounded mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-3/4 bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Change Password
          </button>
        </form>
      </div>

      {/* Delete Account */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Delete Account</h3>
        <button
          onClick={handleDeleteAccount}
          className={`w-3/4 bg-red-500 text-white p-2 rounded ${isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>

    </div>


  );
};

export default ManageUser;