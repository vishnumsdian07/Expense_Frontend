import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerLoginModal({ show, handleClose, handleLogin, apiUrl, setEmail }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: username,
          password: password,
        }),
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Login successful') {
          setEmail(username); // Set email before redirecting
          handleLogin('customer', username);
        } else {
          setError('Invalid email or password.');
        }
      })
      .catch(() => setError('An error occurred. Please try again.'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title"><strong>CUSTOMER LOGIN</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="alert">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username (email)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="modal-actions">
            <Button variant="success" type="submit"><strong>LOGIN</strong></Button>
            <Button variant="secondary" onClick={handleClose} className="ml-2"><strong>CLOSE</strong></Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CustomerLoginModal;
