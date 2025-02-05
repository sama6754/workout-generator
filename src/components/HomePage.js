import React from 'react';
import '../styles/HomePage.css'
import {Link} from 'react-router-dom';

function HomePage() {
    return (
      <div className="homepage">
        <header >
          <div className="homepage-purple-square">
          <h1>Workout Generator</h1>
          </div>
        </header>
        <div className="welcome-section">
        <h2>Welcome!</h2>
        <p>
          Build the perfect workout tailored to your <br />fitness goals.
          Whether you're targeting <br /> specific muscle groups, working with <br /> limited equipment, or managing
          your <br /> time, we've got you covered.
        </p>
        </div>
         <div className="homepage-buttons">
            <Link to="/question">
                <button> Generate Workout </button>
            </Link>
        </div>
        <footer> Personalized Workouts At Your Fingertips</footer>
        <img src="/weights.png" alt= "Weights" className="weight" />
      </div>
    );
  }
  

export default HomePage;