import React, { useState } from "react";
import {
  
  Container,
  Button,
  Card,
  CardContent,

 
} from "@mui/material";


import Slider from 'react-slick';

import { dataDigitalBestSeller } from './data';
import imgGirl from './images/homestay.png';


import Carousel from 'react-bootstrap/Carousel'


import kanini from './images/klogo.jpg'

const FirstPage = () => {


  

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
   <div style={{minHeight:'100vh'}}>
    <Container
      sx={{
        
        backgroundColor: "#2d2d86",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
      
    >
      
    
      <Card sx={{
        backgroundColor: "#ffffff",
        borderRadius: 4,
        mt: 15,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
     
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        
       
       
        <CardContent style={{ flex: 1, "@media (max-width: 768px)": {
      
      textAlign: 'center',
    },  }}>
        <h1> <img src={kanini} alt="" style={{width:'2rem',height:'2rem'}}></img>Kanini Tourism</h1>
          <p>
            Travel makes one modest. You see what a tiny place you occupy in the world. See the world. It's more fantastic than any dream made or paid for in factories. Ask for no guarantees, ask for no security.
            Life is either a daring adventure or nothing at all.Take only memories, leave your footprints🦋...
          </p>
          <Button variant="contained" color="primary">Explore More</Button>
        </CardContent>
       
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem' ,width:'30rem'}}>
            <Carousel>
          <Carousel.Item>
            <img src="https://www.holidify.com/images/cmsuploads/compressed/Jammu915x686_20201109135701.jpg" alt="Kanini Tourist" style={{ width: '80%', height: 'auto' }} />
            </Carousel.Item>
            <Carousel.Item>
             <img src="https://www.holidify.com/images/cmsuploads/compressed/800px-Basilica_of_Bom_Jesus2C_old_goa_20191227102244.JPG" alt="Kanini Tourist" style={{ width: '80%', height: 'auto' }} />
             </Carousel.Item>
             <Carousel.Item>
             <img src="https://www.holidify.com/images/cmsuploads/compressed/36230761993_6a1f86800f_c_d_20191128071449.jpg" alt="Kanini Tourist" style={{ width: '80%', height: 'auto' }} />
             </Carousel.Item>
             <Carousel.Item>
             <img src="https://www.holidify.com/images/bgImages/INDIA.jpg" alt="Kanini Tourist" style={{ width: '80%', height: 'auto' }} />
             </Carousel.Item>
             <Carousel.Item>
             <img src="https://www.holidify.com/images/cmsuploads/compressed/1421489794NandaDeviandValleyofFlowersNationalParks_20201109134832.jpg" alt="Kanini Tourist" style={{ width: '80%', height: 'auto' }} />
             </Carousel.Item>
             </Carousel>
            </div>
          
        
       
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
<div
        style={{
          backgroundColor: "#303030",
          color: "#fff",
          textAlign: "center",
          padding: "10px",
          position: "absolute",
          bottom: -1600,
          left: 0,
          right: 0,
          display: "grid",
         
          gridTemplateColumns: "1fr 1fr 1fr",
          height:'250px'
        }}
      >
      
        <div style={{ marginBottom: "20px" }}>
          <h2>Our Services</h2>
          <p>Travel Packages</p>
          <p>International Packages</p>
          <p>offers</p>
          <p>Contact Us</p>
        </div>

        
        <div style={{ marginBottom: "20px" }}>
          <h2>Contact Us</h2>
          <p>Email: Kaninitourism@kanini.com</p>
        </div>

       
        <div style={{ marginBottom: "20px" }}>
          <h2>Industries</h2>
          <p>Banking Financial Services & Insurance</p>
          <p>Healthcare</p>
          <p>Energy & Utilities</p>
          <p>Government</p>
          <p>Technology Media & Communications</p>
        </div>

       
        <div
          style={{
            gridColumn: "1 / span 3",
            marginTop: "20px",
          }}
        >
          <h2>Follow Us</h2>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>LinkedIn</p>
        </div>
      </div>
       
    </Container>
    </div>
    
  );
};

export default FirstPage;
