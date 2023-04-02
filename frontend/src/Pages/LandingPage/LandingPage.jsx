import React from 'react'
import { Box, Typography, useMediaQuery} from "@mui/material";
import lp_image from "../../images/lp_image.png";
import Navbar from '../../components/Navbar/Navbar';

const LandingPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box sx={{ padding: "5rem",fontFamily: 'Rubik','mt':'8vh'}}>
        <Typography variant="h2" color={'#1976d2'} fontWeight="700" fontSize="7vh" >
            Secure Land Registration using Blockchain Technology.
        </Typography>
        </Box>
        
        <Box>
        <img src={lp_image} style={{width: '62vw', height: 'auto'}}alt="landing page"/>
        </Box>
    </Box>
    

    </Box>
    )
 
};

export default LandingPage;