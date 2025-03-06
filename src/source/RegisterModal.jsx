import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterModal.css'; // If you have specific styles

function RegisterModal({ show, handleClose, handleRegister, apiUrl }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    area: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const { username, email, password, confirmPassword, phoneNumber, area, city } = formData;
    if (!username || !email || !password || !confirmPassword || !phoneNumber || !area || !city) {
      setError('Please fill in all fields.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          area: formData.area,
          city: formData.city,
        }),
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Registration successful') {
          setSuccess('Registration successful!');
          handleRegister();
        } else {
          setError(data);
        }
      })
      .catch(error => setError('An error occurred. Please try again.'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title"><strong>CUSTOMER REGISTRATION FORM</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="alert">{error}</Alert>}
        {success && <Alert variant="success" className="alert">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Control
              type="text"
              placeholder="Area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity">
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="modal-actions">
            <Button variant="success" type="submit">
              <strong>REGISTER</strong>
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ml-2">
              <strong>CLOSE</strong>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
