import React, { useState } from 'react';
import AuthService from '../AuthService';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import Kanini from './images/klogo.jpg'
import NavbarKanini from './NavbarKanini';
const LoginForm = () => {
  const [travelAgentName, setTravelAgentName] = useState('');
  const [travelAgentEmail, setTravelAgentEmail] = useState('');
  const [travelAgentPass, setTravelAgentPass] = useState('');
  const [message, setMessage] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const history = useNavigate();
  const handleNameChange = (e) => {
    setTravelAgentName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setTravelAgentEmail(e.target.value);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePassChange = (e) => {
    setTravelAgentPass(e.target.value);
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(e.target.value)) {
      setPassError(
        'Password should have at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.'
      );
    } else {
      setPassError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passError) {
      alert('Please fix the errors in the form.');
      return;
    } 
    try {
      const success = await AuthService.logintra(travelAgentName, travelAgentEmail, travelAgentPass);

      if (success) {
        
        setMessage(localStorage.getItem('Message'));
        history('/place');

      }
    } catch (error) {
      alert("login failed")
      console.error('Login failed:', error);
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
    <Card style={{height:'28rem',width:'22rem'}}>
      <CardContent>
      <h1 style={{fontSize:'30px'}}><img src={Kanini} alt='' style={{height:'40px',width:'40px'}}></img> Kanini Tourism</h1>
        <Typography variant="h5" component="h2">
          TravelerAgent Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
           fullWidth
            type="text"
            label="TravelAgentName"
            value={travelAgentName}
            onChange={handleNameChange}
            margin="normal"
            
          />
          <TextField
        fullWidth
        label="TravelAgent Email"
        type="email"
        value={travelAgentEmail}
        onChange={handleEmailChange}
       
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />
           <TextField
        fullWidth
        label="Password"
        type="password"
        value={travelAgentPass}
        onChange={handlePassChange}
        margin="normal"
        error={!!passError}
        helperText={passError}
      /><br></br>


           <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary">
            Not registered? <a href="/travelagent"> Register</a>
          </Typography>
      </CardContent>
      <div className="app">{message && <p>{message}</p>}</div>
    </Card>
    </div>
  );
};

export default LoginForm;
