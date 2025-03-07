import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddWebsites = () => {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.get("/sanctum/csrf-cookie");
      console.log({ url });

      // Get the token from localStorage (ensure it's stored correctly)
      const token = localStorage.getItem('auth_token');

      const response = await API.post(
        "/api/add-website",
        // attach the url as an oblect
        { url },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }
      );
      alert("Website added successfully!");
      // redirect after success
      navigate("/websites");

    } catch (error) {
      console.error("Failed to add website", error);
      alert("Failed to add website");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Website
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(`${e.target.value}`)}
                placeholder="example.com"
                required
                className="flex-1 block w-full px-4 py-3 rounded-r-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your website URL (must start with http:// or https://)
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  Adding...
                </span>
              ) : (
                "Add Website"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsites;