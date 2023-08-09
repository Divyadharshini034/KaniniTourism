import React, { useState } from 'react';
import authService from '../AuthService';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button,Grid } from '@mui/material';
import Kanini from './images/klogo.jpg'
import NavbarKanini from './NavbarKanini';

const TravelerReg = () => {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPass, setTravelerPass] = useState('');
  const [travelerMobileNo, setTravelerMobile] = useState('');
  const [travelerAddress, setTravelerAddress] = useState('');
  const [dob, setTravelerDob] = useState('');
  const history = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [dobError, setDobError] = useState('');

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
  const handleMobileChange = (e) => {
    const mobileValue = e.target.value;
    setTravelerMobile(mobileValue);
    if (!/^\d{10}$/.test(mobileValue)) {
      setMobileError('Mobile number should have exactly 10 digits.');
    } else {
      setMobileError('');
    }
  };

  const handleAddressChange = (e) => {
    const addressValue = e.target.value;
    setTravelerAddress(addressValue);
    if (addressValue.trim() === '') {
      setAddressError('Please enter your address.');
    } else {
      setAddressError('');
    }
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setTravelerDob(dobValue);
    if (dobValue.trim() === '') {
      setDobError('Please enter your date of birth.');
    } else {
      setDobError('');
    }
  };
  const handleRegister = async () => {
    if (emailError || passError||mobileError||addressError||dobError) {
      alert('Please fix the errors in the form.');
      return;
    }
    try {
      await authService.registerTraveler(travelerName, travelerEmail, travelerMobileNo, travelerAddress, dob, travelerPass);
      alert('Registration successful! Please login.');
      history('/tl');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '1px',
      left: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: '100%',
      backgroundPosition: 'center',
      backgroundImage: `url('https://media1.popsugar-assets.com/files/thumbor/zGYsIXcp7Vy6Qi1DHojDK2fGKOM/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/12/01/453/n/43698403/a8c6b9bbf2d8cf5b_sydney-opera-house-australia-54610/i/Sydney-Australia.jpg')`

    }}>
      <NavbarKanini></NavbarKanini>
      <Card style={{ height: '26rem', width: '26rem' }}>
        <CardContent>
        <h1 style={{fontSize:'30px'}}><img src={Kanini} alt='' style={{height:'40px',width:'40px'}}></img> Kanini Tourism</h1>
          <Typography variant="h5" component="h1">
            Traveler Registration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Name"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                margin="normal"
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
        type="text"
        label="Mobile No"
        value={travelerMobileNo}
        onChange={handleMobileChange}
        margin="normal"
        error={!!mobileError}
        helperText={mobileError}
      />
            </Grid>
            <Grid item xs={6}>
            <TextField
        fullWidth
        type="text"
        label="Address"
        value={travelerAddress}
        onChange={handleAddressChange}
        margin="normal"
        error={!!addressError}
        helperText={addressError}
      />
              <TextField
        fullWidth
        type="date"
        label="Date of Birth"
        value={dob}
        onChange={handleDobChange}
        margin="normal"
        error={!!dobError}
        helperText={dobError}
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
            </Grid>
          </Grid>
          <div></div><div></div>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
          <Typography variant="body2" color="textSecondary">
            Already registered? <a href="/tl"> login</a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerReg;
