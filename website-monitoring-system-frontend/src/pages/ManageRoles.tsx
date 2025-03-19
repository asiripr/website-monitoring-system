import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Role = {
    id: number;
    name: string;
    description?: string;
}

const ManageRoles: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // fetch available roles
    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/roles", {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            setRoles(response.data.roles || []);
            setError(null);
        } catch (error) {
            console.error("Error fetching roles:", error);
            setError("Failed to load roles.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleEditRole = (roleId: number) => {
        navigate(`/manage-roles/edit/${roleId}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Roles</h2>
            {loading ? (
                <div className="p-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="p-4 text-red-500">{error}</div>
            ) : (
                <>
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left">Role Name</th>
                                <th className="py-3 px-6 text-left">Description</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <tr key={role.id} className="transition-colors hover:bg-gray-50">
                                        <td className="py-4 px-6">{role.name}</td>
                                        <td className="py-4 px-6">{role.description}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleEditRole(role.id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                            >
                                                Edit Privileges
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-4 px-6 text-center text-gray-500">
                                        No roles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/manage-roles/create')}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Create New Role
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ManageRoles