import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Table, Container, Alert, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminExpenseDetails.css';  // Import the custom CSS
import { FaSearch } from 'react-icons/fa';  // Import the search icon from react-icons
import OrganizeNavbar from './OrganizeNavbar';

function Organizationexpensedetails() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch expenses from the backend
    fetch('http://localhost:6900/api/expenses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExpenses(data);
        setFilteredExpenses(data);  // Initialize filtered expenses
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter expenses based on search input
    const lowercasedSearch = search.toLowerCase();
    const filtered = expenses.filter(expense =>
      expense.email.toLowerCase().includes(lowercasedSearch) ||
      expense.category.toLowerCase().includes(lowercasedSearch) ||
      expense.description.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredExpenses(filtered);
  }, [search, expenses]);

  if (loading) {
    return (
      <div>
        <OrganizeNavbar />
        <Container className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <OrganizeNavbar />
        <Container className="text-center my-4">
          <Alert variant="danger">
            Error: {error.message}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
       <OrganizeNavbar />
      <br/>
      <br/>
      <br/>
      <Container>
        <h1 className="my-4"><strong>EXPENSE DETAILS</strong></h1>
        <InputGroup className="mb-4">
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text id="basic-addon2">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
        {filteredExpenses.length > 0 ? (
          <Table className="table-hover-3d" striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.email}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>₹{expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">No expenses found.</Alert>
        )}
      </Container>
    </div>
  );
}

export default Organizationexpensedetails;
