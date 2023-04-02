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
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';
import VerifiedIcon from '@mui/icons-material/Verified';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TransformIcon from '@mui/icons-material/Transform';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import Login from '../../components/Login/Login';
import abi from '../../contract/LandRecords.json';
import contractAddress from '../../constant.json'
import { useEffect } from 'react';

const drawerWidth = 280;

function LandInspectorDashboard() {
  const [comp, setComp] = React.useState('verifyLands');
  const [isInspector,setIsInspector] = React.useState(false);
  const { status,account} = useMetaMask();
  const navigate = useNavigate();
  let Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));    
  let contract = new web3.eth.Contract(abi.abi,contractAddress.contractAddress);

  useEffect(() => {
    
  async function isAuthotize(){
    const res = await contract.methods.isLandInspector(account).call();
    setIsInspector(res);
    if(!res){
      setComp('unauthorized');
    }
  }
    isAuthotize();
  }, [account,contract.methods])
  

  if(status==='notConnected'){
    return(
      <Login connect />
    )
   }else if(status==='connected'){

    if(!isInspector){
      return(
        <ComponentSelector contract={contract} component = {'unauthorized'}/>
      )
    }else{
      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Land Inspector Dashboard
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
                       <VerifiedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Verify Users"}  onClick={()=>{setComp('verifyUsers')}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <AssignmentTurnedInIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Verify Lands"}  onClick={()=>{setComp('verifyLands')}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <TransformIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Transfer Ownerships"}  onClick={()=>{setComp('trasferOwnership')}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                       <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Log Out"}  onClick={()=>{ navigate("/") }} />
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
    }
}
}

export default LandInspectorDashboard