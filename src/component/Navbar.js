import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">MemeVerse</Link>
      </h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/explore" className="hover:text-blue-500">Explore</Link>
        <Link to="/upload" className="hover:text-blue-500">Upload</Link>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
        </button>
      </div>
    </nav>
  );
}
