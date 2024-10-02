import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { UserContext } from '../App'; 
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./Register.css";


const Login = () => {
  const { user , setUser, setLoginType } = useContext(UserContext);  // Access setLoginType from UserContext
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginType, setLocalLoginType] = useState('admin');  // use camelCase here too

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
   
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const url = loginType === 'user'
        ? 'http://localhost:5000/api/userroute/login'
        : 'http://localhost:5000/api/adminroute/login';

      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200 && response.data) {
        const userData = response.data;
        setUser(userData); // Set user globally
        setLoginType(loginType);  // Set loginType globally
        console.log('User:', userData);  // Log user to the console
        console.log('LoginType:', loginType);  // Log loginType to the console

        localStorage.setItem('user', JSON.stringify(userData)); 
        localStorage.setItem('loginType', loginType);  // Fixed typo

        alert('Login successful');
        // window.location.href = "/";  // Redirect to home page
      } else {
        setErrorMessage('Login failed');
      }

    } catch (err) {
      setErrorMessage('An error occurred during login: ' + err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="cont4">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} style={{border: "2px solid blue" , height: "350px", background: "white"}}>
            <h3 className="text-center">Login</h3>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              {/* Radio buttons for login type */}
              <Form.Group className="mb-3">
                <Form.Check 
                  type="radio" 
                  label="User Login" 
                  name="loginType" 
                  value="user" 
                  checked={loginType === 'user'}
                  onChange={() => setLocalLoginType('user')}
                />
                <Form.Check 
                  type="radio" 
                  label="Admin Login" 
                  name="loginType" 
                  value="admin" 
                  checked={loginType === 'admin'}
                  onChange={() => setLocalLoginType('admin')}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="primary" 
                  className="w-50"
                  onClick={() => window.location.href = "/Register"}
                >
                  Register
                </Button>

                <Button
                  variant="secondary"
                  className="w-50 ms-3"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
        </div>
      <Footer />
    </>
  );
};

export default Login;
