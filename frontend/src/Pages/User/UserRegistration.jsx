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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropzone from "react-dropzone";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from 'axios';
import { useMetaMask } from "metamask-react";

const theme = createTheme();

function UserRegistration(props) {
    const { account} = useMetaMask();
    const [file, setFile] = useState();
    const [myipfsHash, setIPFSHASH] = useState('');
    const contract = props.contract;
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
        await handleFile(file);
        const data = new FormData(event.target);
        const docUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash}`;
        const userData = {
            fullName: data.get('firstName')+" "+ data.get('lastName'),
            email: data.get('email'),
            age: data.get('age'),
            aadhar: data.get('aadhar'),
            pan:data.get('pan'),
            city:data.get('city'),
            document:docUrl
        }
        
        const res = await contract.methods.registerNewUser(
            userData.fullName,userData.email,userData.age,
            userData.city,userData.aadhar,userData.pan,
            userData.document
        ).send({from:account,gas:3000000});
            console.log(res);
            window.location = '/user';

    };

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
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up as a New User
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="age"
                                    name="age"
                                    type="number"
                                    autoComplete="age"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="aadhar"
                                    label="Aadhar Number"
                                    name="aadhar"
                                    type="number"
                                    autoComplete="aadhar"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="pan"
                                    label="PAN Number"
                                    name="pan"
                                    autoComplete="pan"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="city"
                                    name="city"
                                    autoComplete="city"
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
                                                <p>Add Your Document Here</p>
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
                            Sign Up
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default UserRegistration