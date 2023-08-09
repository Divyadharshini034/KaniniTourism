import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { TablePagination } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  IconButton,
  Popover,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Container,
  Typography,
} from "@mui/material";

function TravelAgentActivation() {
    const [travelAgents, setTravelAgents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [adminName, setAdminName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const navigate = useNavigate();
       
    const fetchTravelAgents = async () => {
      try {
        const response = await axios.get("https://localhost:7247/api/TravelAgentReg");
        setTravelAgents(response.data);
      } catch (error) {
        console.error("Error fetching travel agents:", error);
      }
    };
  
    useEffect(() => {
      fetchTravelAgents();
    }, []);
  
    useEffect(() => {
      const storedAdminName = localStorage.getItem('adminName');
      if (storedAdminName) {
        setAdminName(storedAdminName);
      }
    }, []);
    const handleDialogOpen = (agent) => {
      setSelectedAgent(agent);
      setOpenDialog(true);
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
    };
  
    const handleActivationToggle = async (agent) => {
        try {
          const updatedAgent = { ...agent, isActivate: !agent.IsActivate };
          await axios.put(`https://localhost:7247/api/TravelAgentReg/${agent.travelAgentId}`, updatedAgent);
          fetchTravelAgents();
          setOpenDialog(false);
        } catch (error) {
          console.error("Error updating travel agent:", error);
        }
      };
      
  
    const handleAgentDelete = async (id) => {
      try {
        await axios.delete(`https://localhost:7247/api/TravelAgentReg/${id}`);
        fetchTravelAgents();
        handleDialogClose();
      } catch (error) {
        console.error("Error deleting travel agent:", error);
      }
    };
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenPopover(true);
    };
  
    const handlePopoverClose = () => {
      setOpenPopover(false);
    };
  
    const handleLogout = () => {
      localStorage.clear();
      navigate('/');
    };
    

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTravelAgents = travelAgents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

    return (
      <div  >
        <br></br><br></br>
        <Card style={{backgroundImage: `url('https://wallpapercave.com/wp/wp8788365.jpg')`,backgroundSize: '100%',backgroundPosition: 'center',width:'70rem',height:'40rem',alignItems:'center',margin:'1rem',border: '2px solid  #0000b3'}}>
          <Container>
            <Container>
              <Typography style={{fontWeight:'bold',fontSize:'40px'}} >Agent Activation</Typography>
            </Container>
        <TableContainer component={Paper}  >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell style={{fontWeight:'bold'}}>ID</TableCell>
                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                <TableCell  style={{fontWeight:'bold'}}>Email</TableCell>
                <TableCell  style={{fontWeight:'bold'}}>Mobile No</TableCell>
                <TableCell  style={{fontWeight:'bold'}}>Address</TableCell>
                <TableCell  style={{fontWeight:'bold'}}>Status</TableCell>
                <TableCell  style={{fontWeight:'bold'}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTravelAgents.map((agent) => (
                <TableRow key={agent.travelAgentId}>
                  <TableCell>{agent.travelAgentId}</TableCell>
                  <TableCell>{agent.travelAgentName}</TableCell>
                  <TableCell>{agent.travelAgentEmail}</TableCell>
                  <TableCell>{agent.mobileNumber}</TableCell>
                  <TableCell>{agent.mobileNumber}</TableCell>
                  <TableCell>{agent.address}</TableCell>
                  <TableCell  style={{fontWeight:'bold'}} onClick={() => handleActivationToggle(agent)}>
                   {agent.isActivate ? "Active" : "Inactive"}
                  </TableCell>


                  <TableCell>
                    <Button  style={{ backgroundColor: '#000080' }}onClick={() => handleDialogOpen(agent)}>
                      <EditIcon style={{ color: 'white' }}></EditIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
           
          </Table>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
           <TablePagination
             rowsPerPageOptions={[5, 10, 25]}
             component="div"
             count={travelAgents.length}
             rowsPerPage={rowsPerPage}
             page={page}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
           />
         </div>
        </TableContainer>
       
        </Container>
        </Card>
        <Dialog style={{width:'20rem',top:'6rem',left:'30rem',alignItems:'center'}} open={openDialog} onClose={handleDialogClose}>
          <DialogTitle style={{fontWeight:'bold'}}><ManageAccountsIcon style={{fontSize:'2rem',color:'#0000b3'}}></ManageAccountsIcon> Edit Travel Agent</DialogTitle>
          <DialogContent>
            {selectedAgent && (
              <form>
                <label style={{fontWeight:'bold'}}>Name:</label>
                <input
                  type="text"
                  value={selectedAgent.travelAgentName}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      travelAgentName: e.target.value,
                    })
                  }
                />
                <label style={{fontWeight:'bold'}}>Email:</label>
                <input
                  type="email"
                  value={selectedAgent.travelAgentEmail}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      travelAgentEmail: e.target.value,
                    })
                  }
                />
                <label style={{fontWeight:'bold'}}>Mobile No:</label>
                <input
                  type="text"
                  value={selectedAgent.mobileNumber}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      mobileNumber: e.target.value,
                    })
                  }
                />
                <label style={{fontWeight:'bold'}}>Address:</label>
                <input
                  type="text"
                  value={selectedAgent.address}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      address: e.target.value,
                    })
                  }
                />
                <label style={{fontWeight:'bold'}}>Status:</label>
                <select
                  value={selectedAgent.IsActivate}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      IsActivate: e.target.value === "true",
                    })
                  }
                >
                  <option style={{fontWeight:'bold'}} value={true}>Active</option>
                  <option style={{fontWeight:'bold'}} value={false}>Inactive</option>
                </select>
              </form>
            )}
          </DialogContent>
          <DialogActions>
            <Button style={{backgroundColor:'#0000b3',color:'white'}} onClick={handleDialogClose}>Cancel</Button>
            <Button
              color="primary"
              onClick={() => handleActivationToggle(selectedAgent)}
              style={{backgroundColor:'#0000b3',color:'white'}}
            >
              Save
            </Button>
            <Button
              color="secondary"
              onClick={() => handleAgentDelete(selectedAgent.TravelAgentId)}
              style={{backgroundColor:'#0000b3'}}
            >
              <DeleteIcon style={{color:'white'}}></DeleteIcon>
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
        <IconButton edge="start" color="inherit" aria-label="account" style={{top:-500,left:'67rem',height:'5rem',width:'5rem'}} onClick={handlePopoverOpen}>
            <AccountCircleIcon  style={{height:'3rem',width:'3rem'}}/>
          </IconButton>
          
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ marginRight: '1rem' }}>{adminName[0]}</Avatar>
            <div>
              <Typography>{adminName}</Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </div>
          </Paper>
        </Popover>
      </div>
      </div>
    );
  }
  
  export default TravelAgentActivation;
  