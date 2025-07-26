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
import paperPlaneOutline from '@iconify/icons-eva/paper-plane-outline';
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

    // Format markdown-style text
    return formatMarkdownText(text);
  };

  const formatMarkdownText = (text) => {
    // Split text into lines
    const lines = text.split('\n');
    const elements = [];
    
    lines.forEach((line, index) => {
      if (line.trim() === '') {
        elements.push(<br key={`br-${index}`} />);
        return;
      }
      
      // Handle bold headers (**text:**)
      if (line.match(/^\*\*.*:\*\*$/)) {
        const headerText = line.replace(/^\*\*/, '').replace(/:\*\*$/, '');
        elements.push(
          <div key={index} className="font-semibold text-gray-900 mt-3 mb-2 first:mt-0">
            {headerText}:
          </div>
        );
      }
      // Handle bullet points (- **text:** description)
      else if (line.match(/^- \*\*.*\*\*/)) {
        const match = line.match(/^- \*\*(.*?)\*\*(.*)$/);
        if (match) {
          elements.push(
            <div key={index} className="flex items-start ml-4 mb-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <div>
                <span className="font-medium text-gray-800">{match[1]}:</span>
                <span className="text-gray-700">{match[2]}</span>
              </div>
            </div>
          );
        }
      }
      // Handle regular bullet points (- text)
      else if (line.match(/^- /)) {
        const bulletText = line.replace(/^- /, '');
        elements.push(
          <div key={index} className="flex items-start ml-4 mb-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">{bulletText}</span>
          </div>
        );
      }
      // Handle regular text
      else {
        elements.push(
          <div key={index} className="text-gray-700 mb-1">
            {line}
          </div>
        );
      }
    });
    
    return <div className="space-y-1">{elements}</div>;
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
      className={`audio-button cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors duration-200 ${isAudioEnabled ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} ${isAudioInitializing ? 'animate-pulse' : ''}`}
      title={isAudioEnabled ? "Disable audio" : "Enable audio"}
    >
      <Icon icon={isAudioEnabled ? microphoneOffOutline : microphoneOutline} style={{ fontSize: '1.25rem' }} />
    </div>
  );

  return (
    <div id="bot-container" className={`${classOption}`}>
      <div className="chatbot-interface bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="header-row flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex-1">
            <h3 className="text-center text-lg font-medium text-gray-900">{title}</h3>
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
        <div className="chat-history-box h-96 overflow-y-auto px-6 py-4 bg-white">
          <div className="messages-container space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`message-item flex ${message.name === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.name === 'AI' ? 'bg-gray-100 text-gray-800 max-w-[75%]' : 'bg-blue-500 text-white max-w-md'}`}>
                  {message.name === 'AI' ? (
                    renderMessageContent(message.text)
                  ) : (
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="user-input-section px-6 py-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isCompleted || isAudioEnabled}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:border-none text-sm placeholder-gray-500 px-2 py-2"
                style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
              />
              <button
                type="submit"
                disabled={isCompleted || isAudioEnabled || !userInput.trim()}
                className="ml-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-colors duration-200 flex-shrink-0"
              >
                <Icon icon={paperPlaneOutline} style={{ fontSize: '1rem' }} />
              </button>
            </div>
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