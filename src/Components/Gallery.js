import React, { useState, useEffect } from "react";
import { TextField, Card,Pagination, CardContent, Button,CardMedia,Typography,Paper,Popover,Avatar,IconButton} from "@mui/material";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  const startIndex = (currentPage - 1) * imagesPerPage;
const endIndex = startIndex + imagesPerPage;

const displayedImages = galleryData.slice(startIndex, endIndex);





  useEffect(() => {
    fetchGalleryData();
  }, []);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setOpenPopover(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
  };
const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

 
  const adminName = localStorage.getItem("adminName");

  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("https://localhost:7067/api/ImageGallery"); 
      setGalleryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      setLoading(false); 
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageName || !image) {
      alert("Please provide both image name and select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("image", image);

    try {
      await axios.post("https://localhost:7067/api/ImageGallery/ByImage", formData); 
      setImageName("");
      setImage(null);
      fetchGalleryData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div >
      <br></br><br></br>
      <h1>Gallery </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="account"
          style={{ top: -50, left: "60rem", height: "5rem", width: "5rem" }}
          onClick={handlePopoverOpen}
        >
          <AccountCircleIcon style={{ height: "3rem", width: "3rem" }} />
        </IconButton>
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper sx={{ padding: "1rem", display: "flex", alignItems: "center" }}>
            <Avatar sx={{ marginRight: "1rem" }} />
            <div>
              <Typography>{adminName}</Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </div>
          </Paper>
        </Popover>
      </div>
      <div>
        <Card  style={{border: '4px solid black'}}>
          <CardContent>
        <TextField
          label="Image Name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          placeholder="Image Name"
          variant="outlined"
          style={{ marginTop: "1rem" }}
        />
        <TextField
          type="file"
          onChange={handleImageChange}
          style={{ marginTop: "1rem"}}
          id="image-upload"
        />
       
        <Button variant="contained"  style={{ marginTop: "1rem" }} onClick={handleUpload}>
          Submit
        </Button>
        </CardContent>
        </Card>
      </div>
      <CardContent></CardContent>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh",backgroundColor: " #c6c6ec" ,border: '4px solid #3939ac' ,borderRadius:'25px'}}>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "2rem" ,justifyContent: "center", alignItems: "center" }}>
      {loading ? ( 
          <div>Loading...</div>
        ) :( 
          displayedImages.map((image) => (
          <Card key={image.imageId} style={{ width: 300, margin: "0.5rem" }}>
            <CardMedia
              component="img"
              image={`data:image;base64,${image.image}`}
              alt={image.imageName}
              style={{ height: 200 }}
            />
            <CardContent>
              <Typography>{image.imageName}</Typography>
            </CardContent>
          </Card>
          
        )))}
       
      </div>
      
      </div>
      <Pagination
        count={Math.ceil(galleryData.length / imagesPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        style={{ color:'pink', marginTop: "1rem" }}
      />
    </div>
  );
};

export default Gallery;
