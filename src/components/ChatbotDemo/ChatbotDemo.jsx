import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import ChatModal from '../ChatModal.jsx';

const ChatbotDemo = ({ chatData, classOption }) => {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleShow = (chat) => {
        setSelectedChat(chat);
    };

    const handleClose = () => {
        setSelectedChat(null);
    };

    const styles = {
        outerContainer: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #e0e0e0',
            maxWidth: '1200px', // Adjust this value as needed
            width: '100%',
        },
        columnName: {
            fontWeight: '600',
            marginRight: '20px',
            whiteSpace: 'nowrap',
            color: '#555',
            fontSize: '0.9rem',
        },
        listGroup: {
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            flex: 1,
            margin: 0,
        },
        listItem: {
            marginRight: '15px',
            flex: 'none',
            border: 'none',
            padding: '0',
        },
        link: {
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '0.9rem',
        },
    };

    return (
        <div className={`${classOption}`}>
            <div style={styles.outerContainer}>
                <div style={styles.container}>
                    <span style={styles.columnName}>Sample Demo:</span>
                    <ListGroup horizontal style={styles.listGroup}>
                        {chatData.map((chat, index) => (
                            <ListGroup.Item key={index} style={styles.listItem}>
                                <a style={styles.link} onClick={() => handleShow(chat)}>
                                    {chat.description}
                                </a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>

            {selectedChat && (
                <ChatModal
                    title={selectedChat.description}
                    chatList={selectedChat.data}
                    show={!!selectedChat}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

ChatbotDemo.propTypes = {
    chatData: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    role: PropTypes.string.isRequired,
                    content: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    classOption: PropTypes.string
};

ChatbotDemo.defaultProps = {
    classOption: "section"
};

export default ChatbotDemo;