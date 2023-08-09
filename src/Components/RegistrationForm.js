import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Typography, Button,Grid } from '@mui/material';
import AuthService from '../AuthService';
import Kanini from './images/klogo.jpg'
import NavbarKanini from './NavbarKanini';

const RegistrationForm = () => {
  const [travelAgentName, setTravelAgentName] = useState('');
  const [travelAgentEmail, setTravelAgentEmail] = useState('');
  const [travelAgentPass, setTravelAgentPass] = useState('');
  const [travelAgentmobile, setTravelAgentmobile] = useState('');
  const [travelAgentaddress, setTravelAgentaddress] = useState('');
  const history = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');

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

  const handleMobileChange = (e) => {
    setTravelAgentmobile(e.target.value);
    if (!/^\d{10}$/.test(e.target.value)) {
      setMobileError('Mobile number should have exactly 10 digits.');
    } else {
      setMobileError('');
    }
  };

  const handleAddressChange = (e) => {
    setTravelAgentaddress(e.target.value);
    if (e.target.value.trim() === '') {
      setAddressError('Please enter your address.');
    } else {
      setAddressError('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (emailError || passError || mobileError || addressError) {
      alert('Please fix the errors in the form.');
      return;
    } 
    try {
      await AuthService.register(travelAgentName, travelAgentEmail,travelAgentmobile,travelAgentaddress, travelAgentPass);
      console.log('Register success');
      history('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.message.includes('already registered')) {
        alert('You are already registered. Click below to login.');
      } else {
        alert('Registration failed. Please try again later.');
      }
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
     backgroundImage:`url('https://media1.popsugar-assets.com/files/thumbor/zGYsIXcp7Vy6Qi1DHojDK2fGKOM/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/12/01/453/n/43698403/a8c6b9bbf2d8cf5b_sydney-opera-house-australia-54610/i/Sydney-Australia.jpg')`
      
    }}>
      <br /><NavbarKanini></NavbarKanini>
      <Card style={{height:'25.7rem',width:'24rem'}}>
        <CardContent>
        <h1 style={{fontSize:'30px'}}><img src={Kanini} alt='' style={{height:'40px',width:'40px'}}></img> Kanini Tourism</h1>
          <Typography style={{fontWeight:'bold'}} variant="h5" component="h2">
          TravelAgent  Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
        fullWidth
        label="TravelAgent Name"
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
        label="Mobile Number"
        type="text"
        value={travelAgentmobile}
        onChange={handleMobileChange}
        margin="normal"
        error={!!mobileError}
        helperText={mobileError}
      />
            </Grid>
            <Grid item xs={6}>
            <TextField
        fullWidth
        label="Address"
        type="text"
        value={travelAgentaddress}
        onChange={handleAddressChange}
        margin="normal"
        error={!!addressError}
        helperText={addressError}
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
      />
</Grid>
          </Grid>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
          <Typography variant="body2" color="textSecondary">
            Already registered? <a href="/login"> login</a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
