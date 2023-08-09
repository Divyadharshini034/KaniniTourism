import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Card, Typography, Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 62,
        height: '100vh',
        background: 'white',
        transition: 'width 0.3s',
        borderTopRightRadius: '50px',
        borderBottomRightRadius: '50px',
      
      }}
    >
      <Card style={{ height: '37rem', width: isOpen ? '15rem' : '5rem', padding: '1rem',  borderRadius:'25px',backgroundImage: 'url("https://i.pinimg.com/564x/0f/52/35/0f52358f7b7961a3144415c84578bcc5.jpg")' ,backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Typography variant="h5" sx={{ mt: 2, mb: 1, ml: 2, left: -90,color: 'black' ,}}>
          <Button onClick={toggleSidebar} sx={{ ml: 2, mt: 2, mb: 1, left: -50 }}>
            {isOpen ? <MenuIcon /> : <MenuOpenIcon />}
          </Button>
          KaniniTourism
        </Typography>
        <List>
          <Card style={{ marginBottom: '1rem' }}>
            <ListItem Button component={Link} to="/traactive">
              <ListItemIcon>
                <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="TravelAgent Activation" />
            </ListItem>
          </Card>
          <Card>
            <ListItem Button component={Link} to="/gallery">
              <ListItemIcon>
                <AddAPhotoIcon />
              </ListItemIcon>
              <ListItemText primary="Gallery" />
            </ListItem>
          </Card>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
