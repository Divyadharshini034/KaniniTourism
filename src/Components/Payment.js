
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import paymen from './images/paym.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import sucess from './images/sus.png';
import Kanini from './images/klogo.jpg';
import jsPDF from "jspdf";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import locImage from './images/loc.png';


const Payment = ( ) => {
  const locations = useLocation();
  const { totalPrice, bookedTours, travelerName, selectedHotels,totalhotelprice, totaltourprice ,totalgst} = locations.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [ccv, setCCV] = useState('');
  const [paymentSuccessfulDialogOpen, setPaymentSuccessfulDialogOpen] = useState(false);
  const [expirationMonthError, setExpirationMonthError] = useState('');
  const [ccvError, setCCVError] = useState('');
  const [expirationYearError, setExpirationYearError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
 
  
  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value.slice(0, 16);

    if (!/^\d{16}$/.test(inputCardNumber)) {
      setCardNumberError('Invalid card number');
    } else {
      setCardNumberError('');
    }

    setCardNumber(inputCardNumber);
  };


  const handlePayNowClick = () => {
    
    if (
      cardNumber.trim() === '' ||
      expirationMonth.trim() === '' ||
      expirationYear.trim() === '' ||
      ccv.trim() === ''
    ) {
      
      return;
    }
  
    
    setPaymentSuccessfulDialogOpen(true);
  };
  

  const handlePaymentSuccessfulDialogClose = () => {
    setPaymentSuccessfulDialogOpen(false);
  };

 
  const [imageData, setImageData] = useState(null);
 
  useEffect(() => {
    fetch("https://media.licdn.com/dms/image/C4E0BAQFJKtwRJHEItg/company-logo_200_200/0/1556286612623?e=2147483647&v=beta&t=vs9y1efs-ql7nwRTdffAGAWBb3Fnt3f79d67ziEn2uM")
      .then((response) => response.blob())
      .then((blob) => {
        setImageData(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error("Failed to fetch image:", error);
      });
  }, []);

  const downloadBillingDetails = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageCenterX = pageWidth / 2;
      const imageWidth = 10; 
      const textWidth = doc.getStringUnitWidth("KaniniTourism") * doc.internal.getFontSize() / doc.internal.scaleFactor;

      let yPos = 30;

      
      if (imageData) {
        const imageX = pageCenterX - (imageWidth / 2);
        doc.addImage(imageData, "PNG", imageX, yPos - 15, imageWidth, 10); 
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      
      const textX = pageCenterX - (textWidth / 2);
      doc.text("KaniniTourism", textX, yPos);
      doc.text(`Billing Details for ${travelerName}:`, 15, yPos + 10);
      yPos += 20;
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
  
      bookedTours.forEach((tour) => {
        doc.text(`Tourist Name: ${tour.touristName}, Price: Rs${tour.price}`, 15, yPos);
        yPos += 7;
    
        
        const locImageWidth = 3; 
        const locImageX = pageWidth - 15 - locImageWidth; 
        doc.addImage(locImage, "PNG", locImageX, yPos - 7, locImageWidth, 7);
        doc.text(`Location: ${tour.location}`, 15, yPos);
      
        yPos += 7;
      });
  
      selectedHotels.forEach((hotel) => {
        doc.text(`Hotel Name: ${hotel.hotelName}, Price: Rs${hotel.hotelPrice}, Gst: Rs${hotel.gst}`, 15, yPos);
        yPos += 7;
      });
  
      yPos += 5;
      doc.text(`Total Price for Tour: Rs${totaltourprice}`, 15, yPos);
      yPos += 5;
      doc.text(`Total Price for Hotel: Rs${totalhotelprice}`, 15, yPos);
      yPos += 5;
      doc.text(`Total Gst: Rs${totalgst}`, 15, yPos);
      yPos += 5;
      doc.text(`Total Price: Rs${totalPrice}`, 15, yPos);
  
      doc.save("billing_details.pdf");
    } catch (error) {
      console.error("Failed to download billing details:", error);
    }
  };
  

  const handleExpirationMonthChange = (event) => {
    const inputMonth = event.target.value.slice(0, 2);

    if (!/^(0[1-9]|1[0-2])$/.test(inputMonth)) {
      setExpirationMonthError('Invalid month (01-12)');
    } else {
      setExpirationMonthError('');
    }

    setExpirationMonth(inputMonth);
  };

  const handleCCVChange = (event) => {
    const inputCCV = event.target.value.slice(0, 3);

    if (!/^\d{3}$/.test(inputCCV)) {
      setCCVError('CCV must be a 3-digit number');
    } else {
      setCCVError('');
    }

    setCCV(inputCCV);
  };

  const handleExpirationYearChange = (event) => {
    const inputYear = event.target.value.slice(0, 4);

    if (!/^\d{4}$/.test(inputYear)) {
      setExpirationYearError('Invalid year');
    } else {
      setExpirationYearError('');
    }

    setExpirationYear(inputYear);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120vh',

      }}
    >
      
      <br></br><br></br>
      <Card variant="outlined" style={{ padding: '10px', height: '33rem', width: '30rem' ,border: '4px solid #3f51b5'}}>
        <CardContent>
          <Typography style={{fontWeight:'bold',fontSize:"1.7rem"}}><img src={Kanini} alt=" " style={{ maxWidth: '100%', height: '30px' }} />Kanini Tourism</Typography>
        
          <Typography variant="h5"  style={{ fontWeight: 'bold' }}>Payment</Typography>
          <Typography variant="h5" style={{ fontSize:'20px' }}>Provide your Card Details</Typography>
          <img src={paymen} alt=" " style={{ maxWidth: '100%', height: '150px' }} />

          {totalPrice && <Typography variant="body1">Total Price: ${totalPrice}</Typography>}

          <TextField
        label="Card Number"
        variant="outlined"
        value={cardNumber}
        onChange={handleCardNumberChange}
        inputProps={{
          maxLength: 16,
        }}
        error={!!cardNumberError}
        helperText={cardNumberError}
        fullWidth
        style={{ marginTop: '10px' }}
      />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <TextField
  label="Expiration Month"
  variant="outlined"
  value={expirationMonth}
  onChange={handleExpirationMonthChange}
  inputProps={{
    maxLength: 2,
  }}
  error={!!expirationMonthError}
  helperText={expirationMonthError}
/>

<TextField
  label="CCV"
  variant="outlined"
  value={ccv}
  onChange={handleCCVChange}
  inputProps={{
    maxLength: 3,
  }}
  error={!!ccvError}
  helperText={ccvError}
/>

<TextField
  label="Expiration Year"
  variant="outlined"
  value={expirationYear}
  onChange={handleExpirationYearChange}
  inputProps={{
    maxLength: 4,
  }}
  error={!!expirationYearError}
  helperText={expirationYearError}
/>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button color="primary" variant="contained" onClick={handlePayNowClick}>
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={paymentSuccessfulDialogOpen} onClose={handlePaymentSuccessfulDialogClose}>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={Kanini} alt=" " style={{ maxWidth: '100%', height: '70px' }} />
      </DialogContent>
        <DialogTitle  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Payment Successful</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={sucess} alt="Payment Successful" style={{ maxWidth: '100%', height: '100px' }} />
          <Typography variant="body1">Thank you for your payment!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={downloadBillingDetails} color="primary">
            Download Billing Details
          </Button>
          <Button onClick={handlePaymentSuccessfulDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payment;
