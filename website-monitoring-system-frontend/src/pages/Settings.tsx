import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  // dummy data
  const [user, setUser] = useState({
    name: "Kasun Kalhara",
    email: "kasun@gmail.com"
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      alert("Profile Updated Succesfully!");
      setIsUpdating(false);
    }, 1000);
  };

  // handle password change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  // handle logout
  const handleLogout = () => {
    // clear token
    localStorage.removeItem("token");
    navigate("/login");
  };

  // handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure want to delete your account?")) {
      setIsDeleting(true);
      setTimeout(() => {
        alert("Account deleted successfully!");
        localStorage.removeItem("token");
        navigate("/register");
      }, 1000);
    }
  };
  return (
    <div className="pl-20 pt-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

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
            readOnly
          />

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

      {/* Logout Button */}
      <div className="mb-4">
        <button onClick={handleLogout} className="w-3/4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
          Logout
        </button>
      </div>

      {/* Delete Account */}
      <div className="mb-4">
        <button
          onClick={handleDeleteAccount}
          className={`w-3/4 bg-red-500 text-white p-2 rounded ${isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>

    </div>


  );
};

export default Settings;