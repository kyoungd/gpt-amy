import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col, Form, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from '@iconify/react';
import personOutline from '@iconify/icons-eva/person-outline';
import catOutline from '@iconify/icons-eva/github-outline';
import microphoneOutline from '@iconify/icons-eva/mic-outline';
import microphoneOffOutline from '@iconify/icons-eva/mic-off-outline';
import GetNextMessageSafe from "./nextMessage";
import axios from 'axios';
import VideoModal from '../VideoModal';
import ImageModal from '../ImageModal';
import { startAudio, stopAudio } from './AudioBot';

const ChatbotInterface = ({ id, title, classOption }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [callObject, setCallObject] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const messagesEndRef = useRef(null);
  const [height, setHeight] = useState('auto');
  const [aiServerUrl, setAiServerUrl] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAudioInitializing, setIsAudioInitializing] = useState(false);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
        const external_id = id;
        const url2 = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/initialize-ai`;
        const json_body = {
          'subscription_external_id': external_id,
          'timezone': timezone,
          'caller': {},
          'caller_domain': ""
        };
  
        const result2 = await axios.post(url2, json_body);
        
        if (result2.status !== 200) {
          throw new Error('Cannot initialize AI');
        }
  
        const first_object = result2.data.data.attributes;
        setAiServerUrl(first_object.ai_server_url);
        const result3 = await GetNextMessageSafe(first_object.ai_server_url, first_object);
        if (result3.success) {
          setCallObject(result3.callObject);
          setMessages((prevMessages) => [
            ...prevMessages,
            { name: "AI", text: result3.message },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setErrors((prevErrors) => [...prevErrors, error.message]);
      }
    };
  
    getMessage();
  }, [id]); 
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const setChatHistoryBoxHeight = () => {
      const chatHistoryBox = document.getElementById('bot-container');
      const parentHeight = chatHistoryBox.offsetHeight;
      
      setHeight(parentHeight + 'px');
    };

    setChatHistoryBoxHeight();
    window.addEventListener('resize', setChatHistoryBoxHeight);

    return () => {
      window.removeEventListener('resize', setChatHistoryBoxHeight);
    };
  }, []);

  const renderMessageContent = (text) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
    const imageRegex = /<a href="(https?:\/\/.*\.(?:png|jpg|jpeg|gif))"/i;
    const htmlRegex = /<[^>]+>(.*?)<\/[^>]+>/;

    const youtubeMatch = text.match(youtubeRegex);
    const imageMatch = text.match(imageRegex);

    if (youtubeMatch) {
      const videoId = youtubeMatch[0].match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/)[1];
      return (
        <span>
          {text.replace(youtubeRegex, '')}
          <VideoModal videoId={videoId} title="Watch Video" />
        </span>
      );
    } else if (imageMatch) {
      const htmlMatch = text.match(htmlRegex);
      const linkText = htmlMatch[1];
      const imageUrl = imageMatch[1];
      return (
        <ImageModal imageUrl={imageUrl} linkText={linkText} />
      );
    }

    return text;
  };

  const handleTextSubmit = async (userText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { name: "User", text: userText },
    ]);
    setUserInput("");

    try {
      const result = await GetNextMessageSafe(aiServerUrl, callObject, userText);
      if (result.success) {
        setCallObject(result.callObject);
        setMessages((prevMessages) => [
          ...prevMessages,
          { name: "AI", text: result.message },
        ]);
        if (callObject.id === 0) {
          setIsCompleted(true);
          console.log('off');
        }
        return result.message;
      } else {
        console.log('error: ', result.message);
        setErrors((prevErrors) => [...prevErrors, result.message]);
        return "AI is having some issues. Please try it again."
      }
    }
    catch(error){
        console.log('error: ', error);
        setErrors((prevErrors) => [...prevErrors, error.message]);
        return "AI is having some issues. Please try it again."
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    await handleTextSubmit(userInput);
  };

  const audioEnabled = () => {
    console.log('microphone Enabled');
    setTimeout(() => {
      setIsAudioInitializing(false);
    }, 1000); // 1000 milliseconds = 1 seconds
  }

  const audioSetupFailed = () => {
    setIsAudioInitializing(false);
    setIsAudioEnabled(false);
  }

  const toggleAudio = () => {
    if (isAudioEnabled) {
      stopAudio();
      setIsAudioEnabled(false);
    } else {
      setIsAudioInitializing(true);
      startAudio(handleTextSubmit, audioEnabled, audioSetupFailed);
      setIsAudioEnabled(true);
    }
  };

  const AudioButton = () => (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip>{isAudioEnabled ? "Disable audio" : "Enable audio"}</Tooltip>}
    >
      <div
        onClick={toggleAudio}
        className={`audio-button ${isAudioEnabled ? 'audio-enabled' : ''} ${isAudioInitializing ? 'audio-initializing' : ''}`}
      >
        <Icon icon={isAudioEnabled ? microphoneOffOutline : microphoneOutline} style={{ fontSize: '1.5rem' }} />
      </div>
    </OverlayTrigger>
  );

  return (
    <div id="bot-container" className={`${classOption}`}>
      <Container className="chatbot-interface">
        <Row className="header-row">
          <Col>
            <h3 style={{ textAlign: 'center' }}>{title.toUpperCase()}</h3>
          </Col>
          <Col xs="auto">
            <AudioButton />
          </Col>
        </Row>
        {errors.length > 0 && (
          <Row className="error-box">
            <Col>
              <div className="error-container">
                {errors.map((error, index) => (
                  <div key={index} className="error-message">
                    {error}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
        <Row className="chat-history-box" style={{height}}>
          <Col>
            <div className="messages-container">
              {messages.map((message, index) => (
                <ListGroup.Item key={index} className={message.name}>
                  <Icon icon={message.name === 'AI' ? catOutline : personOutline} /> {' '}
                  <strong>{message.name}:</strong> {renderMessageContent(message.text)}
                </ListGroup.Item>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          </Col>
        </Row>
        <Row className="user-input-section">
          <Col className="form-column">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isCompleted || isAudioEnabled}
              />
            </Form>
          </Col>
          <Col xs="auto" className="enter-button">
            <Button onClick={handleSubmit} disabled={isCompleted || isAudioEnabled}>Enter</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ChatbotInterface.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classOption: PropTypes.string
};

ChatbotInterface.defaultProps = {
    classOption: "section section-padding-t10 section-padding-bottom"
};

export default ChatbotInterface;