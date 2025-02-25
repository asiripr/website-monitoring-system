import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddWebsites = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //sending the new website details to the backend API
      await API.post("/websites", { url });
      alert("Website added successfully!");
      navigate("/websites");

    } catch (error) {
      console.error("Failed to add website", error);
      alert("Failed to add website");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AddWebsites Page</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Adding..." : "Add Website"}
        </button>
      </form>
    </div>
  );
};

export default AddWebsites;