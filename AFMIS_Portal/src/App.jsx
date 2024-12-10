import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Navbar from "./pages/Navbar.jsx";
import { LandingMain, LandingSide } from "./pages/Home.jsx";
import UpcomingEvents from "./pages/UpcomingEvents.jsx";
import NewsArticles from "./pages/NewsArticles.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles/App.css";
import PriceReport from "./pages/PriceReport.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <div className="content-container">
          <Routes>
            {/* HOME SECTION */}
            <Route
              path="/home"
              element={
                <>
                  <LandingMain />
                  <LandingSide />
                </>
              }
            />
            {/* NEWS SECTION */}
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/news-articles" element={<NewsArticles />} />
            <Route path="/price-report" element={<PriceReport />} />

            {/* ABOUT SECTION */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
