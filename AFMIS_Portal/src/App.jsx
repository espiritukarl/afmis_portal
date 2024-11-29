import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Navbar from "./pages/Navbar.jsx";
import { LandingMain, LandingSide } from "./pages/Home.jsx";
import UpcomingEvents from "./pages/UpcomingEvents.jsx";
import NewsArticles from "./pages/NewsArticles.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route
              path="/home"
              element={
                <>
                  <LandingMain />
                  <LandingSide />
                </>
              }
            />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/news-articles" element={<NewsArticles />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
