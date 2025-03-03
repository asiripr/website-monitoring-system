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

    // fetch user data on component mount

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
        <div className="bg-[#616E80] text-gray-300 w-64 h-screen">
            <nav className="space-y-2 py-6 px-4">
                <ul>
                    <li className={activeLink === '/dashboard' ? 'text-white' : ''} onClick={() => handleLinkClick('/dashboard')}>
                        <Link to="/dashboard" className="flex items-center p-2 hover:text-white">
                            <FaHome className="inline mr-2" /> Dashboard
                        </Link>
                    </li>
                    {user?.role_id === 1  && (
                        <>
                            <li className={activeLink === '/musers' ? 'text-white' : ''} onClick={() => handleLinkClick('/musers')}>
                                <Link to="/musers" className="flex items-center p-2 hover:text-white">
                                    <FaUsers className="inline mr-2" /> Manage Users
                                </Link>
                            </li>
                        </>
                    )}
                    <li className={activeLink === '/websites' ? 'text-white' : ''} onClick={() => handleLinkClick('/websites')}>
                        <Link to="/websites" className="flex items-center p-2 hover:text-white">
                            <FaGlobe className="inline mr-2" /> Websites
                        </Link>
                    </li>
                    <li className={activeLink === '/websites/add' ? 'text-white' : ''} onClick={() => handleLinkClick('/websites/add')}>
                        <Link to="/websites/add" className="flex items-center p-2 hover:text-white">
                            <FaPlus className="inline mr-2" /> Add Website
                        </Link>
                    </li>
                    <li className={activeLink === '/monitoring-logs' ? 'text-white' : ''} onClick={() => handleLinkClick('/monitoring-logs')}>
                        <Link to="/monitoring-logs" className="flex items-center p-2 hover:text-white">
                            <FaChartBar className="inline mr-2" /> Monitoring Logs
                        </Link>
                    </li>
                    <li className={activeLink === '/settings' ? 'text-white' : ''} onClick={() => handleLinkClick('/settings')}>
                        <Link to="/settings" className="flex items-center p-2 hover:text-white">
                            <FaCog className="inline mr-2" /> Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;