import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/home'
import Archive from './Views/archive'
import Popular from './Views/popular'
import Settings from './Views/settings'
import Layout from './Components/Layout'
import React, { useState, useEffect } from 'react';
import "./app.css"
import useFetchCachedData from './Hooks/Fetch-Cached-Data'

export default function App() {
  const apiKey = "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq";
  const { data, loading, error } = useFetchCachedData(
    "wtLUgKBONr2XcZEobnbpK5fhDFcH5GshjykRqAsuOtFW9rSq",
    `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`
  )

  // 1. State til Dark Mode
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 2. Effect til at opdatere body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // 3. Funktion til at skifte tema
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="popular" element={<Popular />} />
          {/* 4. HER sender vi props ned til Settings */}
          <Route
            path="settings"
            element={<Settings isDark={isDark} onToggle={toggleTheme} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}