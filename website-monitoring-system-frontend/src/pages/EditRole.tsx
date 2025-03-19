import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditRole: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<{ id: number; name: string }[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const roleResponse = await API.get(`api/roles/${id}`);
        setRoleName(roleResponse.data.role.name);
        setSelectedPermissions(roleResponse.data.role.permissions.map((p: any) => p.id));
      } catch (err) {
        setError("Failed to load role data.");
      } finally {
        setLoading((prevLoading) => ({
          ...prevLoading,
          role: false
        }));
      }
    };
  
    fetchRoleData();
  }, [id]);

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/roles/${id}`, {
        name: roleName,
        permissions: selectedPermissions,
      });
      navigate("/manage-roles");
    } catch (err) {
      setError("Failed to update role.");
    }
  };

  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
      </div>
    </div>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Role</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <label className="block mb-4">
          Role Name:
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Permissions:</h3>
          {permissions.map((permission) => (
            <label key={permission.id} className="block">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handlePermissionToggle(permission.id)}
                className="mr-2"
              />
              {permission.name}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRole;