import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMetaMask } from "metamask-react";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const theme = createTheme();

function AddLandInspector(props) {
    const contract = props.contract;
    const { account} = useMetaMask();
    const [loading,setLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const inspector = {
            fullName: data.get('firstName')+" "+data.get('lastName'),
          account: data.get('account'),
          age:data.get('age'),
          city:data.get('city')
        }
        
       const res = await contract.methods.addLandInspector(inspector.account,
          inspector.fullName,
          inspector.age,
          inspector.city).send({from:account,gas:3000000});
          console.log(res);
          window.location = '/contract_owner';
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
                  <PersonAddAlt1Icon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add New Inspector
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
                        id="account"
                        label="Account Address"
                        name="account"
                        autoComplete="account"
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
                        id="city"
                        label="city"
                        name="city"
                        autoComplete="city"
                      />
                    </Grid>
                    
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Inspector
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

export default AddLandInspector