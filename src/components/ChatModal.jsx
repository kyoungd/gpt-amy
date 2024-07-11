import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import personOutline from '@iconify/icons-eva/person-outline';
import catOutline from '@iconify/icons-eva/github-outline';

const ChatModal = ({ title, chatList, show, handleClose }) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg" 
      centered
      dialogClassName="modal-70w"
    >
      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Modal.Title style={{ flex: '1', textAlign: 'center' }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(70vh - 120px)', overflowY: 'auto' }}>
        {chatList.map((chat, index) => {
          console.log('Chat role:', chat.role);
          return chat.role !== "system" && (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
                margin: '5% 5%',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  backgroundColor: chat.role === 'user' ? '#f1f1f1' : '#d1e7fd',
                  borderRadius: '10px',
                  maxWidth: '60%',
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  wordBreak: 'break-word'
                }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    marginRight: '0.3em',
                    flexShrink: 0 
                  }}>
                    {chat.role === 'assistant' && <Icon icon={catOutline} style={{ marginRight: '0.3em' }} />}
                    {chat.role === 'user' && <Icon icon={personOutline} style={{ marginRight: '0.3em' }} />}
                    <span style={{ fontSize: '0.9em', fontWeight: 'bold' }}>
                      {chat.role === 'user' ? 'You: ' : 'AI: '}
                    </span>
                  </span>
                  <span>{chat.content}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

ChatModal.propTypes = {
  title: PropTypes.string.isRequired,
  chatList: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ChatModal;