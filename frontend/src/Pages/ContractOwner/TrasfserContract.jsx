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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const theme = createTheme();

function TrasfserContract() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inspector = {
            fullName: data.get('firstName')+data.get('lastName'),
          account: data.get('account'),
          age:data.get('age'),
          city:data.get('city')
        }
        console.log(inspector);
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
                <ChangeCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Trasfer Contract Ownership
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  
                  
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
                  
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Trasfer Contract Ownership
                </Button>
                
              </Box>
            </Box>
            
          </Container>
        </ThemeProvider>
      );
}

export default TrasfserContract