//React & Styling
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//Components
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import FetchGoogleSheets from "./components/FetchGoogleSheets.jsx";

//Pages
import { LandingMain, LandingSide } from "./pages/Home/Home.jsx";
import UpcomingEvents from "./pages/Events/UpcomingEvents.jsx";
import NewsArticles from "./pages/News/NewsArticles.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Faq from "./pages/FAQ/FAQ.jsx";
import PriceReport from "./pages/PriceReport/PriceReport.jsx";
import Infographics from "./pages/Infographics/Infographics.jsx";
import HarvestCalendar from "./pages/HarvestCalendar/HarvestCalendar.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";

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
            <Route path="news">
              <Route path="upcoming-events" element={<UpcomingEvents />} />
              <Route path="news-articles" element={<NewsArticles />} />
              <Route path="price-report" element={<PriceReport />} />
              <Route path="infographics" element={<Infographics />} />
            </Route>

            {/* ABOUT SECTION */}
            <Route path="about">
              <Route path="about-us" element={<AboutUs />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="faq" element={<Faq />} />
            </Route>

            {/* RESOURCES SECTION */}
            <Route path="resources">
              <Route path="harvest-calendar" element={<HarvestCalendar />} />
            </Route>

            {/* DEFAULT ROUTE */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
