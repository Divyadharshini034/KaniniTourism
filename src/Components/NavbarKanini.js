import React from 'react';
import { AppBar, Toolbar, Typography, ListItemButton, IconButton, Drawer,  ListItemText, useMediaQuery,Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Kanini from './images/klogo.jpg'
const NavbarKanini = () => {

  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isListExpanded, setIsListExpanded] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsListExpanded(false); 
  };

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const list = (
    <div style={{ display: isSmallScreen ? (isListExpanded ? 'flex' : 'none') : 'flex', flexDirection:!isDrawerOpen?'row':'column', gap: '5px', color: '#0B4787',fontWeight:'normal' }}>
      
    <ListItemButton  component={Link} to="/">
    <ListItemText primary="Home" primaryTypographyProps={{ style: { fontWeight: 'bold',fontSize:'1.3rem' } }} />
  </ListItemButton >
      <ListItemButton  component={Link} to="/contact">
        <ListItemText primary="Contact" primaryTypographyProps={{ style: { fontWeight: 'bold',fontSize:'1.3rem' } }} />
      </ListItemButton >
      <ListItemButton component={Link} to="/feedback">
        <ListItemText primary="Feedback" primaryTypographyProps={{ style: { fontWeight: 'bold',fontSize:'1.3rem' } }}/>
      </ListItemButton>
     
    
      <ListItemButton component={Link} to="/admin">
  <ListItemText primary="Admin" primaryTypographyProps={{ style: { fontWeight: 'bold',fontSize:'1.3rem' } }} />
</ListItemButton>

      <ListItemButton component={Link} to="/login">
        <ListItemText primary="TravelAgent " primaryTypographyProps={{ style: { fontWeight: 'bold' ,fontSize:'1.3rem'} }}/>
      </ListItemButton>

      <ListItemButton component={Link} to="/tl">
        <ListItemText primary="Traveler "primaryTypographyProps={{ style: { fontWeight: 'bold' ,fontSize:'1.3rem'} }}/>
      </ListItemButton>
    </div>
  );

  return (

   
    <div style={{ height: '60px', width: '100%', position: 'fixed', top: 0, left: 0, right: 0 }}>
      
      <AppBar position="static" sx={{ height: '100%', width: '100%', backgroundColor: '#70BFFF' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ display:'flex',flexGrow: 1, color: '#333399',fontWeight:'bold' }}>
          <img src={Kanini} alt='' style={{height:'40px',width:'40px'}}/>  Kanini Tourism
          </Typography>
          {isSmallScreen ? (
            <IconButton edge="end" color="inherit" aria-label="menu" style={{ color: 'blue' }} onClick={() => { toggleDrawer(); toggleList(); }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {list}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isSmallScreen && isDrawerOpen} onClose={() => { toggleDrawer(); toggleList(); }}>
        <div
          role="presentation"
          onClick={() => { toggleDrawer(); toggleList(); }}
          onKeyDown={() => { toggleDrawer(); toggleList(); }}
          
        >
          {isSmallScreen && isDrawerOpen ? (
            <div onClick={(e) => e.stopPropagation()}>
              {list}
            </div>
          ) : null}
        </div>
      </Drawer>
    </div>
  );
};

export default NavbarKanini;
