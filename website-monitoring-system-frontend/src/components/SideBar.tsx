import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaHome, FaUsers, FaShieldAlt, FaGlobe, FaPlus, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import API from "../services/api";

const SideBar = () => {
    const [activeLink, setActiveLink] = useState('/dashboard');
    const [user, setUser] = useState({ role_id: 2 });

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
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

    return (
        <div className="bg-[#2D3748] text-gray-300 w-64 h-screen">
            <nav className="py-8 px-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            onClick={() => handleLinkClick('/dashboard')}
                            className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/dashboard' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                        >
                            <FaHome className="text-lg mr-3" /> Dashboard
                        </Link>
                    </li>

                    {user?.role_id === 1 && (
                        <li>
                            <Link
                                to="/admin"
                                onClick={() => handleLinkClick('/admin')}
                                className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/musers' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                            >
                                <FaUsers className="text-lg mr-3" /> Admin Dashboard
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link
                            to="/websites"
                            onClick={() => handleLinkClick('/websites')}
                            className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/websites' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                        >
                            <FaGlobe className="text-lg mr-3" /> Websites
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/websites/add"
                            onClick={() => handleLinkClick('/websites/add')}
                            className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/websites/add' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                        >
                            <FaPlus className="text-lg mr-3" /> Add Website
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/monitoring-logs"
                            onClick={() => handleLinkClick('/monitoring-logs')}
                            className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/monitoring-logs' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                        >
                            <FaChartBar className="text-lg mr-3" /> Monitoring Logs
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/settings"
                            onClick={() => handleLinkClick('/settings')}
                            className={`flex items-center px-4 py-3 text-base font-semibold rounded hover:bg-gray-700 transition-colors ${activeLink === '/settings' ? 'text-white bg-gray-700' : 'text-gray-400'}`}
                        >
                            <FaCog className="text-lg mr-3" /> Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;