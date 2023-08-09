import React from 'react';
import { Card, Button } from '@mui/material';
import { YouTube, Twitter, LinkedIn } from '@mui/icons-material';
import img from './images/con.png';

const Contact = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <h2>Connect with us on social media</h2>
      <Card>
        <Button
          variant="contained"
          color="secondary"
          href="https://www.youtube.com/channel/UC61GUd71XNbKC2Rfa_suyvQ"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<YouTube />}
          style={{height:'3rem'}}
        >
          YouTube
        </Button>

        <Button
          variant="contained"
          color="primary"
          href="https://twitter.com/kanini_com"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<Twitter />}
          style={{height:'3rem'}}
        >
          Twitter
        </Button>

        <Button
          variant="contained"
          color="info"
          href="https://www.linkedin.com/company/kanini/mycompany/verification/"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<LinkedIn />}
          style={{height:'3rem'}}
        >
          LinkedIn
        </Button>
      </Card>
      <Card>
        <img src={img} alt="Contact Us" style={{ height: '30rem', width: '70rem' }} />
      </Card>
    </div>
  );
};

export default Contact;
