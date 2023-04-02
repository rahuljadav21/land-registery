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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/List';
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import Login from '../../components/Login/Login';
import abi from '../../contract/LandRecords.json';
import contractAddress from '../../constant.json'
import { useEffect } from 'react';

const drawerWidth = 280;

function ContractOwnerDashboard() {
  const { status,account} = useMetaMask();
  const [comp, setComp] = React.useState('landStats');
  const [isContractOwner,setIsContractOwner] = React.useState(false);
  const navigate = useNavigate();
  let Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));    
  let contract = new web3.eth.Contract(abi.abi,contractAddress.contractAddress);

  useEffect(() => {
    
    async function isAuthotize(){
      const res = await contract.methods.isContractOwner(account).call();
      setIsContractOwner(res);
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

    if(isContractOwner){

      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Contract Owner Dashboard
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
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Trasfer Contract Ownership"} onClick={() => { setComp('transferContract') }} />
                </ListItemButton>
              </ListItem>
    
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Land Inspector"} onClick={() => { setComp('addInspector') }} />
                </ListItemButton>
              </ListItem>
    
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Land Statstics"} onClick={() => { setComp('landStats') }} />
                </ListItemButton>
              </ListItem>
    
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={"All Land Inspectors"} onClick={() => { setComp('allInspector') }} />
                </ListItemButton>
              </ListItem>
    
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Log Out"} onClick={() => { navigate("/") }} />
                </ListItemButton>
              </ListItem>
    
            </List>
    
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 10 }}
          >
            <ComponentSelector contract={contract} component={comp} />
    
          </Box>
        </Box>
      )

    }else{
      return(
        <ComponentSelector contract={contract} component={'unauthorized'} />
      )
    }

    
}
}

export default ContractOwnerDashboard