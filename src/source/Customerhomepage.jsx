import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartLine, faCalendar, faWallet } from '@fortawesome/free-solid-svg-icons';
import './CustomerHomepage.css';

function CustomerHomepage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get('email') || sessionStorage.getItem('email') || 'Guest';

  useEffect(() => {
    if (!sessionStorage.getItem('email')) {
      sessionStorage.setItem('email', email);
    }
  }, [email]);

  return (
    <div>
      <CustomerNavbar />
      <div className="customer-homepage-container">
        <header className="customer-header">
          <h1 className="customer-title">Welcome to Your Expense Tracker</h1>
          <p className="customer-subtitle">Keep track of your expenses and stay on top of your budget</p>
         {/*  <p className="customer-email">Logged in as: {email}</p>  */}
        </header>
        <section className="customer-content">
          <div className="customer-card">
            <FontAwesomeIcon icon={faDollarSign} className="customer-card-icon" />
            <h2 className="customer-card-title">Expense Overview</h2>
            <p className="customer-card-description">View your total expenses and compare against your budget.</p>
          </div>
          <div className="customer-card">
            <FontAwesomeIcon icon={faChartLine} className="customer-card-icon" />
            <h2 className="customer-card-title">Financial Trends</h2>
            <p className="customer-card-description">Analyze your spending trends over time.</p>
          </div>
          <div className="customer-card">
            <FontAwesomeIcon icon={faCalendar} className="customer-card-icon" />
            <h2 className="customer-card-title">Upcoming Expenses</h2>
            <p className="customer-card-description">Track and manage your upcoming bills and expenses.</p>
          </div>
          <div className="customer-card">
            <FontAwesomeIcon icon={faWallet} className="customer-card-icon" />
            <h2 className="customer-card-title">Budget Management</h2>
            <p className="customer-card-description">Set and adjust your budget categories and limits.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CustomerHomepage;
