import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerNavbar from './CustomerNavbar';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons'; // Import the search icon
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

ChartJS.register(Title, Tooltip, Legend, ArcElement); // Register Chart.js components

const Expensedetailscustomer = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const email = sessionStorage.getItem('email') || 'Guest';

  useEffect(() => {
    // Fetch expenses by email when component mounts
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:6900/api/expenses/email/${email}`);
        setExpenses(response.data);
        setFilteredExpenses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load expense data');
        setLoading(false);
      }
    };

    if (email !== 'Guest') {
      fetchExpenses();
    } else {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    // Filter expenses based on the search term
    const filtered = expenses.filter(expense =>
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpenses(filtered);
  }, [searchTerm, expenses]);

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: [...new Set(filteredExpenses.map(expense => expense.category))],
    datasets: [{
      data: filteredExpenses.reduce((acc, expense) => {
        const index = acc.findIndex(item => item.label === expense.category);
        if (index > -1) {
          acc[index].value += expense.amount;
        } else {
          acc.push({ label: expense.category, value: expense.amount });
        }
        return acc;
      }, []),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#E7E9ED',
        '#8B5CF6',
        '#F472B6'
      ],
      hoverOffset: 4
    }]
  };

  // Function to handle PDF download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Details', 14, 22);
    
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Category', 'Description', 'Amount']],
      body: filteredExpenses.map(expense => [
        expense.id,
        expense.category,
        expense.description,
        expense.amount
      ]),
      theme: 'striped',
      margin: { top: 30 },
    });

    doc.save('expenses.pdf');
  };

  return (
    <div>
      <CustomerNavbar email={email} />
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}><strong>EXPENSE DETAILS</strong></h1>
          <p style={styles.subtitle}>View and manage your expenses</p>
        </header>
        <section style={styles.content}>
          <InputGroup className="mb-3" style={styles.searchBar}>
            <InputGroup.Text><Search /></InputGroup.Text>
            <Form.Control
              placeholder="Search by category or description"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </InputGroup>

          {/* Download Button */}
          {filteredExpenses.length > 0 && (
            <Button onClick={downloadPDF} variant="primary" style={styles.downloadButton}>
              Download as PDF
            </Button>
          )}

          {/* Pie Chart */}
          <div style={styles.chartContainer}>
            <Pie data={pieChartData} options={styles.chartOptions} />
          </div>

          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : email === 'Guest' ? (
            <Card className="text-center">
              <Card.Body>
                <Card.Text>
                  Please log in to view your expenses.
                </Card.Text>
              </Card.Body>
            </Card>
          ) : filteredExpenses.length === 0 ? (
            <Card className="text-center">
              <Card.Body>
                <Card.Text>
                  No expenses found.
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div id="table-to-pdf">
              <Table striped bordered hover style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th>ID</th>
                    <th>CATEGORY</th>
                    <th>DESCRIPTION </th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id} style={styles.tr}>
                      <td>{expense.id}</td>
                      <td>{expense.category}</td>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
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
            transform: perspective(1000px) rotateY(5deg);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          tr:active {
            transform: perspective(1000px) rotateY(0deg);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .chartContainer {
            width: 80%; /* Adjust the width to make the chart smaller */
            max-width: 400px; /* Set a maximum width */
            margin-bottom: 30px;
            margin-top: 20px;
          }
          .chartContainer canvas {
            transition: transform 0.3s ease;
          }
          .chartContainer:hover canvas {
            transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '60px', // Adjust for navbar height
    padding: '20px',
    backgroundColor: 'rgb(254,245,235)', // Set the background color
    minHeight: '92.3vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#555',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
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
    backgroundColor: '#007bff', // Accent color
    color: 'white',
  },
  tr: {
    cursor: 'pointer',
  },
  searchBar: {
    maxWidth: '600px', // Adjust width as needed
    marginBottom: '20px',
  },
  chartContainer: {
    width: '80%', // Adjust width to make the chart smaller
    maxWidth: '400px', // Set a maximum width
    marginBottom: '30px',
    marginTop: '20px',
  },
  chartOptions: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed.toFixed(2)}`;
            }
            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom',
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true
    }
  },
  downloadButton: {
    marginBottom: '20px',
  }
};

export default Expensedetailscustomer;
