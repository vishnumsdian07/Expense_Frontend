import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';
import OrganizeNavbar from './OrganizeNavbar';

const Organizationcustomerdetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch customer data from backend
    fetch('http://localhost:6900/api/customers/all') // Replace with your backend URL
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load customer data');
        setLoading(false);
      });
  }, []);

  return (
    <div>
        <OrganizeNavbar/>
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}><strong>CUSTOMER DETAILS</strong></h1>
        <p style={styles.subtitle}>View and manage customer information</p>
      </header>
      <section style={styles.content}>
        <Table striped bordered hover style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>AREA</th>
              <th>CITY</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} style={styles.tr}>
                <td>{customer.userID}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.area}</td>
                <td>{customer.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 15px;
          text-align: center;
          border: 1px solid #ddd;
        }
        tr {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        tr:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        tr:active {
          transform: translateY(0);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '60px', // Adjust for navbar height
    padding: '20px',
    backgroundColor: 'rgb(255, 204, 178)', // Light background color for content
    minHeight: '92.3vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5em',
    color: 'whitesmoke',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#555',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1200px', // Adjust max width as needed
    textAlign: 'center',
  },
  thead: {
    backgroundColor: '#ff7e5f', // Accent color
    color: 'white',
  },
  tr: {
    cursor: 'pointer',
  },
};

export default Organizationcustomerdetails;
