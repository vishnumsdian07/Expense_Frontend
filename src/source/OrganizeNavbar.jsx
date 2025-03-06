import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faMoneyBill, faBullhorn, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminNavbar.css';

function OrganizeNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <h1 className="admin-navbar-logo"><strong>SPENDSMART</strong></h1>
        <ul className="admin-navbar-menu">
          <li className="admin-navbar-item">
            <a href="/organizationhomepage" className="admin-navbar-link">
              <FontAwesomeIcon icon={faHome} className="admin-navbar-icon" />
              <strong>HOMEPAGE</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/organizationcustomerdetails" className="admin-navbar-link">
              <FontAwesomeIcon icon={faUser} className="admin-navbar-icon" />
              <strong>CUSTOMER DETAILS</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/organizationexpensedetails" className="admin-navbar-link">
              <FontAwesomeIcon icon={faMoneyBill} className="admin-navbar-icon" />
              <strong>EXPENSE DETAILS</strong>
            </a>
          </li>
          <li className="admin-navbar-item">
            <a href="/organizeannouncement" className="admin-navbar-link">
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

export default OrganizeNavbar;
