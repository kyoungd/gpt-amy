import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// components
import App from './App';
import { UserProvider } from './components/UserContext';
import { ErrorProvider } from './ErrorContext';

// CSS File Here
import 'swiper/css';
import "aos/dist/aos.css";
import './assets/scss/style.scss';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Sentry.ErrorBoundary fallback={"An error has occurred"}>
        <HelmetProvider>
            <UserProvider>
                <ErrorProvider>
                    <App />
                </ErrorProvider>
            </UserProvider>
        </HelmetProvider>
    </Sentry.ErrorBoundary>
);
