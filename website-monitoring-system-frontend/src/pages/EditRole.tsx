import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditRole: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<{ id: number; name: string }[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const roleResponse = await API.get(`/api/roles/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setRoleName(roleResponse.data.role.name);
        setSelectedPermissions(
          roleResponse.data.role.permissions.map((p: any) => p.id)
        );
      } catch (err: any) {
        setError("Failed to load role data.");
        console.error(err);
      }
    };

    const fetchPermissions = async () => {
      try {
        const permResponse = await API.get("/api/permissions", {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setPermissions(permResponse.data.permissions);
      } catch (err: any) {
        setError("Failed to load permissions.");
        console.error(err);
      }
    };

    fetchRoleData();
    fetchPermissions();
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
    setLoading(true);
    try {
      await API.put(`/api/roles/${id}`, {
        name: roleName,
        permissions: selectedPermissions,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      });
      navigate("/manage-roles");
    } catch (err: any) {
      setError("Failed to update role.");
      console.error(err);
    } finally {
      setLoading(false);
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