import React, { useState, useEffect } from 'react';
import CustomerNavbar from './CustomerNavbar';
import './Expenseupload.css';  // Import the CSS file
import { getAppUrl } from './api/api-config';

function Expenseupload() {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: '', // Email will be set from CustomerNavbar
    category: '',
    description: '',
    amount: '',
  });

  // State to manage categories
  const [categories, setCategories] = useState(['Food', 'Transport', 'Utilities', 'Entertainment']);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for tracking category selection

  // State to manage loading
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'category') {
      setSelectedCategory(value); // Update the selected category
    }
  };

  // Handle new category input change
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let finalCategory = selectedCategory; // Use selectedCategory instead of formData.category

    if (selectedCategory === 'other' && newCategory.trim()) {
      finalCategory = newCategory; // Replace 'other' with the newCategory
      setCategories(prevCategories => {
        if (!prevCategories.includes(newCategory)) {
          return [...prevCategories, newCategory];
        }
        return prevCategories;
      });
    }

    // Update form data with the final category
    const updatedFormData = {
      ...formData,
      category: finalCategory,
    };

    // Set loading state to true
    setIsLoading(true);

    // Submit form data to the backend
    
    let url = getAppUrl('expenses')
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted:', data);

        // Clear the form after successful submission (optional)
        setFormData({
          email: formData.email,
          category: '',
          description: '',
          amount: '',
        });
        setNewCategory(''); // Clear the new category input field
        setSelectedCategory(''); // Clear the selected category

        // Set loading state to false
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);

        // Handle error (e.g., show a message to the user)
        setIsLoading(false);
      });
  };

  // Set email from sessionStorage or another source
  const email = sessionStorage.getItem('email') || '';

  // Set email in form data
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      email: email
    }));
  }, [email]);

  return (
    <div>
      <CustomerNavbar email={email} />
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="expense-upload-container">
        <h2><strong>EXPENSE UPLOAD</strong></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><strong>EAMIL</strong></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              readOnly 
            />
          </div>
          <div className="form-group">
            <label><strong>CATEGORY</strong></label>
            <select
              name="category"
              value={selectedCategory} // Use selectedCategory for the dropdown
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
              <option value="other">Other</option>
            </select>
            {selectedCategory === 'other' && (
              <input
                type="text"
                name="newCategory"
                placeholder="Enter new category"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
            )}
          </div>
          <div className="form-group">
            <label><strong>DESCRIPTION</strong></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><strong>AMOUNT</strong></label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <button type="submit" disabled={isLoading} className={`submit-button ${isLoading ? 'loading' : ''}`}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Expenseupload;