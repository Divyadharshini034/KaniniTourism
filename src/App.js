

import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import TouristPlaces from './Components/TouristPlaces';
import Travellers from './Components/Travellers';
import AdminLoginForm from './Components/AdminLogin';
import TravelerReg from './Components/TravelerReg';
import TravelerLog from './Components/TravelerLog';
import TravelAgentActivation from './Components/TravelAgentActivation';
import HotelPage from './Components/HotelPage';
import Hotel from './Components/Hotel';
import Payment from './Components/Payment';
import KaniniPage from './Components/KaniniPage';

import Gallery from './Components/Gallery';
import NavbarKanini from './Components/NavbarKanini';
import './App.css';
import AdminDashboard from './Components/Admindashboard';
import FirstPage from './Components/FirstPage';
import Contact from './Components/Contact';

import FeedbackPage from './Components/FeedbackPage';
import LineChart from './Components/LineChart';
import authService from './AuthService';
import React ,{ useState,useEffect} from 'react';
 





function App() {

  const [isAuthenticatedTraveler, setIsAuthenticatedTraveler] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticatedTraveler(true);
    }
  }, []);

  const handleTravelerLogin = async (email, name, pass) => {
    try {
      const success = await authService.loginTraveler(email, name, pass);
      if (success) {
        setIsAuthenticatedTraveler(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  
  return (
    <BrowserRouter>
       <NavbarKanini></NavbarKanini>
    <div className="App container">
     
      <Routes>
     
      <Route path='/' Component={LineChart}  />
      
      <Route path='/travelagent' Component={RegistrationForm}/>
      <Route path='/login' Component={LoginForm}/>
   
      <Route
            path="/tl"
            element={<TravelerLog onTravelerLogin={handleTravelerLogin} />}
          />

          <Route
            path="/kaninipage"
            element={
              isAuthenticatedTraveler ? (
                <KaniniPage />
                
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          
     <Route path='/traveler'Component={Travellers}/>
     <Route path='/tr' Component={TravelerReg}/>
    
     <Route path="/hotels" Component={HotelPage} />
     <Route path="/place" Component={TouristPlaces} />
    
     <Route path="/traactive" Component={TravelAgentActivation} />

    <Route path='/hotel'Component={Hotel}/>
     <Route path='/pay' Component={Payment}/>
     <Route path='/admin' Component={AdminLoginForm}/>
     <Route path='/gallery' Component={Gallery}/>
     <Route path='/nav'Component={NavbarKanini}/>
    
     <Route path='/dash'Component={AdminDashboard}/>
   
     
     <Route path='/contact'Component={Contact}/>
     <Route path='/feedback'Component={FeedbackPage}/>
     <Route path='/l' Component={FirstPage}/>
    
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
