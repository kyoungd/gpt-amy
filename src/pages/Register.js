// material
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// layouts
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';
import MotionFadeIn from '../components/MotionFadeIn';

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

export default function Register() {
  return (
    <MotionFadeIn>
      <RootStyle title="Login | 2Human">
        <Container maxWidth="sm">
          <ContentStyle>

            <AuthSocial />

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Minimal&nbsp;
              <Link underline="always" sx={{ color: 'text.primary' }}>
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link underline="always" sx={{ color: 'text.primary' }}>
                Privacy Policy
              </Link>
              .
            </Typography>

          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionFadeIn>
  );
}
