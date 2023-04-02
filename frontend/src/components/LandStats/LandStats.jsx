import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

function LandStats(props) {
  const contract = props.contract;
  const [userCounts, setuserCounts] = useState(0);
  const [landCounts, setlandCounts] = useState(0)
  const [inspectorCounts, setinspectorCounts] = useState(0)

  const loadData = async()=>{
    const userCount = await contract.methods.userCount().call();
    setuserCounts(userCount);
    const landCount = await contract.methods.LandCount().call();
    setlandCounts(landCount);
    const inspectorCount = await contract.methods.InspectorCount().call();  
    setinspectorCounts(inspectorCount);
   
  }
  loadData(); 
  return (

    <Box sx={{ display: 'flex',justifyContent: 'space-around',alignItems: 'center','mt':'10vh' }}>

    <Card sx={{ maxWidth: 350 }}>
    <CardActionArea>
      
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Total Users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userCounts}
        </Typography>
      </CardContent>
        </CardActionArea>
     </Card>

     <Card sx={{ maxWidth: 250 }}>
    <CardActionArea>
      
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Total Lands
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {landCounts}
        </Typography>
      </CardContent>
        </CardActionArea>
     </Card>

     <Card sx={{ maxWidth: 250 }}>
    <CardActionArea>
      
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Total Land Inspectors
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {inspectorCounts}
        </Typography>
      </CardContent>
        </CardActionArea>
     </Card>

     

    </Box>
  )
}

export default LandStats