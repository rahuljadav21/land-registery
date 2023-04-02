import React from 'react'
import {Box,Button,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
  return (
    <Box sx={{ display:'flex', justifyContent: 'center',alignItems: 'center' }}>
    
    <Typography variant="h2" sx={{mt:'10vh'}} color={'#1976d2'} fontWeight="700" fontSize="7vh" >
           Sorry, You are not authorized for this page.  
        </Typography>
        <Button onClick={()=>{
            navigate('/')
       }}>Go back to Home.</Button>
    
     </Box>
  )
}

export default Unauthorized