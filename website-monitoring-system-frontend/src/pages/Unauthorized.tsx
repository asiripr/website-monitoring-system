import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
        <h1 className="text-4xl font-bold text-center text-red-600">
          403 - Unauthorized
        </h1>
        <p className="text-lg text-gray-700 text-center mt-4">
          You do not have permission to access this page.
        </p>
        <div className="mt-5">
          <div className="flex items-center justify-center mt-6">
            <Link
              to="/"
              className="inline-block px-10 py-3 mt-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
