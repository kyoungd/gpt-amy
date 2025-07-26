import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
  // Height is now controlled by CSS
  const [aiServerUrl, setAiServerUrl] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAudioInitializing, setIsAudioInitializing] = useState(false);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  

        const external_id = id;
        const url2 = `${process.env.REACT_APP_AI_URL}/first-object`;
        console.log('--- url2:', url2);
        console.log('Base URL:', process.env.REACT_APP_AI_URL);
        console.log('Constructed URL:', url2);

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
  
        const first_object = result2.data;
        let ai_url_path = "";
        switch (id) {
          case process.env.REACT_APP_TIRE_STORE_ID:
            ai_url_path = 'tirestore';
            break;
          case process.env.REACT_APP_TRIAL_OFFER_ID:
            ai_url_path = 'trialoffer';
            break;
          case process.env.REACT_APP_CAR_PART_ID:
            ai_url_path = 'carpart';
            break;
          case process.env.REACT_APP_APPOINTMENT_ID:
            ai_url_path = 'appointment';
            break;
          case process.env.REACT_APP_COMPLIANCE_ID:
            ai_url_path = 'compliance';
            break;
          case process.env.REACT_APP_STARRCO_ID:
            ai_url_path = 'starrco';
            break;
        }
        const ai_url = `${process.env.REACT_APP_AI_URL}/${ai_url_path}`;
        first_object.ai_server_url = ai_url;
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
      // Get the container element
      const container = document.querySelector('.chat-history-box');
      if (container) {
        // Scroll only the container, not the whole page
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  // Height is now controlled by CSS with responsive media queries

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

  // Use a ref to always get the latest callObject
  const callObjectRef = useRef(callObject);

  // Update the ref whenever callObject changes
  useEffect(() => {
    callObjectRef.current = callObject;
  }, [callObject]);

  const directCallToAI = async (userText) => {
    const result = await GetNextMessageSafe(aiServerUrl, callObjectRef.current, userText);
    return result;
  }

  const handleTextSubmit = async (userText, result = null) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { name: "User", text: userText },
    ]);
    setUserInput("");

    try {
      if (!result)
        result = await GetNextMessageSafe(aiServerUrl, callObjectRef.current, userText);
      if (result.success) {

        if (result.callObject) {
          const newCallObject = _.cloneDeep(result.callObject);
          console.log('Deep cloned callObject:', newCallObject);
  
          setCallObject(newCallObject);
          console.log('Updated state callObject:', newCallObject);
        } else {
          console.error('result.callObject is null or undefined');
        }
      
        //  setCallObject(result.callObject);
        setMessages((prevMessages) => [
          ...prevMessages,
          { name: "AI", text: result.message },
        ]);
        if (result.callObject?.id === 0) {
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
    e.stopPropagation(); // Stop event propagation
    if (!userInput.trim()) return;

    // Save current scroll position
    const scrollPosition = window.scrollY;

    await handleTextSubmit(userInput);

    // Restore scroll position after a short delay
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    }, 50);
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
      startAudio(handleTextSubmit, audioEnabled, audioSetupFailed, toggleAudio, directCallToAI);
      setIsAudioEnabled(true);
    }
  };

  const AudioButton = () => (
    <div
      onClick={toggleAudio}
      className={`audio-button cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors ${isAudioEnabled ? 'audio-enabled bg-blue-100' : ''} ${isAudioInitializing ? 'audio-initializing animate-pulse' : ''}`}
      title={isAudioEnabled ? "Disable audio" : "Enable audio"}
    >
      <Icon icon={isAudioEnabled ? microphoneOffOutline : microphoneOutline} style={{ fontSize: '1.5rem' }} />
    </div>
  );

  return (
    <div id="bot-container" className={`${classOption}`}>
      <div className="chatbot-interface bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="header-row flex justify-between items-center p-4 bg-gray-50 border-b">
          <div className="flex-1">
            <h3 className="text-center text-xl font-bold text-gray-800">{title.toUpperCase()}</h3>
          </div>
          <div className="flex-shrink-0">
            <AudioButton />
          </div>
        </div>
        {errors.length > 0 && (
          <div className="error-box mb-4">
            <div className="error-container bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.map((error, index) => (
                <div key={index} className="error-message">
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="chat-history-box h-96 overflow-y-auto p-4 bg-gray-50">
          <div className="messages-container space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`message-item p-3 rounded-lg ${message.name === 'AI' ? 'bg-blue-100' : 'bg-white'} border`}>
                <div className="flex items-start space-x-2">
                  <Icon icon={message.name === 'AI' ? catOutline : personOutline} className="mt-1 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">{message.name}:</strong>
                    <span className="ml-2">{renderMessageContent(message.text)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="user-input-section p-4 bg-gray-50 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isCompleted || isAudioEnabled}
                className="flex-1"
              />
              <Button type="submit" disabled={isCompleted || isAudioEnabled}>
                Enter
              </Button>
          </form>
        </div>
      </div>
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