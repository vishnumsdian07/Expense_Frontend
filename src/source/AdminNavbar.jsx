import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faReceipt, faBullhorn, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminNavbar.css';

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <h1 className="admin-navbar-logo"><strong>SPENDSMART</strong></h1>
        <ul className="admin-navbar-menu">
          <li className="admin-navbar-item">
            <a href="/adminhomepage" className="admin-navbar-link">
              <FontAwesomeIcon icon={faHome} className="admin-navbar-icon" />
              <strong>HOMEPAGE</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/customerdetails" className="admin-navbar-link">
              <FontAwesomeIcon icon={faUsers} className="admin-navbar-icon" />
              <strong>CUSTOMER DETAILS</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/adminexpensedetails" className="admin-navbar-link">
              <FontAwesomeIcon icon={faReceipt} className="admin-navbar-icon" />
              <strong>EXPENSE DETAILS</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/adminannouncement" className="admin-navbar-link">
              <FontAwesomeIcon icon={faBullhorn} className="admin-navbar-icon" />
              <strong>ANNOUNCEMENT</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/" className="admin-navbar-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="admin-navbar-icon" />
              <strong>LOGOUT</strong>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
