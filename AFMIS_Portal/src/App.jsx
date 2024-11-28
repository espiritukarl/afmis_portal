import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Navbar from "./pages/Navbar.jsx";
import { LandingMain, LandingSide } from "./pages/Home.jsx";
import UpcomingEvents from "./pages/UpcomingEvents.jsx";
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
