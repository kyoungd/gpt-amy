import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { Icon } from '@iconify/react';
import personOutline from '@iconify/icons-eva/person-outline';
import catOutline from '@iconify/icons-eva/github-outline';
import GetNextMessageSafe from "./nextMessage";
import axios from 'axios';

const ChatbotInterface = ({ jwt }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [callObject, setCallObject] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const messagesEndRef = useRef(null);
  const [height, setHeight] = useState('auto');
  const [aiTraining, setAiTraining] = useState(false);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url1 = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/active`;
        
        const result1 = await axios.get(url1, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        
        if (result1.status !== 200) {
          throw new Error('No active subscription');
        }
  
        const external_id = result1.data.data[0].attributes.subscription_external_id;
        const url2 = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/initialize-ai`;
        const json_body = {
          'subscription_external_id': external_id,
          'timezone': timezone,
          'caller': {},
          'caller_domain': ""
        };
  
        const result2 = await axios.post(url2, json_body, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        
        if (result2.status !== 200) {
          throw new Error('Cannot initialize AI');
        }
  
        const first_object = result2.data.data.attributes;
        const result3 = await GetNextMessageSafe(first_object);
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
  }, []); 
  
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

  useEffect(() => {
    const fetchAiTrainingStatus = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/is-ai-training`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        const is_ai_training = result.data.data.attributes.is_ai_training;
        setAiTraining(is_ai_training);
      } catch (error) {
        console.error('Failed to fetch AI training status:', error);
      }
    };
  
    fetchAiTrainingStatus();  // Call it immediately to check the status initially.
  
    const interval = setInterval(() => {
      if (aiTraining) {
        fetchAiTrainingStatus().catch(error => {
          console.error('Error during interval fetching:', error);
        });
      } else {
        clearInterval(interval);
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [aiTraining, jwt]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { name: "User", text: userInput },
    ]);

    GetNextMessageSafe(callObject, userInput)
      .then((result) => {
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
        } else {
          console.log('error: ', result.message);
          setErrors((prevErrors) => [...prevErrors, result.message]);
        }
      })
      .catch((error) => {
        console.log('error: ', error);
        setErrors((prevErrors) => [...prevErrors, error.message]);
      });

    setUserInput("");
  };

  return (
    <div id="bot-container" className={`section section-padding-t90 section-padding-bottom`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center', flexGrow: 1 }}>Test Your AI</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h6 style={{ textAlign: 'center', flexGrow: 1 }}>
            {!aiTraining && <p>Test your personalized AI chatbot here.</p>}
            {aiTraining && <span style={{ color: 'red', marginLeft: '10px' }}>AI training in progress...</span>}
          </h6>
      </div>
      <Container className="chatbot-interface">
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
                  <Icon icon={message.name === 'AI' ? catOutline : personOutline} /> {' '} <strong>{message.name}:</strong> {message.text}
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
                disabled = { isCompleted }
              />
            </Form>
          </Col>
          <Col xs="auto" className="enter-button">
            <Button onClick={handleSubmit} disabled = { isCompleted }>Enter</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ChatbotInterface.propTypes = {
  jwt: PropTypes.string.isRequired,
};

export default ChatbotInterface;
