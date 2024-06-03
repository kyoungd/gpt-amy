import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import PropTypes from 'prop-types';

function VideoModal(props) {
  const { videoId } = props;
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <a href="#" onClick={openModal}>
        {props.title}
      </a>
      <ModalVideo
        channel='youtube'
        autoplay={true}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

VideoModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default VideoModal;
