// src/TouristPlaceCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TouristPlaceCard = ({ place }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {place.touristName}
        </Typography>
       
      </CardContent>
    </Card>
  );
};

export default TouristPlaceCard;
