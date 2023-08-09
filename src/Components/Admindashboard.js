import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Link, ListItemButton, Paper, Popover, IconButton, Avatar, Button } from '@mui/material';
import agent from './images/agent.png';
import gallery from './images/gallery.gif';
import Sidebar from './Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    }
  }, []);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', background: 'white', justifyContent: 'center', backgroundSize: 'cover' ,backgroundImage: 'url("https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg?w=1060&t=st=1691461122~exp=1691461722~hmac=e7127fce062d559463b0706e95c55de426720e15b5a7dd155fc3a7a76be0e922")' ,backgroundPosition:'100%',height:'100vh',width:'200vh'}}> 
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', width: '30rem',display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <div style={{ display: 'flex' ,justifyContent: 'center', marginTop: '2rem' }}>
          <IconButton edge="start" color="inherit" aria-label="account" style={{ top: -3,right:'-34rem', marginLeft: 'auto', height: '5rem', width: '5rem' }} onClick={handlePopoverOpen}>
            <AccountCircleIcon style={{ height: '3rem', width: '3rem' }} />
          </IconButton>
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Paper sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: '1rem' }} />
              <div>
                <Typography>{adminName}</Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </div>
            </Paper>
          </Popover>
        </div>
        <h1>Admin Dashboard</h1>
       <h2>Welcome {adminName}!</h2>
        <br></br>
        <div style={{ display: 'center', justifyContent: 'center' }}>
          <Card style={{ width: '45rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex' ,justifyContent:'center'}}>
            <CardContent>
              <Card style={{ height: '8.5rem', width: '15rem',borderRadius:'25px',backgroundColor:'#fffff',backgroundImage: 'url("https://i.pinimg.com/564x/7d/28/91/7d2891014657285b33d859e083eb3575.jpg")' ,backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <img src={agent} alt="" style={{ height: '5rem', width: '5rem', borderRadius: '4px' }} />
                
              </Card>
              <ListItemButton component={Link} to="/traactive" style={{ textDecoration: 'none', color:  'blue' }}>
                  <Button color='primary' variant="h6" sx={{ mt: 2 }}>
                    TravelAgent Activation
                  </Button>
                </ListItemButton>
            </CardContent>

            <CardContent >
              <Card style={{ height: '8.5rem', width: '15rem', alignItems: 'center',borderRadius:'25px',backgroundImage: 'url("https://i.pinimg.com/564x/0f/52/35/0f52358f7b7961a3144415c84578bcc5.jpg")' ,backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <img src={gallery} alt="" style={{ height: '5rem', width: '5rem', borderRadius: '4px' }} />
               
              </Card>
              <ListItemButton component={Link} to="/gallery" style={{ textDecoration: 'center',fontWeight:'bold', color: 'blue' }}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Gallery
                  </Typography>
                </ListItemButton>
            </CardContent>

            
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
