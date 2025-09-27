"use client";
import { useState } from "react";

export default function HostPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [coins, setCoins] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleStart = () => {
    setShowNotification(true);
    // Ici tu peux ajouter la logique pour envoyer les données à ton backend

    // Masquer la notification après 2 secondes
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 relative">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Host a Sensor</h1>

      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Enter title"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-300"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2 max-h-40 object-contain border border-gray-600 rounded"
            />
          )}
        </div>

        {/* Coins and Max People */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Coins to invest:</label>
            <input
              type="number"
              value={coins}
              onChange={(e) => setCoins(Math.max(0, Number(e.target.value)))}
              min={0}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="0"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">Max people:</label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) =>
                setMaxPeople(Math.max(0, Number(e.target.value)))
              }
              min={0}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="0"
            />
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start!!
        </button>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto animate-fade-in-out">
            Upload successful!
          </div>
        </div>
      )}

      {/* Animation Tailwind */}
      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
}
