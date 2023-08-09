import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', { name, email, message });

    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundImage: 'url("https://img.freepik.com/free-vector/flat-design-travel-background_23-2149193475.jpg?w=2000")', backgroundSize: 'cover' ,backgroundPosition:'100%', height: '100vh' }}>
      <Card style={{ width: '30rem' }}>
        <CardContent>
          <Typography variant="h5">Your Feedback</Typography>
          {submitted ? (
            <Typography variant="body1">Thank you for your feedback!</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  fullWidth
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  margin="dense"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="dense"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  margin="dense"
                />
              </div>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackPage;
