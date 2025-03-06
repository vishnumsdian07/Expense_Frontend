import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

// API URL for backend
const API_URL = 'http://localhost:6900/api/customers';

function Navbar() {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleShow = (modalType) => {
    switch (modalType) {
      case 'customer':
        setShowCustomerModal(true);
        break;
      case 'organization':
        setShowOrganizationModal(true);
        break;
      case 'admin':
        setShowAdminModal(true);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setShowCustomerModal(false);
    setShowOrganizationModal(false);
    setShowAdminModal(false);
    setShowRegisterModal(false);
  };

  const handleLogin = (type, email) => {
    if (type === 'admin') {
      navigate('/adminhomepage');
    } else if (type === 'organization') {
      navigate('/organizationhomepage');
    } else if (type === 'customer') {
      navigate(`/customerhomepage?email=${encodeURIComponent(email)}`);
    }
    handleClose();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo"><strong>SPENDSMART</strong></h1>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="#customer-login" className="navbar-link" onClick={() => handleShow('customer')}><strong>CUSTOMER LOGIN</strong></a>
            </li>
            <li className="navbar-item">
              <a href="#organization-login" className="navbar-link" onClick={() => handleShow('organization')}><strong>ORGANISATION LOGIN</strong></a>
            </li>
            <li className="navbar-item">
              <a href="#admin-login" className="navbar-link" onClick={() => handleShow('admin')}><strong>ADMIN LOGIN</strong></a>
            </li>
          </ul>
        </div>
      </nav>

      <CustomerLoginModal 
        show={showCustomerModal} 
        handleClose={handleClose} 
        handleLogin={handleLogin} 
        setShowRegisterModal={setShowRegisterModal}
        apiUrl={API_URL}
      />

      <OrganizationLoginModal
        show={showOrganizationModal}
        handleClose={handleClose}
        handleLogin={handleLogin}
      />

      <AdminLoginModal
        show={showAdminModal}
        handleClose={handleClose}
        handleLogin={handleLogin}
      />

      <RegisterModal
        show={showRegisterModal}
        handleClose={handleClose}
        handleRegister={() => { 
          alert('Registration successful');
          handleClose();
        }}
        apiUrl={API_URL}
      />
    </div>
  );
}

function CustomerLoginModal({ show, handleClose, handleLogin, setShowRegisterModal, apiUrl }) {
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Login successful') {
          handleLogin('customer', username);
        } else {
          setError('Invalid email or password.');
        }
      })
      .catch(error => setError('An error occurred. Please try again.'));
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
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
            </Button>
            <div className="register-link">
              <span>Not registered yet? </span>
              <Button variant="link" onClick={() => setShowRegisterModal(true)} className="p-0">
                <strong>Click here to register</strong>
              </Button>
            </div>
            <Button variant="secondary" onClick={handleClose} className="ml-2">
              <strong>CLOSE</strong>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function OrganizationLoginModal({ show, handleClose, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded organization credentials
  const ORG_USERNAME = 'organize'; // Replace with actual organization email
  const ORG_PASSWORD = 'organize'; // Replace with actual organization password

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
      if (username === ORG_USERNAME && password === ORG_PASSWORD) {
        handleLogin('organization');
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title"><strong>ORGANIZATION LOGIN</strong></Modal.Title>
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
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
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

function AdminLoginModal({ show, handleClose, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded admin credentials
  const ADMIN_USERNAME = 'admin'; // Replace with actual admin email
  const ADMIN_PASSWORD = 'admin'; // Replace with actual admin password

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
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        handleLogin('admin');
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title"><strong>ADMIN LOGIN</strong></Modal.Title>
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
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
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

function RegisterModal({ show, handleClose, handleRegister, apiUrl }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          area: area,
          city: city,
        }),
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Registration successful') {
          handleRegister();
        } else {
          setError('Registration failed.');
        }
      })
      .catch(error => setError('An error occurred. Please try again.'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title"><strong>REGISTER</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="alert">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Control
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Control
              type="text"
              placeholder="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity">
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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

export default Navbar;
