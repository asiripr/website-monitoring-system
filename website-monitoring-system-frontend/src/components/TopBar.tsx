import React from "react";

const TopBar = () => {
    return (
        <div className="bg-white flex justify-between items-center p-4">
            <h1 className="text-black text-2xl font-bold">Website Monitoring System</h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, User</span>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
    );
}

export default TopBar;