import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dropzone from "react-dropzone";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from 'axios';
import { useMetaMask } from "metamask-react";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

function AddLands(props) {
    const [file, setFile] = useState();
    const [myipfsHash, setIPFSHASH] = useState('');
    const { account} = useMetaMask();
    const contract = props.contract;
    const [loading,setLoading] = useState(false);
    const handleFile=async (fileToHandle) =>{  
        // initialize the form data
        const fileData = new FormData()
        // append the file form data to 
        fileData.append("file", fileToHandle)
    
        // call the keys from .env
    
        const API_KEY = "7d9a7ff16c2d035d32d4";
        const API_SECRET = "96fcf1ec6ddde4206ceed8f8c7eccfe287889aeb33aa94594c93b780581c0ec1";
    
        // the endpoint needed to upload the file
        const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`
    
        const response = await axios.post(
          url,
          fileData,
          {
              maxContentLength: "Infinity",
              headers: {
                  "Content-Type": `multipart/form-data;boundary=${fileData._boundary}`, 
                  'pinata_api_key': API_KEY,
                  'pinata_secret_api_key': API_SECRET
    
              }
          }
      )  
      setIPFSHASH(response.data.IpfsHash)
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await handleFile(file);
        const data = new FormData(event.target);
        const docUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash}`;
        console.log(data)
        const landData = {
            
            area: data.get('area'),
            location: data.get('location'),
            surveyNum:data.get('surveyNum'),
            document:docUrl
        }
        console.log(landData);
        console.log(account)
        const res = await contract.methods.addLand(
            landData.area,
            landData.location,
            landData.surveyNum,
            landData.document
        ).send({from:account,gas:3000000});
        console.log(res);
        window.location = '/user';
    };
    
    if(!loading){
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AddPhotoAlternateIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add New Land
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                
                            
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="area"
                                        label="area"
                                        name="area"
                                        type="number"
                                        autoComplete="area"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="location"
                                        label="Location"
                                        name="location"
                                        autoComplete="location"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="surveyNum"
                                        label="Survey Number"
                                        name="surveyNum"
                                        autoComplete="surveyNum"
                                    />
                                </Grid>
                                
    
                                <Grid item xs={12}>
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(e)=>{setFile(e[0]);} } >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed #1976d2`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" },'display':'flex','justifyContent':'space-between' }}
                                            >
                                                <input {...getInputProps()} />
                                                {!file ? (
                                                    <p>Add Land Document Here</p>
                                                ) : (
                                                    <>
                                                        <Typography>{ file.name }</Typography>
                                                        <EditOutlinedIcon />
                                                    </>
                                                )}
                                            </Box>
                                        )}
    
                                    </Dropzone>
                                </Grid>
    
    
    
                            </Grid>
                           
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                
                            >
                               Add Land
                            </Button>
                            
                        </Box>
                    </Box>
    
                </Container>
            </ThemeProvider>
        );
    }else{
        return(
            
            <Box sx={{ display:'flex', justifyContent: 'center',alignItems: 'center' }} >
            <CircularProgress sx={{mt:25,height:'6vh'}}/>
            </Box>
        )
        
    }

    
}

export default AddLands