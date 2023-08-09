// AuthService.js
import axios from 'axios';
class AuthService {
    

  

    register = async (travelAgentName, travelAgentEmail, mobileNumber,address,travelAgentPass) => {
      try {
        
        const response = await fetch('https://localhost:7247/api/TravelAgentReg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ travelAgentName, travelAgentEmail,mobileNumber,address, travelAgentPass }),
        });
  
        if (!response.ok) {
          throw new Error('Registration failed');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Registration failed');
      }
    };
  
    
    
    logintra = async (travelAgentName,travelAgentEmail, travelAgentPass) => {
        try {
          const response = await axios.post('https://localhost:7247/api/Login/TravelAgent', {
            travelAgentName,
            travelAgentEmail,
            travelAgentPass,
          });
    
          const data = response.data;
          console.log('API response:', data.token);
        
          localStorage.setItem('travelAgentName', travelAgentName);
          localStorage.setItem('travelAgentEmail', travelAgentEmail);
         
          localStorage.setItem('token', data.token); // Store the token in local storage
          localStorage.setItem('message',data.message);
          return true; 
        } catch (error) {
          throw new Error('Login failed');
        }
      };
  

      loginAdmin = async (adminName, adminPassword) => {
        try {
          const response = await axios.post('https://localhost:7067/api/Token/Admin', {
            adminName,
            adminPassword,
          });
    
          const data = response.data;
          console.log('API response:', data);
    
          localStorage.setItem('adminName', adminName);
          localStorage.setItem('admintoken', data); 
    
          return true;
        } catch (error) {
          throw new Error('Login failed');
        }
      };


      registerTraveler = async (travelerName, travelerEmail,travelerMobileNo,travelerAddress,dob,travelerPass) => {
        try {
          const response = await fetch('https://localhost:7098/api/Travelers/Traveler', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ TravelerName: travelerName,TravelerEmail:travelerEmail,TravelerMobile:travelerMobileNo,TravelerAddress:travelerAddress,TravelerDob:dob, TravelerPass: travelerPass }),
          });
    
          if (!response.ok) {
            throw new Error('Registration failed');
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          throw new Error('Registration failed');
        }
      };
    
      loginTraveler = async ( travelerEmail,travelerName, travelerPass) => {
        try {
          const response = await axios.post('https://localhost:7098/api/TokenControllers/Traveler', {
            TravelerEmail:travelerEmail,
            TravelerName: travelerName,
            TravelerPass: travelerPass,
          });
    
          const data = response.data;
          console.log('API response:', data);
    
          localStorage.setItem('travelerName', travelerName);
          localStorage.setItem('travelerEmail',travelerEmail);
          localStorage.setItem('travelerPass',travelerPass);
          localStorage.setItem('token', data); 
         

          return true;
        } catch (error) {
          throw new Error('Login failed');
        }
      };


      bookTourByTouristId = async (touristId, travelerName, travelerEmail, travelerPass) => {
        try {
          const response = await axios.post(`https://localhost:7098/api/Travelers/BookTourByTouristId/${touristId}`, {
            TravelerName: travelerName,
            TravelerEmail: travelerEmail,
            TravelerPass: travelerPass,
          });
    
          const data = response.data;
          console.log('API response:', data);
    
         
          return data;
        } catch (error) {
          throw new Error('Booking failed');
        }
      };

      getUserDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://localhost:7098/api/TokenControllers/Traveler', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch traveler details');
        }
      };
    
    }
  const authService = new AuthService();


export default authService;
  