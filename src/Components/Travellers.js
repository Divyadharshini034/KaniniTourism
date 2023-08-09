// src/Travellers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import authService from '../AuthService';
import { Dialog,TextField,Avatar, DialogActions, DialogContent, DialogTitle,IconButton,Pagination } from '@mui/material';
import homestay from './images/homestay.png'
import { useLocation, useNavigate } from "react-router-dom";
import Hotel from './Hotel';
import hot from './images/hot.png';
import cal from './images/cal.png';
import erase from './images/era.png';
import loc from './images/loc.png'
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import BackspaceIcon from '@mui/icons-material/Backspace';
import rem from './images/rem.png';
import call from './images/phone.png';
import rup from './images/rupee.png';
import spy from './images/spy.png';
const Travellers = () => {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPass, setTravelerPass] = useState('');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedTouristName, setSelectedTouristName] = useState('');
  const [selectedTouristId, setSelectedTouristId] = useState('');
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('');
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedTouristDetails, setSelectedTouristDetails] = useState({});
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [bookedTours, setBookedTours] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [filteredTouristPlaces, setFilteredTouristPlaces] = useState([]);
  const [touristIdForHotel, setTouristIdForHotel] = useState('');
  const [updatedTravelerName, setUpdatedTravelerName] = useState(travelerName);
  const [updatedTravelerEmail, setUpdatedTravelerEmail] = useState(travelerEmail);
  const [updatedTravelerPass, setUpdatedTravelerPass] = useState(travelerPass);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source') || '';
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  
  const [editMode, setEditMode] = useState(false);

const [openHotelDialog, setOpenHotelDialog] = useState(false);
const [selectedTouristNameForHotel, setSelectedTouristNameForHotel] = useState('');

const navigate=useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const travelerNameFromLocalStorage = localStorage.getItem('travelerName');
    const travelerEmailFromLocalStorage = localStorage.getItem('travelerEmail');
    const travelerPassword=localStorage.getItem('travelerPass');
    if (travelerNameFromLocalStorage) {
      setTravelerName(travelerNameFromLocalStorage);
    }
    if (travelerEmailFromLocalStorage) {
      setTravelerEmail(travelerEmailFromLocalStorage);
    }
    if(travelerPassword){
      setTravelerPass(travelerPassword);
    }
  }, []);
 
  

  useEffect(() => {
    axios
      .get(`https://localhost:7098/api/TouristPlaces/Search?source=${source}&destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`)
      .then((response) => {
        setTouristPlaces(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch tourist places:', error);
      });
  }, [source,destination,checkIn,checkOut]);


  
useEffect(() => {
  if (searchQuery.trim() === '') {
   
    setFilteredTouristPlaces(touristPlaces);
  } else {
    
    const filteredPlaces = touristPlaces.filter(place =>
      place.touristName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTouristPlaces(filteredPlaces);
  }
}, [searchQuery, touristPlaces]);


  const base64ToImageUrl = (base64Data) => `data:image/png;base64,${base64Data}`;

  const handleBookTour = async (touristId) => {
    setSelectedTouristId(touristId);
    const selectedTourist = touristPlaces.find((place) => place.touristId === touristId);
    if (selectedTourist) {
      setSelectedTouristName(selectedTourist.touristName);
      
      setOpenPaymentDialog(true);
  
      setSelectedTouristDetails({
        touristName: selectedTourist.touristName,
        touristDate: selectedTourist.touristDate,
        agencyName: selectedTourist.agencyName,
        mobileNo: selectedTourist.mobileNo,
        price: selectedTourist.price,
      });
  
     
      setBookedTours([...bookedTours, selectedTourist]);
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedTourist.price);
    }
  };
  

  const handlePaymentDialogClose = () => {
    
    const lastAddedTour = bookedTours[bookedTours.length - 1];
    setBookedTours((prevBookedTours) => prevBookedTours.slice(0, -1));
    setTotalPrice((prevTotalPrice) => prevTotalPrice - lastAddedTour.price);

    setOpenPaymentDialog(false);
  };


  const handlePaymentSubmit = async () => {
    try {
      await authService.bookTourByTouristId(selectedTouristId, travelerName, travelerEmail, travelerPass);
      setBookingStatus('Booked successfully');
      
     
      setOpenPaymentDialog(false);
     
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const handleHotelSelection = (hotelId, hotelName, hotelPrice, gst) => {
   


    setSelectedHotels((prevSelectedHotels) => [
      ...prevSelectedHotels,
      { hotelName, hotelPrice, gst },
    ]);
  };
  const handlepay = async () => {
    try {
      setOpenPaymentDialog(false);
  
      
      const totalPriceWithHotel = totalPrice + selectedHotels.reduce((acc, hotel) => acc + parseFloat(hotel.hotelPrice) + parseFloat(hotel.gst), 0)
      const selectedhotelprice=selectedHotels.reduce((acc, hotel) => acc + parseFloat(hotel.hotelPrice) + parseFloat(hotel.gst), 0)
      const totalgstforhotel=selectedHotels.reduce((acc, hotel) => acc + parseFloat(hotel.gst), 0);
      const totalPriceforTour=totalPrice;
      navigate("/pay", {
        state: {
          totalPrice: totalPriceWithHotel, 
          selectedTouristDetails,
          travelerName,
          location,
          bookedTours,
          selectedHotels,
          totalhotelprice: selectedhotelprice,
         totaltourprice: totalPriceforTour,
         totalgst: totalgstforhotel
        },
      });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };
  
  

  const handleUserButtonClick = () => {
    setEditMode(false);
    setOpenUserDialog(true);
  };

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
  };

  

  const handleHotelNearbyClick = (touristName, touristId) => {
    setSelectedTouristNameForHotel(touristName);
    setOpenHotelDialog(true);
    setTouristIdForHotel(touristId); 
  };
  
  
  const handleUserEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      await axios.put(`https://localhost:7098/api/Travelers/UpdateTraveler/${travelerName}`, {
        travelerName: updatedTravelerName,
        travelerEmail: updatedTravelerEmail,
        travelerPass: updatedTravelerPass,
      });
     

      localStorage.setItem('travelerName', updatedTravelerName);
      localStorage.setItem('travelerEmail', updatedTravelerEmail);
      localStorage.setItem('travelerPass', updatedTravelerPass);
      setEditMode(true);

      setOpenUserDialog(false);
    } catch (error) {
      console.error('Failed to update traveler:', error);
    }
  };
  
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTouristPlaces.slice(indexOfFirstItem, indexOfLastItem);

 
  const totalPages = Math.ceil(filteredTouristPlaces.length / itemsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: ' #4da6ff' }}>
      <h1>Book a Tour</h1>
      <h1>Welcome, {travelerName}!</h1>

      <div style={{ marginBottom: '20px' }}>
        <Card>
          <CardContent style={{display:'flex',alignItems: 'center'}}>
  <TextField
    type="text"
    label="Search by tourist name..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ marginRight: '5px' }}
  />
  <img src={erase} alt='' style={{ height: '2rem', width: '2rem' ,cursor: 'pointer'}} onClick={() => setSearchQuery('')} ></img>
  </CardContent>
  </Card>
</div>

     
      <IconButton
        edge="end"
        color="inherit"
        aria-label="user"
        onClick={handleUserButtonClick}
        style={{ position: 'absolute', top: 120, right: 80 }}

      >
       
       <Avatar src={homestay} alt="User Profile" style={{ border: '1.5px solid #000', borderRadius: '50%',height:'3rem',width:'3rem' }} />
      </IconButton>
     

      <div style={{ display: 'center', }}>
        <Card style={{ display:'center',height:'55rem',width:'50rem',padding:'1rem'}}>
          <CardContent style={{fontWeight:'bold',fontSize:'2rem'}}>Tour Places in {destination}</CardContent>
        {currentItems.map((place) => (
           <Card key={place.touristId} variant="outlined" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <CardContent>
        <img src={base64ToImageUrl(place.imageData)} alt=" " style={{ maxWidth: '10rem', height: 'auto' }} />
      </CardContent>
      <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  <div style={{ flex: 1 }}>
    <Typography variant="h7" component="div">
      <img src={rem} alt='' style={{ height: '1rem', width: '1rem' }} /> Name: {place.touristName}
    </Typography>
    <Typography variant="h7" component="div">
      <img src={cal} alt='' style={{ height: '1rem', width: '1rem' }} /> Date: {place.touristDate}
    </Typography>
    <Typography variant="h7" component="div">
      <img src={spy} alt='' style={{ height: '1rem', width: '1rem' }} /> AgencyName: {place.agencyName}
    </Typography>
  </div>
  <div style={{ flex: 1 }}>
    <Typography variant="h7" component="div">
      <img src={call} alt='' style={{ height: '1rem', width: '1rem' }} /> Mobile No: {place.mobileNo}
    </Typography>
    <Typography variant="h7" component="div">
      <img src={rup} alt='' style={{ height: '1rem', width: '1rem' }} /> Rs.{place.price}
    </Typography>
    <Typography variant="h7" component="div">
      <img src={loc} alt='' style={{ height: '1rem', width: '1rem' }} /> {place.location}
    </Typography>
  </div>
</CardContent>

            <CardContent  style={{ display: 'flex', flexDirection: 'column' }} >
           
 <img src={hot} alt='' style={{ height: '2rem', width: '2rem',cursor:'pointer' }} onClick={() => handleHotelNearbyClick(place.touristName,place.touristId)}></img>


              <Button variant="contained" color="primary" onClick={() => handleBookTour(place.touristId)}>
                Book+
              </Button>
            </CardContent>
          </Card>
          
        ))}
</Card>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </div>


      {bookingStatus && <p>{bookingStatus}</p>}

      
       <Dialog open={openPaymentDialog} onClose={handlePaymentDialogClose}>
        <DialogTitle>Payment Details {selectedTouristName} </DialogTitle>
        <DialogContent>
        <div>
            <Typography variant="h5">Booking Summary:</Typography>
            {bookedTours.map((tour, index) => (
              <div key={index}>
                <Typography variant="h6">{index + 1}.Tour Name:{tour.touristName}</Typography>
                <Typography variant="body1">Price: ${tour.price}</Typography>
                <Typography variant="body1">Tour Date: {tour.touristDate}</Typography>
                <Typography variant="body1">Tour Location: {tour.location}</Typography>
                <h5>Contact Details</h5>
                <Typography variant="body1">AgencyName: {tour.agencyName}</Typography>
                <Typography variant="body1">Mobile No: {tour.mobileNo}</Typography>
              </div>
              
            ))}
             <Typography variant="h5">Total Price for Tour: ${totalPrice}</Typography>

             
            {selectedHotels.length > 0 && (
              <div>
                <Typography variant="h5">Selected Hotels:</Typography>
                {selectedHotels.map((hotel, index) => (
                  <div key={index}>
                    <Typography variant="h6">{index + 1}.{hotel.hotelName}</Typography>
                    <Typography variant="body1">Hotel Price: ${hotel.hotelPrice}</Typography>
                    <Typography variant="body1">GST: ${hotel.gst}</Typography>
                  </div>
                ))}
              </div>
            )}
 <Typography variant="h5">Total Price for Selected Hotels: ${selectedHotels.reduce((acc, hotel) => acc + parseFloat(hotel.hotelPrice) + parseFloat(hotel.gst), 0)}</Typography>
 <Typography variant="h5">Total Grand Price: ${totalPrice + selectedHotels.reduce((acc, hotel) => acc + parseFloat(hotel.hotelPrice) + parseFloat(hotel.gst), 0)}</Typography>
          </div>
         
         
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} color="primary">
           Add Tour
          </Button>
          <Button onClick={handlepay} color="primary">
            Book Now
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUserDialog} onClose={handleUserDialogClose} style={{ top: 120, right: -900 }}>
  <DialogTitle style={{ display: 'center' }}>Your Details</DialogTitle>
  <DialogContent>
    <Card style={{ height: '20rem', width: '20rem' }}>
      <CardContent>
        <form onSubmit={handleUserEditSubmit}>
        <TextField
  type="text"
  label="Your Name"
  value={travelerName}
  onChange={(e) => setUpdatedTravelerName(e.target.value)}
  required
  fullWidth
  margin="dense"
  disabled
/>
<TextField
  type="email"
  label="Your Email"
  value={editMode ? updatedTravelerEmail : travelerEmail}
  onChange={(e) => setUpdatedTravelerEmail(e.target.value)}
  required
  fullWidth
  margin="dense"
  disabled={!editMode}
/>
<TextField
  type="password"
  label="Your Password"
  value={editMode ? updatedTravelerPass : travelerPass}
  onChange={(e) => setUpdatedTravelerPass(e.target.value)}
  required
  fullWidth
  margin="dense"
  disabled={!editMode}
/>
          <DialogContent>
            <Button variant="contained" onClick={handleUserDialogClose} style={{marginRight:'1rem'}}>
              <BackspaceIcon></BackspaceIcon>
             
            </Button>
            <Button variant="contained" onClick={handleUserEditSubmit} style={{marginRight:'1rem'}}>
              <SaveAsIcon></SaveAsIcon>
             
            </Button>
            <Button variant="contained" onClick={() => setEditMode(true)}>
              <EditIcon></EditIcon>
            
            </Button>
          </DialogContent>
        </form>
      </CardContent>
    </Card>
  </DialogContent>
</Dialog>


      <Dialog open={openHotelDialog} onClose={() => setOpenHotelDialog(false)}>
  <DialogTitle>Hotels Near {selectedTouristNameForHotel}</DialogTitle>
  <DialogContent>
   
    <Hotel onSelectHotel={handleHotelSelection} touristId={touristIdForHotel}  />
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Travellers;
