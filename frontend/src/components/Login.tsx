// frontend/src/components/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';

interface LoginProps {
  setToken: (token: string) => void;
  setUserId: (userId: string) => void; // Add this prop
}

const Login: React.FC<LoginProps> = ({ setToken, setUserId }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData); // API call to login
      setToken(response.data.token); // Set token in parent component/state
      setUserId(response.data.userId); // Set userId in parent component/state
      navigate('/chat'); // Redirect to chat page after successful login
    } catch (error) {
      setMessage('Login failed. Please try again.'); // Display error message on login failure
    }
  };

  const handleSignUp = () => {
    navigate('/register'); // Redirect to register page
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography sx={{fontSize: '70px', color: '#0080FF'}}>ChatApp</Typography>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '1rem', width: '100%' }}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="left">
            Welcome!
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            Sign in to continue.
          </Typography>
          {message && <Typography color="error" align="center">{message}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              style={{ borderRadius: 10 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              style={{ borderRadius: '1rem' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ borderRadius: '1rem', marginTop: '10px' }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
            Don't have an account?{' '}
            <Link component="button" onClick={handleSignUp}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
