import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateRole: React.FC = () => {
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [permissions, setPermissions] = useState<{ id: number; name: string }[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch available permissions
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/permissions", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
                });
                setPermissions(response.data.permissions);
            } catch (err) {
                setError("Failed to load permissions.");
            }
        };
        fetchPermissions();
    }, []);

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
            await API.get("/sanctum/csrf-cookie");
            await API.post(
                "/api/roles",
                { name: roleName, description, permissions: selectedPermissions },
                { headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` } }
            );
            navigate("/manage-roles");
        } catch (err) {
            setError("Failed to create role.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Role</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                {/* Role name input */}
                <div className="mb-4">
                    <label className="block mb-1">Role Name:</label>
                    <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                {/* Description input */}
                <div className="mb-4">
                    <label className="block mb-1">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                {/* List of permissions */}
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
                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Creating..." : "Create Role"}
                </button>
            </form>
        </div>
    );
};

export default CreateRole;
