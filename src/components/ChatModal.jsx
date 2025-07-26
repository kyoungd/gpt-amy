import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import personOutline from '@iconify/icons-eva/person-outline';
import catOutline from '@iconify/icons-eva/github-outline';

const ChatModal = ({ title, chatList, show, handleClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[70vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex-1 text-center">{title}</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold ml-4"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(70vh - 120px)' }}>
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
        </div>
      </div>
    </div>
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