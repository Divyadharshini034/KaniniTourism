import React, { useState } from 'react';
import authService from '../AuthService';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import Kanini from './images/klogo.jpg'
import NavbarKanini from './NavbarKanini';
const TravelerLog = () => {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPass, setTravelerPass] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const history = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setTravelerEmail(emailValue);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePassChange = (e) => {
    const passValue = e.target.value;
    setTravelerPass(passValue);
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(passValue)) {
      setPassError('Password should have at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.');
    } else {
      setPassError('');
    }
  };

  const handleLogin = async () => {
    if (emailError || passError) {
      alert('Please fix the errors in the form.');
      return;
    }
    try {
      const success = await authService.loginTraveler(travelerEmail, travelerName, travelerPass);
      if (success) {
        alert('Login successful!');
        history('/kaninipage');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div  style={{
      position: 'absolute',
      top: '10px',
      right: '1px',
      left: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: '100%',
     backgroundPosition:'center',
     backgroundImage:`url('https://hpconstructions.net.au/wp-content/uploads/How-do-I-make-my-balcony-safe.jpg')`
      
    }}>
      <NavbarKanini></NavbarKanini>
    <Card style={{ height: '25.5rem', width: '24rem' }}>
      <CardContent>
      <h1 style={{fontSize:'30px'}}><img src={Kanini} alt='' style={{height:'40px',width:'40px'}}></img> Kanini Tourism</h1>

        <Typography variant="h5">Traveler Login</Typography>
        <TextField
          type="text"
          label="Name"
          value={travelerName}
          onChange={(e) => setTravelerName(e.target.value)}
          fullWidth
          margin='normal'
        />
         <TextField
        fullWidth
        type="email"
        label="Email"
        value={travelerEmail}
        onChange={handleEmailChange}
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />
        <TextField
        fullWidth
        type="password"
        label="Password"
        value={travelerPass}
        onChange={handlePassChange}
        margin="normal"
        error={!!passError}
        helperText={passError}
      />
        <div></div>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <div></div>
        <Typography variant="body2" color="textSecondary">
            Not registered? <a href="/tr"> Register</a>
          </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default TravelerLog;
