import React from 'react';
import Navbar from './Navbar';
import './styles.css'; // Import your existing CSS

function Homepage() {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="header">
        <h1 className="email-text">
          <span>Email Notification System</span>
        </h1>
      </div>
    </div>
  );
}

export default Homepage;
