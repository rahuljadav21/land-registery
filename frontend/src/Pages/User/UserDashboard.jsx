import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import Login from '../../components/Login/Login';
import abi from '../../contract/LandRecords.json';
import contractAddress from '../../constant.json';
import { useState } from 'react';
import UserRegistration from './UserRegistration';

const drawerWidth = 280;

function ContractOwnerDashboard() {
const { status , account} = useMetaMask();
const [comp, setComp] = React.useState('myLands');
const [isReg, setisReg] = useState(false);
const navigate = useNavigate();
let Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));    
let contract = new web3.eth.Contract(abi.abi,contractAddress.contractAddress);
const registerd = async()=>{
  let  isreg = await contract.methods.isUserRegistered(account).call(); 
  setisReg(isreg);
}
registerd();
if(status==='notConnected'){
    return(
      <Login/>
    )
  }else{  

    if(isReg===true){

      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                User Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
             
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <AddPhotoAlternateIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Land"} onClick={()=>{setComp('addLand')}} />
                  </ListItemButton>
                </ListItem>
    
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <ReceiptLongIcon />
                    </ListItemIcon>
                    <ListItemText primary={"My Lands"}  onClick={()=>{setComp('myLands')}} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary={"Buy Land"} onClick={() => { setComp('landRecords') }} />
            </ListItemButton>
          </ListItem>
    
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Sent Request"}  onClick={()=>{setComp('sentRequests')}} />
                  </ListItemButton>
                </ListItem>
    
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <CallReceivedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Received Request"}  onClick={()=>{setComp('receivedRequest')}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Log Out"}  onClick={()=>{navigate("/")}} />
                  </ListItemButton>
                </ListItem>
              
            </List>
           
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 10 }}
          >
            <ComponentSelector contract={contract} component = {comp}/>
          
          </Box>
        </Box>
      )

    }else if(isReg===false){
      return(
        <UserRegistration account={account} contract={contract}/>
      )
      
    }

    

  } 
}

export default ContractOwnerDashboard