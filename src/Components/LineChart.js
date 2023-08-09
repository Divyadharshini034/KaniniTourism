
import React,{useState} from 'react';
import { Card, Carousel,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { CardContent, Typography ,Box} from '@mui/material';
import kanini from './images/klogo.jpg'
import world from './images/world.gif';
import a from './images/A.mp4';
import feed from './images/Feed.gif'
import mail from './images/mail.gif'
import phone from './images/phone.gif'
import hotel from './images/hhh.png';
import homestay from './images/homestay.png';
import holiday from './images/holiday.png';
import taxi from './images/taxi.png';
const LineChart = () => {

  const carouselStyles = `
  /* src/components/ImageCarousel.css */
  .carousel-root {
    max-width: ; /* Adjust as needed */
    margin: 10 auto;
    height:30rem;
  }
  
  .carousel-inner {
    overflow: hidden;
    border-radius: 8px;
  }
  
  .slider-slide {
    transition: transform 0.5s ease;
  }
  
  /* Media Queries */
  @media (max-width: 768px) {
    .carousel-root {
      max-width: 100%; /* Adjust as needed */
      padding: 0 15px; /* Add some padding on smaller screens */
    }
  }
  
  /* Set Height and Width */
  .carousel-root {
    width: 100%; /* Set the width to 100% */
    height: 400px; /* Set the height as desired */
  }
  
  @media (max-width: 768px) {
    .carousel-root {
      height: 300px; /* Adjust height for smaller screens */
    }
  }
  .card-slider {
    max-width: 800px; /* Adjust as needed */
    margin: 0 auto;
  }

  .card-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px; /* Set the slide height as desired */
  }

  .card-columns {
    column-count: 3; /* Adjust as needed */
    gap: 1rem; /* Adjust the gap between cards */
  }

  .card {
    /* Adjust card styles */
    width: 100%; /* Full width within the column */
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0;
  }

  .card-body {
    padding: 20px;
  }

  .card img {
    object-fit: cover;
    height: 200px; /* Set image height */
    border-radius: 8px 8px 0 0;
  }

  
  `;

  const cardImages = [
    'https://c4.wallpaperflare.com/wallpaper/172/921/248/nature-water-sea-travel-wallpaper-preview.jpg',
    'https://e0.pxfuel.com/wallpapers/240/673/desktop-wallpaper-anantara-seminyak-bali-resort-hotels-travel-leisure.jpg',
    'https://karnatakatourism.org/wp-content/uploads/2020/06/P10-gallery.jpg',
    'https://c4.wallpaperflare.com/wallpaper/537/664/855/nature-water-mountains-trees-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/1000/732/59/spring-8k-uhd-8k-asia-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/127/310/423/cityscape-night-hallstatt-see-lake-chruch-wallpaper-preview.jpg',
  'https://c4.wallpaperflare.com/wallpaper/787/399/647/life-resort-travel-vacation-wallpaper-preview.jpg',
  'https://c4.wallpaperflare.com/wallpaper/313/933/99/sunset-the-city-france-paris-wallpaper-preview.jpg',
  'https://c4.wallpaperflare.com/wallpaper/878/961/175/nature-landscape-beach-tropical-wallpaper-preview.jpg'

  ];

  

  
  const cardsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(cardImages.length / cardsPerPage));
  };

  const displayedCards = cardImages.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);
  return (
    <div>
    <style>{carouselStyles}</style>
    <br></br><br></br>
    <CardContent></CardContent>
    <CardContent></CardContent>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ height: '6rem', width: '20rem',backgroundColor:'#255E95' }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div>
              <img src={hotel} alt="Hotel" style={{ height: '50px', marginRight: '8px' }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>Hotel</Typography>
            </div>
            <div style={{ marginLeft: '8px' }}>
              <img src={holiday} alt="Holiday" style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>Holiday</Typography>
            </div>
            <div style={{ marginLeft: '8px' }}>
              <img src={homestay} alt="Homestay" style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>Homestay</Typography>
            </div>
            <div style={{ marginLeft: '8px' }}>
              <img src={taxi} alt="TaxiCab" style={{ maxWidth: '100%', height: '50px', marginRight: '8px' }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>TaxiCab</Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
   
    <CardContent>
   
      <Card
        style={{
          height: '25rem',
          width: '70rem',
          display: 'flex',
          flexDirection: 'row',
          margin: '0 auto',
          backgroundColor:'#B6DCFE',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: '100%',
          },
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            '@media (max-width: 768px)': {
              padding: '1rem',
            },
          }}
        >
          <h1>
            <img src={kanini} alt="" style={{ width: '2rem', height: '2rem' }} />
            Kanini Tourism
          </h1>
          <CardContent style={{ width: '20rem' ,maxWidth:'100%'}}>
            Travel makes one modest. You see what a tiny place you occupy in the world. See the
            world. It's more fantastic than any dream made or paid for in factories. Ask for no
            guarantees, ask for no security. Life is either a daring adventure or nothing at all.
            Take only memories, leave your footprints🦋...
            <Button variant="contained" color="primary">
              Explore More
            </Button>
          </CardContent>
        </CardContent>
        <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <video
            autoPlay
            loop
            muted
            style={{ maxWidth:'100%',width:'38rem', height: 'auto', '@media (max-width: 768px)': { height: '20rem' } }}
          >
            <source src={a} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
    </CardContent>
    <CardContent></CardContent>
    <div > 
    <Card  style={{
             height: '4rem',
             width: '70rem',
             display: 'flex',
             backgroundColor: '#EC56ACCC',
             justifyContent: 'center',
             alignItems: 'center',
             textAlign: 'center',
             
             
             '@media (max-width: 768px)': {
               width: '90%',
               margin: '0 auto',
             },
           }}
         
        > 
    <h1>Explore your Journey</h1>
    </Card>
    </div>
    <CardContent></CardContent>
    <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showIndicators={true} showStatus={false} showThumbs={false} className="carousel-root">
      <Carousel.Item className="slider-slide">
        <img
          className="d-block w-100"
          src="https://as2.ftcdn.net/v2/jpg/04/65/46/63/1000_F_465466372_aHqnt07beBhxYr7TvBMJ2UouvuPr5DVw.jpg"
          alt=""
          style={{ height: '25rem', width: '20rem' }}
        />
      </Carousel.Item>
      <Carousel.Item className="slider-slide">
        <img
          className="d-block w-100"
          src="https://www.holidify.com/images/bgImages/SRI-LANKA.jpg"
          alt=""
          style={{ height: '25rem', width: '20rem' }}
        />
      </Carousel.Item>
      <Carousel.Item className="slider-slide">
        <img
          className="d-block w-100"
          src="https://www.holidify.com/images/bgImages/MALDIVES.jpg"
          alt=""
          style={{ height: '25rem', width: '20rem' }}
        />
      </Carousel.Item>
      <Carousel.Item className="slider-slide">
        <img
          className="d-block w-100"
          src="https://www.holidify.com/images/bgImages/INDIA.jpg"
          alt=""
          style={{ height: '25rem', width: '20rem' }}
        />
      </Carousel.Item>
      <Carousel.Item className="slider-slide">
        <img
          className="d-block w-100"
          src="https://www.holidify.com/images/cmsuploads/compressed/11340303815_28cb16d946_o(1)_20191211104253.jpg"
          alt=""
          style={{ height: '25rem', width: '20rem' }}
        />
      </Carousel.Item>
    </Carousel>
    
    <CardContent></CardContent>
    <Card style={{backgroundColor:'#EC56ACCC'}}>
    <h1>Jackpot Deals on Top Selling Packages</h1>
    </Card>
    <CardContent></CardContent>
    <div className="card-slider">
      <div className="card-columns">
        {displayedCards.map((image, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={image} alt={`Card ${index + 1}`} />
           
          </Card>
        ))}
      </div>
      <Button onClick={handleNextPage}>🌟</Button>
    </div>

    <CardContent></CardContent>
    <div>
      <Card style={{backgroundColor:'#EC56ACCC'}}>
      <h1>Contact Us</h1>
      </Card>
      
     <CardContent>Easy to contact us
We always ready to help by providijng the best services for you. We beleive a good blace to live can make your life better</CardContent>
      </div>

      
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
     
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '50%', marginBottom: '1rem' }}>
        <div style={{ flex: '0 0 50%', width: '50%', padding: '0.5rem' }}>
          <Card style={{ height: '10rem', display: 'flex', alignItems: 'center' }}>
            <Typography><img src={phone} alt="" style={{ height: '2rem', width: '2rem' }} />Contact</Typography>
            <br />
            <h6>91+4553242489</h6>
            <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Button>Call</Button>
          </div>
          </Card>
        </div>
        <div style={{ flex: '0 0 50%', width: '50%', padding: '0.5rem' }}>
          <Card style={{ height: '10rem', display: 'flex', alignItems: 'center' ,backgroundColor:'#B6DCFE'}}>
          <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Typography><img src={mail} alt="" style={{ height: '2rem', width: '2rem' }} />Email</Typography>
            <br />
            <h6>kaninitourism@gmail.com</h6>
          </div>
          <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Button>Email</Button>
          </div>
          </Card>
        </div>
        <div style={{ flex: '0 0 50%', width: '50%', padding: '0.5rem' }}>
          <Card style={{ height: '10rem', display: 'flex', alignItems: 'center',backgroundColor:'#B6DCFE' }}>
          <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Typography><img src={world} alt="" style={{ height: '2rem', width: '2rem' }} />Location</Typography>
            <h6>Chennai</h6>
            <h6>USA</h6>
            <h6>Dubai</h6>
            <h6>Singapore</h6>
          </div>
          </Card>
        </div>
        <div style={{ flex: '0 0 50%', width: '50%', padding: '0.5rem' }}>
          <Card style={{ height: '10rem', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Typography><img src={feed} alt="" style={{ height: '2rem', width: '2rem' }} />Feedback</Typography>
            <h4>Give your Feedback</h4>
          </div>
          <div style={{ flex: '0 0 50%', padding: '0.5rem' }}>
            <Button>Feedback</Button>
          </div>
          </Card>
        </div>
      </div>

    
      <div style={{ flex: '0 0 50%', width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
        <Card>
          <img src='https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?w=826&t=st=1691507397~exp=1691507997~hmac=c5ed234d836ec7e57a383eb267a6c8635850eef6b56c6fac4cf810025ee5b63c' alt='' style={{ height: '20rem', width: '100%' }} />
        </Card>
      </div>
    </div>
     </div>
    
  );
};

export default LineChart;
