import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';
import Navbar from '../Navbar';
import { useAuth } from '../admin/AuthContext';

const Signin = () => {
  
  const Swal = require('sweetalert2');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    // Perform client-side validation
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Field Missing!!',
        text: 'Please enter both email and password.'
      })
      return;
    }

    axios
      .post('http://localhost:8080/signin', formData) // Replace with your backend URL
      .then((response) => {
        if (response.status === 200) {
          const userName = response.data;
          loginUser();
          navigate('/SigninUser', { state: { userEmail: formData.email,userName } }); // Redirect to the user page
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: 'An error occurred while signing in.'
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'SignIn Failed!!',
          text: 'Please check you credentials'
        })
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
    <div className="signup-container" style={{ marginTop: '200px' }}>
       
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label className="label-left">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label className="label-left">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="button" className="create-button"  onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </div>
    </div>
  );
};

export default Signin;