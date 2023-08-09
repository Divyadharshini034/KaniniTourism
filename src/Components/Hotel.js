import { useEffect, useState } from "react";
import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
const Hotel = ({ onSelectHotel,touristId }) => {
  const [hotels, setHotels] = useState([]);
  
  const handleSelectHotel = (hotelId,hotelName,hotelPrice, gst) => {
   
    onSelectHotel(hotelId,hotelName,hotelPrice, gst);
  };
 
  useEffect(() => {
   
    const fetchHotels = async () => {
      try {
        if (touristId) {
         
          const response = await fetch(`https://localhost:7144/api/Hotel/ByTouristId/${touristId}`);
          const data = await response.json();
          setHotels(data);
        } else {
          setHotels([]); 
        }
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };
    

    fetchHotels();
  }, [touristId]);

  const base64ToImageUrl = (base64Data) => `data:image/png;base64,${base64Data}`;

  return (
    <div>
      <h1>hotel page </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {hotels.map((hotel) => (
          <Card key={hotel.hotelId} variant="outlined" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CardContent>
              <h3>{hotel.hotelName}</h3>
              {hotel.hotelImage ? (
                <img src={base64ToImageUrl(hotel.hotelImage)} alt={hotel.hotelName} style={{ maxWidth: '10rem', height: 'auto' }} />
              ) : (
                <p>No image available.</p>
              )}
              <p>Price:{hotel.hotelPrice}</p>
              <p>Gst:{hotel.gst}</p>
              
              <Button variant="contained" color="primary" onClick={() => handleSelectHotel(hotel.hotelId,hotel.hotelName, hotel.hotelPrice, hotel.gst)}>Select</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
