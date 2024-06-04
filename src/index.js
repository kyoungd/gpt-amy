import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

// components
import App from './App';
import { UserProvider } from './components/UserContext';
import { ErrorProvider } from './ErrorContext';

// CSS File Here
import 'swiper/css';
import "aos/dist/aos.css";
import './assets/scss/style.scss';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <HelmetProvider>
        <UserProvider>
            <ErrorProvider>
                <App />
            </ErrorProvider>
        </UserProvider>
    </HelmetProvider>
);
