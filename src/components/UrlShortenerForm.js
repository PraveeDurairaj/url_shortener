"use client";

import { getStoredUrls ,saveUrls} from "@/utils/storage";
import { useState, useEffect } from "react";


export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    setShortenedUrls(getStoredUrls());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrl = {
      id: shortCode,
      original: originalUrl,
      short: `${window.location.origin}/${shortCode}`,
    };

    const updated = [newUrl, ...shortenedUrls];
    setShortenedUrls(updated);
    saveUrls(updated);
    setOriginalUrl("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="url"
            placeholder="Enter your long URL..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Shorten
          </button>
        </form>

        <div className="space-y-2">
          {shortenedUrls.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
            >
              <a
                href={item.short}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-600 underline"
              >
                {item.short}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(item.short)}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
