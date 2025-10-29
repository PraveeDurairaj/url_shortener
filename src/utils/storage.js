export const STORAGE_KEY = "shortenedUrls";

// Get URLs from localStorage
export const getStoredUrls = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to read from localStorage:", error);
    return [];
  }
};

// Save URLs to localStorage
export const saveUrls = (urls) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

// Clear URLs from localStorage
export const clearUrls = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
};
