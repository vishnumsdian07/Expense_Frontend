import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';
import { PencilSquare, Envelope } from 'react-bootstrap-icons';
import axios from 'axios';
import { getAppUrl } from './api/api-config';

function AdminAnnouncement() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = getAppUrl('announcements')
    axios.post(url, { title, message })
      .then(response => {
        console.log('Announcement submitted:', response.data);
        fetchAnnouncements(); // Refresh the announcements list
      })
      .catch(error => console.error('Error submitting announcement:', error));
  };

  const fetchAnnouncements = () => {
    let url = getAppUrl('announcements')
    axios.get(url)
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error('Error fetching announcements:', error));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <br />
      <br />
      <br />
      <div style={styles.page}>
        <Container style={styles.container}>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 style={styles.header}><b>ANNOUNCEMENT FORM</b></h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" style={styles.formGroup}>
                  <Form.Label style={styles.label}>
                    <PencilSquare style={styles.icon} /> TITLE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group controlId="formMessage" style={styles.formGroup}>
                  <Form.Label style={styles.label}>
                    <Envelope style={styles.icon} /> MESSAGE
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter announcement message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.input}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={styles.button}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <h2 style={styles.announcementHeader}>ANNOUNCEMENTS</h2>
        <div style={styles.cardContainer}>
          {announcements.map((announcement, index) => (
            <Card key={announcement.id} style={styles.card}>
              <Card.Body>
                <Card.Title>{`Announcement ${index + 1}: ${announcement.title}`}</Card.Title>
                <Card.Text>{announcement.message}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: 'rgb(251,204,178)',
    minHeight: '100vh',
    padding: '40px 20px',
  },
  container: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
    color: '#007bff',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    background: 'linear-gradient(45deg, #007bff, #00d2ff)',
    color: 'white',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.3s',
  },
  announcementHeader: {
    marginTop: '40px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    width: '300px', // Adjust card width as needed
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    transform: 'rotateY(10deg)',
    margin: '10px',
    overflow: 'hidden',
    '&:hover': {
      transform: 'rotateY(0deg) scale(1.05)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    },
  },
};

export default AdminAnnouncement;
