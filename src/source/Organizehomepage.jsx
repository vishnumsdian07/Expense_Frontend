import React from 'react';
import OrganizeNavbar from './OrganizeNavbar';
import './Organizehomepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faPeopleGroup, faCog } from '@fortawesome/free-solid-svg-icons';

function Organizehomepage() {
  return (
    <div className="organize-homepage">
      <OrganizeNavbar/>
      <div className="homepage-content">
        <h1>Welcome to the SpendSmart Organization Dashboard</h1>
        <p>Your gateway to managing expenses and announcements.</p>
        <div className="icon-grid">
          <div className="icon-item">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <p>Home</p>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <p>Analytics</p>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faPeopleGroup} className="icon" />
            <p>Teams</p>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faCog} className="icon" />
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organizehomepage;
