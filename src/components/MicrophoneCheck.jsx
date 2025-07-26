import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';

function MicrophoneCheck({ setIsMicrophoneOK }) {
  const [hasMicAccess, setHasMicAccess] = React.useState(null);

  useEffect(() => {
    checkMicrophoneAccess();
  }, []);

  const checkMicrophoneAccess = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setHasMicAccess(true);
        setIsMicrophoneOK(true); // call the passed function with true
        // Stop all tracks to prevent continued recording
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(() => {
        setHasMicAccess(false);
      });
  };

  const requestMicrophoneAccess = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setHasMicAccess(true);
        setIsMicrophoneOK(true); // call the passed function with true
        // Stop all tracks to prevent continued recording
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (hasMicAccess === false) {
    return (
      <Button onClick={requestMicrophoneAccess}>
        Allow microphone access
      </Button>
    );
  }

  return <></>;
}

MicrophoneCheck.propTypes = {
  setIsMicrophoneOK: PropTypes.func.isRequired,
};

export default MicrophoneCheck;
