import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar,Container } from '@mui/material';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {



    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{ height: '100vh' }}
            >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <div>
                    <Button variant={formState === 0 ? "contained" : ""} onClick={() => setFormState(0)}>
                        Log In
                    </Button>
                    <Button variant={formState === 1 ? "contained" : ""} onClick={() => setFormState(1)}>
                        Sign Up
                    </Button>
                </div>

                <Box component="form" noValidate sx={{ mt: 1 }}>

                    {formState === 1 && (
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name='password'
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p style={{ color: "red" }}>{error}</p>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAuth}
                    >
                        {formState === 0 ? "Log In" : "Sign Up"}
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </Container>
    );
}