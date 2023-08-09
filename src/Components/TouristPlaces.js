import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Pagination, Paper,Avatar,IconButton,Typography,Popover } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import img from './images/logout.png';
import { useNavigate } from 'react-router-dom';
const TouristPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [dialogData, setDialogData] = useState({});
  const [newTouristPlace, setNewTouristPlace] = useState({ touristName: '',touristDate:'',checkIn:'',checkOut:'',location:'',source:'',destination:'',agencyName:'',mobileNo:'',price:''  });
  const [message, setTravelAgentMessage] = useState('');
  const [travelAgentName, setTravelAgentName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [travelAgentEmail, setTravelAgentEmail] = useState('');
  const [page, setPage] = useState(1);
 

  useEffect(() => {
    const travelerNameFromLocalStorage = localStorage.getItem('message');
    if (travelerNameFromLocalStorage) {
      setTravelAgentMessage(travelerNameFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const travelerNameFromLocalStorage = localStorage.getItem('travelAgentName');
    if (travelerNameFromLocalStorage) {
      setTravelAgentName(travelerNameFromLocalStorage);
    }
  }, []);

  
const perPage=5;

useEffect(() => {
  const travelerNameFromLocalStorage = localStorage.getItem('message');
  if (travelerNameFromLocalStorage) {
    setTravelAgentMessage(travelerNameFromLocalStorage);
  }

  if (travelerNameFromLocalStorage === 'You are active') {
    axios
      .get('https://localhost:7098/api/TouristPlaces')
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch tourist places:', error);
      });
  }
}, []);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDialogOpen = (type, data = {}) => {
    setDialogType(type);
    setDialogData(data);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTouristPlace({ touristName: '',touristDate:'',checkIn:'',checkOut:'',location:'',source:'',destination:'',agencyName:'',mobileNo:'',price:'' });
    
    setSelectedImage(null);
    setPage(1);
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTouristPlace({ ...newTouristPlace, [name]: value });
    setDialogData({ ...dialogData, [name]: value });
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  };

  const handleAddTouristPlace = async () => {
    try {
      
      const imageBase64 = selectedImage ? await convertImageToBase64(selectedImage) : null;

      
      const response = await axios.post(
        'https://localhost:7098/api/TouristPlaces',
        {
          TouristName: newTouristPlace.touristName,
          TouristDate:newTouristPlace.touristDate,
          CheckIn:newTouristPlace.checkIn,
          CheckOut:newTouristPlace.checkOut,
          Location:newTouristPlace.location,
          Source:newTouristPlace.source,
          Destination:newTouristPlace.destination,
          AgencyName:newTouristPlace.agencyName,
          MobileNo:newTouristPlace.mobileNo,
          Price:newTouristPlace.price,
          ImageData: imageBase64,
        }
      );

      setPlaces([...places, response.data]);
      setPage(Math.ceil(places.length / perPage));
      handleDialogClose();
      console.log('Successfully added:', response.data);
     
    } catch (error) {
      console.error('Error adding tourist place:', error);
     
    }
  };

  
  const handleUpdateTouristPlace = async () => {
    try {
      
      const updatedData = {
        TouristName: dialogData.touristName,
        TouristDate:dialogData.touristDate,
        CheckIn:dialogData.checkIn,
        CheckOut:dialogData.checkOut,
        Location:dialogData.location,
        Source:dialogData.source,
        Destination:dialogData.destination,
        AgencyName:dialogData.agencyName,
        MobileNo:dialogData.mobileNo,
        Price:dialogData.price,
        ImageFile: selectedImage, 
      };

      
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      
      const response = await axios.put(`https://localhost:7098/api/TouristPlaces/${dialogData.touristId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, 
      });

     
      const updatedPlaces = places.map((place) =>
        place.touristId === dialogData.touristId ? response.data : place
      );
      setPlaces(updatedPlaces);

      
      handleDialogClose();

      console.log('Successfully updated:', response.data);
      
    } catch (error) {
      console.error('Error updating tourist place:', error);
      
    }
  };

  const base64ToImageUrl = (base64Data) => `data:image/png;base64,${base64Data}`;

  const handleDeleteTouristPlace = (id) => {
    
    axios.delete(`https://localhost:7098/api/TouristPlaces/${id}`)
      .then(() => {
        const updatedPlaces = places.filter((place) => place.touristId !== id);
        setPlaces(updatedPlaces);
      })
      .catch((error) => {
        console.error('Failed to delete tourist place:', error);
      });
  };
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedtravelAgentEmail = localStorage.getItem('travelAgentEmail');
    if (storedtravelAgentEmail) {
      setTravelAgentEmail(storedtravelAgentEmail);
    }
  }, []);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
  };
 const navigate=useNavigate();
  const handleLogout = () => {
    
    
    navigate('/');
  };
  
  return (
    <div>
      <h1>Tourist Places</h1>
      <h1>Welcome {travelAgentName}!</h1>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="account" style={{top:-60,left:'50rem',height:'5rem',width:'5rem'}} onClick={handlePopoverOpen}>
            <AccountCircleIcon  style={{height:'3rem',width:'3rem'}}/>
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
      <Typography style={{fontWeight:'bold'}}>Name:{travelAgentName}</Typography>
      <Typography>Email: {travelAgentEmail}</Typography>
      <Typography style={{color:'#333399',fontWeight:'bold'}}>Status:{message}</Typography>
      <img src={img} alt='' style={{height:'30px',width:'30px',cursor:'pointer'}} onClick={handleLogout}></img>
    </div>
  </Paper>
          </Popover>
        </div>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen('add')}>
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold'}}>Place Name</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Image</TableCell>
              
              <TableCell style={{fontWeight:'bold'}}>Source</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Destination</TableCell>
              <TableCell style={{fontWeight:'bold'}}>CheckIn</TableCell>
              <TableCell style={{fontWeight:'bold'}}>CheckOut</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Location</TableCell>
              <TableCell style={{fontWeight:'bold'}}>TouristDate</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Agency Name</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Mobile No</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Price</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places.slice((page - 1) * perPage, page * perPage).map((place) => (
              <TableRow key={place.touristId}>
                <TableCell>{place.touristName}</TableCell>
                <TableCell>
                  <img src={base64ToImageUrl(place.imageData)} alt=" " style={{ maxWidth: '10rem', height: 'auto' }} />
                </TableCell>
                
                <TableCell>{place.source}</TableCell>
                <TableCell>{place.destination}</TableCell>
                <TableCell>{place.checkIn}</TableCell>
                <TableCell>{place.checkOut}</TableCell>
                <TableCell>{place.location}</TableCell>
                <TableCell>{place.touristDate}</TableCell>
                <TableCell>{place.agencyName}</TableCell>
                <TableCell>{place.mobileNo}</TableCell>
                <TableCell>Rs.{place.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDialogOpen('edit', place)}><EditIcon></EditIcon></Button>
                  <Button onClick={() => handleDeleteTouristPlace(place.touristId)} color="secondary"><DeleteIcon></DeleteIcon></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(places.length / perPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
     
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'add' ? 'Add New Tourist Place' : 'Edit Tourist Place'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="touristName"
            label="Tourist Name"
            value={dialogData.touristName || newTouristPlace.touristName}
            onChange={handleInputChange}
            fullWidth
          />
          
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />

<TextField
            autoFocus
            type="text"
            margin="dense"
            name="source"
            label="Source"
            value={dialogData.source || newTouristPlace.source}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            autoFocus
            type="text"
            margin="dense"
            name="destination"
            label="Destination"
            value={dialogData.destination || newTouristPlace.destination}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            autoFocus
            type="date"
            margin="dense"
            name="checkIn"
            label="Check In"
            value={dialogData.checkIn || newTouristPlace.checkOut}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            autoFocus
            type="date"
            margin="dense"
            name="checkOut"
            label="Check Out"
            value={dialogData.checkOut || newTouristPlace.checkOut}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            autoFocus
            type="text"
            margin="dense"
            name="location"
            label="Location"
            value={dialogData.location || newTouristPlace.location}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            autoFocus
            type="date"
            margin="dense"
            name="touristDate"
            label="Tourist Date"
            value={dialogData.touristDate || newTouristPlace.touristDate}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="agencyName"
            label="Agency Name"
            value={dialogData.agencyName || newTouristPlace.agencyName}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            name="mobileNo"
            label="Mobile No"
            value={dialogData.mobileNo || newTouristPlace.mobileNo}
            onChange={handleInputChange}
            fullWidth
          />

         <TextField
            autoFocus
            margin="dense"
            name="price"
            label="Price"
            value={dialogData.price || newTouristPlace.price}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {dialogType === 'add' ? (
            <Button onClick={handleAddTouristPlace} color="primary">
              Add
            </Button>
          ) : (
            <>
              <Button onClick={handleUpdateTouristPlace} color="primary">
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TouristPlaces;
