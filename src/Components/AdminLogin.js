import React, { useState } from 'react';
import AuthService from '../AuthService';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import Kanini from './images/klogo.jpg';
import NavbarKanini from './NavbarKanini';

const AdminLoginForm = () => {
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  
  
  const handleNameChange = (e) => {
    setAdminName(e.target.value);
    setNameError('');
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setAdminPassword(password);

    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      setPasswordError(
        'Password should have at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.'
      );
    } else {
      setPasswordError('');
    }
  };

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation checks
    if (adminName.trim() === '') {
      setNameError('Please enter the name.');
      return;
    }

    if (passwordError) {
      return;
    }

    try {
      const success = await AuthService.loginAdmin(adminName, adminPassword);
      if (success) {
        console.log('Login success');
        history('/dash');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '1px',
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '100%',
        backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/172/921/248/nature-water-sea-travel-wallpaper-preview.jpg')`,
      }}
    >
      <NavbarKanini></NavbarKanini>
      <Card style={{ height: '23rem', width: '30rem', top: 1 }}>
        <CardContent>
          <h1>
            <img src={Kanini} alt='' style={{ height: '40px', width: '40px' }}></img> Kanini Tourism
          </h1>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin} className="admincontainer">
            <div>
              <CardContent>
                <TextField
                  label="Admin Name"
                  type="text"
                  name="adminName"
                  value={adminName}
                  onChange={handleNameChange}
                  variant="outlined"
                  fullWidth
                  error={!!nameError}
                  helperText={nameError}
                />
              </CardContent>
            </div>
            <div>
              <CardContent>
                <TextField
                  label="Admin Password"
                  type="password"
                  name="adminPassword"
                  value={adminPassword}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  fullWidth
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </CardContent>
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
