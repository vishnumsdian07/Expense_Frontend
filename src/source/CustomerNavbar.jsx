import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faListAlt, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './CustomerNavbar.css';

function CustomerNavbar({ email }) {
  return (
    <nav className="customer-navbar">
      <div className="customer-navbar-container">
        <h1 className="customer-navbar-logo"><strong>SPENDSMART</strong></h1>
        <ul className="customer-navbar-menu">
          <li className="customer-navbar-item">
            <Link to="/customerhomepage" className="customer-navbar-link">
              <FontAwesomeIcon icon={faHome} className="customer-navbar-icon" />
              <strong>HOMEPAGE</strong>
            </Link>
          </li>
          <li className="customer-navbar-item">
            <Link to="/expenseupload" className="customer-navbar-link">
              <FontAwesomeIcon icon={faUpload} className="customer-navbar-icon" />
              <strong>EXPENSE UPLOAD</strong>
            </Link>
          </li>
          <li className="customer-navbar-item">
            <Link to="/expensedetailscustomer" className="customer-navbar-link">
              <FontAwesomeIcon icon={faListAlt} className="customer-navbar-icon" />
              <strong>EXPENSE DETAILS</strong>
            </Link>
          </li>
          <li className="customer-navbar-item">
            <Link to="/customerannouncement" className="customer-navbar-link">
              <FontAwesomeIcon icon={faBell} className="customer-navbar-icon" />
              <strong>ANNOUNCEMENTS</strong>
            </Link>
          </li>
          <li className="customer-navbar-item">
            <Link to="/" className="customer-navbar-link" onClick={() => sessionStorage.removeItem('email')}>
              <FontAwesomeIcon icon={faSignOutAlt} className="customer-navbar-icon" />
              <strong>LOGOUT</strong>
            </Link>
          </li>
        </ul>
        <div className="customer-navbar-email">
          <p>{email}</p>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
