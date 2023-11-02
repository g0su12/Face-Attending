import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {bgGradient} from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import {Backdrop, CircularProgress} from "@mui/material";
import {useAuth} from "../../AuthContext"
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {login} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(auth, email, password);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{my: 3}}>Forgot your password?</Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Logo
        sx={{
          position: 'fixed',
          top: {xs: 16, md: 24},
          left: {xs: 16, md: 24},
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Face Attendance</Typography>

          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{my: 3}}/>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
