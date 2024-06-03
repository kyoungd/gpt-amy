import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';

import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';
import MotionFadeIn from '../components/MotionFadeIn';

import 'react-modal-video/scss/modal-video.scss';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center'
}));

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center'
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <MotionFadeIn>
      <RootStyle title="Login | 2Human">
        <Container maxWidth="sm">
          <ContentStyle>
            <AuthSocial />

            <LoginForm />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>

          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionFadeIn>
  );
}
