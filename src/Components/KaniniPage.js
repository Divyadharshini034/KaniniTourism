import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem
 
} from "@mui/material";

import hotel from './images/hhh.png';
import homestay from './images/homestay.png';
import holiday from './images/holiday.png';
import taxi from './images/taxi.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { dataDigitalBestSeller } from './data';
import imgGirl from './images/homestay.png';


import Carousel from 'react-bootstrap/Carousel'
import NavbarKanini from "./NavbarKanini";
import { useNavigate } from "react-router-dom";
const KaniniPage = () => {
  
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  
  
  const [sourcesList, setSourcesList] = useState([]);
  const [destinationsList, setDestinationsList] = useState([]);
  const history = useNavigate();


  useEffect(() => {
    axios
      .get("https://localhost:7098/api/TouristPlaces")
      .then((response) => {
        const sources = response.data.map((place) => place.source);
        const destinations = response.data.map((place) => place.destination);
  
       
        const uniqueSources = [...new Set(sources)].sort();
        const uniqueDestinations = [...new Set(destinations)].sort();
  
        setSourcesList(uniqueSources);
        setDestinationsList(uniqueDestinations);
      })
      .catch((error) => {
        console.error("Failed to fetch tourist places:", error);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    history(`/traveler?source=${source}&destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };
 
  
  return (
   
    <Container
      sx={{
        backgroundImage: `url('https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/01/13092609/Untitled-design-62.jpg')`,
         backgroundColor: "#003399",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
      
    >
      <NavbarKanini></NavbarKanini>
      <br></br><br></br><br></br>
     
      <Card sx={{ backgroundColor: "#ffff", borderRadius: 4, position: "absolute", top: 70, right: 475, height: '5.5rem', width: '19rem' }}>
  <CardContent>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <div>
        <img src={hotel} alt=" " style={{ height: '50px', marginRight: '8px' }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>Hotel</Typography>
      </div>
      <div style={{ marginLeft: '8px' }}>
        <img src={holiday} alt=" " style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>Holiday</Typography>
      </div>
      <div style={{ marginLeft: '8px' }}>
        <img src={homestay} alt=" " style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>Homestay</Typography>
      </div>
      <div style={{ marginLeft: '8px' }}>
        <img src={taxi} alt=" " style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>TaxiCab</Typography>
      </div>
    </Box>
  </CardContent>
</Card>


    
      <Card sx={{ backgroundColor: "#ffffff", borderRadius: 4, mt: 2}}>
        <CardContent style={{alignItems:'center'}}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center"  }}>
            Plan Your Trip
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
  label="Source"
  variant="outlined"
  fullWidth
  margin="dense"
  value={source}
  onChange={(e) => setSource(e.target.value)}
  select 
>
  {sourcesList.map((sourceItem) => (
    <MenuItem key={sourceItem} value={sourceItem}>
      {sourceItem}
    </MenuItem>
  ))}
</TextField>

<TextField
  label="Destination"
  variant="outlined"
  fullWidth
  margin="dense"
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
  select 
>
  {destinationsList.map((destinationItem) => (
    <MenuItem key={destinationItem} value={destinationItem}>
      {destinationItem}
    </MenuItem>
  ))}
</TextField>




            <TextField
            type='date'
        label="Destination"
        variant="outlined"
        fullWidth
        margin="dense"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />


            <TextField
            type="date"
        label="Destination"
        variant="outlined"
        fullWidth
        margin="dense"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
            

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Box>
          </form>
        </CardContent>
      </Card>


<Card sx={{ position: "absolute", bottom: -450, right: 'rem',width:'73rem',height:'22rem' }}>
  <CardContent>
<Carousel >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://karnatakatourism.org/wp-content/uploads/2020/06/P10-gallery.jpg"
          alt=""
          style={{width:'20rem',height:'20rem'}}
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-thailand-grand-palace-tourist-attractions-image_999889.jpg"
          alt=""
          style={{width:'20rem',height:'20rem'}}
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/1200x/7d/66/14/7d661478068ccfc5651854cc435a410f.jpg"
          alt="" style={{width:'20rem',height:'20rem'}}
        />
       
      </Carousel.Item>
    </Carousel>
    </CardContent>
</Card>
<Card sx={{ backgroundColor:' #003399', position: "absolute", bottom: -900, right: 'rem',width:'75rem',height:'26rem' }}>
  <CardContent style={{alignItems:'center',width:'73rem',justifyContent:'space-between'}}>
    <h3 style={{display:'flex'}}>Explore the Unexplored</h3>
  <div className="App" >
      <Slider {...settings} >
        {dataDigitalBestSeller.map((item) => (
          <div className="card"   >
            <div className="card-top" >
              <CardContent >
              <img
                src={
                  defaultImage[item.title] === item.title
                    ? defaultImage.linkDefault
                    : item.linkImg
                }
                alt={item.title}
                onError={handleErrorImage}
                style={{width:'12rem',height:'12rem'}}

              />
             </CardContent>
            </div>
            <div className="card-bottom">
              <h3>{item.title}</h3>
              <span className="category"></span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </CardContent>
</Card>

<Card sx={{  position: "absolute", bottom: -1300, right: 'rem',width:'73rem',height:'21rem' }}>
  <CardContent style={{alignItems:'center',width:'73rem'}}>
    <h1 style={{display:'flex'}}>Jackpot Deals on Top Selling Packages</h1>
  <div className="App" >
      <Slider {...settings} >
       
              <CardContent >
              <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://tourwithrahul.com/wp-content/uploads/2020/07/humayun-s-tomb-under-blue-sky-3672388-scaled.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>
             <CardContent  >
                <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://globalgrasshopper.com/wp-content/uploads/2011/01/Mumbai-India-scaled.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>
             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://lh3.googleusercontent.com/VDPp6VUWdRyP3NjQjIcKUJc8M58XLQBRqNcxAJ8ID0KRRCprBl4G-a1VLg6kdHKDJncxmxPnxZo9QGPuHUvCMBAni2VxQ0EjfSvlvQHE=w1000?s=300" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>

             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://www.fabhotels.com/blog/wp-content/uploads/2016/02/dal-lake.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>

             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://c4.wallpaperflare.com/wallpaper/172/921/248/nature-water-sea-travel-wallpaper-preview.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>

             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://wildlifezones.com/wp-content/uploads/2020/10/A-Beautiful-Beach-in-Goa-1024x683.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>

             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-gateway-of-india-mumbai.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>

             <CardContent >
             <Card style={{height:'12rem',width:'10rem'}}>
             <img src="https://www.tourmyindia.com/blog/wp-content/uploads/2021/03/Best-Places-to-Visit-in-Kerala.jpg" alt="" style={{height:'12rem',width:'10rem'}}></img>
              </Card>
             </CardContent>
           
           
         
        
      </Slider>
    </div>
    </CardContent>
</Card>

    </Container>
   
    
  );
};

export default KaniniPage;
