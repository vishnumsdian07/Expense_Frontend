import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faChartLine, faLock, faCoins, faStar, faShieldAlt, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <br/>
      <br/>
      <div className="home-container">
        <header className="header">
          <h1 className="title">SpendSmart</h1>
          <p className="subtitle">Manage your finances with intelligence and ease</p>
          <button className="cta-button"><strong>GET STARTED</strong></button>
        </header>
        <section className="features">
          <div className="feature-card">
            <FontAwesomeIcon icon={faCalendarCheck} className="feature-icon" />
            <h2 className="feature-title">Effortless Tracking</h2>
            <p className="feature-description">Easily record and categorize your expenses.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
            <h2 className="feature-title">Insightful Analytics</h2>
            <p className="feature-description">Gain insights into your spending patterns and optimize your budget.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faLock} className="feature-icon" />
            <h2 className="feature-title">Top-Notch Security</h2>
            <p className="feature-description">Your data is protected with the latest security measures.</p>
          </div>
        </section>
        <section className="additional-info">
          <h2 className="info-title">Why Choose SpendSmart?</h2>
          <div className="info-cards">
            <div className="info-card">
              <FontAwesomeIcon icon={faCoins} className="info-icon" />
              <h3 className="info-heading">Cost-Effective</h3>
              <p className="info-text">Our tool is designed to be affordable without compromising on features.</p>
            </div>
            <div className="info-card">
              <FontAwesomeIcon icon={faStar} className="info-icon" />
              <h3 className="info-heading">Highly Rated</h3>
              <p className="info-text">Join thousands of satisfied users who have rated us highly.</p>
            </div>
            <div className="info-card">
              <FontAwesomeIcon icon={faShieldAlt} className="info-icon" />
              <h3 className="info-heading">Trusted</h3>
              <p className="info-text">We have been a trusted name in financial management for years.</p>
            </div>
          </div>
        </section>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title"><strong>CONTACT US</strong></h2>
          <div className="footer-info">
            <div className="footer-item">
              <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
              <p className="footer-text">support@spendsmart.com</p>
            </div>
            <div className="footer-item">
              <FontAwesomeIcon icon={faPhone} className="footer-icon" />
              <p className="footer-text">+1-800-123-4567</p>
            </div>
            <div className="footer-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
              <p className="footer-text">123 Finance St, Moneyville, CA</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
