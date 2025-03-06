import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faChartBar, faCog, faDollarSign, faTasks } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from './AdminNavbar';
import './AdminHomepage.css';

function AdminHomepage() {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-homepage-container">
        <header className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your application with ease</p>
        </header>
        <section className="admin-content">
          <div className="admin-card">
            <FontAwesomeIcon icon={faUserCog} className="admin-card-icon" />
            <h2 className="admin-card-title">User Management</h2>
            <p className="admin-card-description">Manage and oversee user accounts, including user roles and permissions.</p>
          </div>
          <div className="admin-card">
            <FontAwesomeIcon icon={faChartBar} className="admin-card-icon" />
            <h2 className="admin-card-title">Reports</h2>
            <p className="admin-card-description">Generate and view detailed reports on application usage and performance.</p>
          </div>
          <div className="admin-card">
            <FontAwesomeIcon icon={faDollarSign} className="admin-card-icon" />
            <h2 className="admin-card-title">Expense Details</h2>
            <p className="admin-card-description">Track and manage expenses across various categories and time periods.</p>
          </div>
          <div className="admin-card">
            <FontAwesomeIcon icon={faTasks} className="admin-card-icon" />
            <h2 className="admin-card-title">Task Management</h2>
            <p className="admin-card-description">Assign and manage tasks, track progress, and set deadlines.</p>
          </div>
          <div className="admin-card">
            <FontAwesomeIcon icon={faCog} className="admin-card-icon" />
            <h2 className="admin-card-title">Settings</h2>
            <p className="admin-card-description">Configure application settings, preferences, and system options.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminHomepage;
