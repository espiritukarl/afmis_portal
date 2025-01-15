import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Navbar from "./pages/Navbar.jsx";
import { LandingMain, LandingSide } from "./pages/Home.jsx";
import UpcomingEvents from "./pages/UpcomingEvents.jsx";
import NewsArticles from "./pages/NewsArticles.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles/App.css";
import PriceReport from "./pages/PriceReport.jsx";
import Infographics from "./pages/Infographics.jsx";
import FetchGoogleSheets from "./components/FetchGoogleSheets.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <div className="content-container">
          {/* <FetchGoogleSheets /> */}
          <Routes>
            {/* HOME SECTION */}
            <Route
              path="/"
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
            <Route path="/infographics" element={<Infographics />} />

            {/* ABOUT SECTION */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
