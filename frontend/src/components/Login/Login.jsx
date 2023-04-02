import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMetaMask } from "metamask-react";
const theme = createTheme();

function Login() {

    const { connect } = useMetaMask();
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
            <img src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png" alt="react logo" style={{height:'14vh', borderRadius:'5vh' }}/>
              
              
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}

                  onClick={()=>{connect()}}
                >
                  Connect With MetaMask
                </Button>
                
              </Box>
            </Box>
            
          </Container>
        </ThemeProvider>
      );
}

export default Login