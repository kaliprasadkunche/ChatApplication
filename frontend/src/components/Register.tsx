// frontend/src/components/Register.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper} from '@mui/material';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData); // API call to register
      setMessage('User registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setMessage('Error registering user'); // Display error message on registration failure
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography sx={{fontSize: '70px', color: '#0080FF'}}>ChatApp</Typography>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '1rem', width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            style={{ borderRadius: '1rem' }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            style={{ borderRadius: '1rem' }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            style={{ borderRadius: '1rem' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ borderRadius: '1rem', marginTop: '10px' }}>
            Register
          </Button>
        </form>
        {message && <Typography color="error" align="center" style={{ marginTop: '1rem' }}>{message}</Typography>}
      </Paper>
    </Container>
  );
};

export default Register;
