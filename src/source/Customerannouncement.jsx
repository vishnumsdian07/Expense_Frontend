import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerNavbar from './CustomerNavbar';
import { Spinner, Alert } from 'react-bootstrap';
import { FaBullhorn } from 'react-icons/fa'; // Import an icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customerannouncement.css'; // Import the CSS file for styles

const Customerannouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/announcements');
        setAnnouncements(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load announcements');
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <CustomerNavbar />
      <div className="announcement-container">
        <h1 className="announcement-title">Customer Announcements</h1>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : announcements.length === 0 ? (
          <Alert variant="info">No announcements found.</Alert>
        ) : (
          <div className="announcement-list">
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement-card">
                <FaBullhorn className="announcement-icon" />
                <h3 className="announcement-heading">Announcement {index + 1}</h3>
                <p className="announcement-description">{announcement.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Customerannouncement;
