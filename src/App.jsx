import React, { useState } from "react";
import "./App.css";
import "./ConferenceEvent.css";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  const handleShowDetails = () => {
    if (!showVenue) {
      setShowVenue(true);
    }
    setShowDetails(true);
  };

  const navigateToProducts = (idType, e) => {
    e.preventDefault();
    if (!showVenue) {
      setShowVenue(true);
      setTimeout(() => {
        const element = document.querySelector(idType);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    } else {
      const element = document.querySelector(idType);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Always visible navbar */}
      <nav className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={(e) => navigateToProducts("#venue", e)}>Venue</a>
            <a href="#addons" onClick={(e) => navigateToProducts('#addons', e)}>Add-ons</a>
            <a href="#meals" onClick={(e) => navigateToProducts('#meals', e)}>Meals</a>
          </div>
          <button className="details_button" onClick={handleShowDetails}>
            Show Details
          </button>
        </div>
      </nav>

      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1>
            <p className="budget_sentence"> Plan your next major event with us!</p>
            <div className="getstarted_btn">
              <button onClick={() => handleGetStarted()} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}>
        <ConferenceEvent showNavbar={false} showDetails={showDetails} setShowDetails={setShowDetails} />
      </div>
    </>
  );
}

export default App;
