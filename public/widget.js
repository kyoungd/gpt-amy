const http_post = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${url} - ${response.status}`);
        }

        // If response is in JSON format
        return await response.json();
        
        // If response is not in JSON format, you might want to return response.text() instead
        // return await response.text();
    } catch (error) {
        console.error('Error in HTTP POST Request:', error);
        throw error; // Re-throw the error for the caller to handle
    }
}

const get_main_domain = () => {
    let hostname = window.location.hostname;
    // Split the hostname into parts.
    let parts = hostname.split('.');
    let mainDomain = hostname;

    // Common public suffixes, including some generic and country-specific ones.
    let knownSuffixes = [
        // Generic Top-Level Domains (gTLDs)
        'com', 'org', 'net', 'info', 'biz', 'website', 'online', 'site', 'app', 'tech',
        // Sponsored Top-Level Domains (sTLDs)
        'edu', 'gov', 'mil', 'int',
        // Country Code Top-Level Domains (ccTLDs) - A small selection
        'us', 'uk', 'ca', 'de', 'fr', 'cn', 'jp', 'br', 'in', 'ru', 'au', 'nl', 'it', 'es', 'se',
        // Second-Level Domains (SLDs) and others under ccTLDs - A small selection
        'co.uk', 'gov.uk', 'edu.au', 'co.in', 'gov.in', 'com.au', 'com.br', 'com.cn',
        'co.jp', 'co.nz', 'co.za', 'com.mx', 'com.sg', 'gov.cn', 'net.au', 'org.uk', 'school.nz',
        // New gTLDs - A small selection
        'xyz', 'club', 'live', 'news', 'guru', 'digital', 'art', 'io', 'ai',
    ];
        
    // Attempt to handle generic cases and some known second-level domains (SLDs).
    if (parts.length > 2) {
        // Check last part if it's a known suffix
        let lastPart = parts[parts.length - 1];
        if (knownSuffixes.includes(lastPart)) {
            // Handle special cases for known second-level domains like 'co.uk'.
            let secondLastPart = parts[parts.length - 2] + '.' + lastPart;
            if (knownSuffixes.includes(secondLastPart)) {
                // Domain + second-level domain + TLD
                mainDomain = parts[parts.length - 3] + '.' + secondLastPart;
            } else {
                // Domain + TLD
                mainDomain = parts[parts.length - 2] + '.' + lastPart;
            }
        }
    }

    return mainDomain;
}

const deep_copy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

const enable_button = (oneButton) => {
    oneButton.disabled = false;
    oneButton.style.opacity = 1;
}

// const disable_button = (oneButton) => {
//     oneButton.disabled = true;
//     oneButton.style.opacity = 0.5; // Make button appear disabled
// }


document.addEventListener('DOMContentLoaded', function() {
    const AI_URL = "https://talkee.ai/wheel/manage";
    const INIT_AI_URL = null;

    // const INIT_AI_URL = "https://talkee.ai/api/subscriptions/initialize-ai";
    // const AI_URL = "https://talkee.ai/ai2/manage";
    // const INIT_AI_URL = "http://localhost:1337/api/subscriptions/initialize-ai";
    // const AI_URL = "http://localhost:6001/manage";
    let global_state = null;

    // Create elements
    var widget = document.createElement('div');
    var chatWindow = document.createElement('div');
    var chatHeader = document.createElement('div');
    var chatBody = document.createElement('div');
    var chatFooter = document.createElement('div');
    var chatContent = document.createElement('div');
    var inputArea = document.createElement('input');
    var sendButton = document.createElement('button');
    var toggleButton = document.createElement('button');
    var closeButton = document.createElement('button');
    var maximizeButton = document.createElement('button');

    // Set initial styles and classes
    widget.className = 'chat-widget';
    chatWindow.className = 'chat-window';
    chatHeader.className = 'chat-header';
    chatBody.className = 'chat-body';
    chatFooter.className = 'chat-footer';
    chatContent.className = 'chat-content';
    inputArea.className = 'chat-input';
    sendButton.className = 'chat-send-button';
    toggleButton.className = 'chat-toggle-button';
    closeButton.className = 'chat-close-button';
    maximizeButton.className = 'chat-maximize-button';

    // Set text content for buttons
    sendButton.textContent = 'Send';
    // toggleButton.textContent = 'AMY';

    // Modify the toggleButton creation to include a span for the text
    var toggleButtonText = document.createElement('span');
    toggleButtonText.className = 'chat-toggle-button-text';
    toggleButtonText.textContent = 'AMY';
    toggleButton.appendChild(toggleButtonText);

    closeButton.textContent = '×'; // Using the multiplication sign as a close icon
    closeButton.onclick = function() {
        chatWindow.style.display = 'none';
        toggleButton.style.display = 'block';
    };

    // set maximize button
    maximizeButton.textContent = '⛶'; // Using Unicode character for maximize icon
    maximizeButton.onclick = function() {
        if (chatWindow.classList.contains('expanded')) {
            chatWindow.classList.remove('expanded');
        } else {
            chatWindow.classList.add('expanded');
        }
    };

    // Append elements to build the structure
    chatHeader.textContent = 'Chatbox Popup'; // Placeholder text
    chatHeader.appendChild(maximizeButton);
    chatHeader.appendChild(closeButton);
    chatFooter.appendChild(inputArea);
    chatFooter.appendChild(sendButton);
    chatBody.appendChild(chatContent);
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatBody);
    chatWindow.appendChild(chatFooter);
    widget.appendChild(chatWindow);
    widget.appendChild(toggleButton);


    // Make sure the chat window is not displayed initially
    chatWindow.style.display = 'none';

    // Toggle chat window visibility when the toggle button is clicked
    toggleButton.onclick = function() {
        chatWindow.style.display = 'flex';
        toggleButton.style.display = 'none';
    };

    // Add message function
    function addMessage(user, text) {
        var message = document.createElement('p');
        message.textContent = user + ': ' + text;
        message.style.backgroundColor = user === 'Me' ? '#e0ffe0' : '#e0e0ff';
        chatContent.appendChild(message);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    const talk_to_ai = (call_object) => {
        http_post(AI_URL, call_object)
        .then((data) => {
            global_state = deep_copy(data);
            addMessage('AI', global_state.message)
            enable_button(sendButton);
        })
        .catch((error) => {
            const error_message = `error: ${error}`;
            addMessage('AI', error_message);
            enable_button(sendButton);
        });
    }

    const sendMessage = () => {
        var text = inputArea.value.trim();
        if (text === '') {
            return;
        }
        addMessage('Me', text);
        const call_object = {
            'data': global_state,
            'message': text
        }
        talk_to_ai(call_object);
        inputArea.value = '';
    }

    // Event listener for the Enter key in the input area
    inputArea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action (newline) on Enter key
            sendMessage();
        }
    });

    // Styles - Insert CSS directly into the page
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .chat-widget {
            position: fixed;
            z-index: 10000;
        }
        .chat-window {
            max-width: 90vw; /* Ensure it doesn't exceed 90% of the viewport width */
            max-height: 90vh; /* Ensure it doesn't exceed 90% of the viewport height */
            display: none; /* Use flex layout */
            flex-direction: column; /* Stack children vertically */
            justify-content: space-between; /* Space between header and footer */
            width: 300px;
            min-height: 400px;
            background-color: #FFF;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transform: translateZ(0); /* For better performance on drag */
        }
        .chat-header {
            position: relative; /* For absolute positioning of the close button */
            background-color: #4E5C6E;
            color: #FFFFFF;
            padding: 10px;
            text-align: center;
        }
        .chat-close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background: #4E5C6E; /* Matching the header background */
            color: #FFFFFF;
            font-size: 16px;
            cursor: pointer;
            width: 30px; /* Size for the circle */
            height: 30px; /* Size for the circle */
            border-radius: 50%; /* Make it round */
            display: flex; /* Center the content inside the button */
            align-items: center; /* Align vertically */
            justify-content: center; /* Align horizontally */
            transition: background-color 0.3s; /* Smooth transition for background color */
        }
        .chat-close-button:hover {
            background-color: #687C8A; /* Lighter background on hover */
        }
        .chat-body {
            overflow-y: auto;
            padding: 10px;
            flex: 1;
            display: flex; /* Use flexbox to manage the content */
            flex-direction: column; /* Stack the chat messages vertically */
        }
        .chat-footer {
            display: flex;
            padding: 10px;
            background-color: #F4F7F9;
            border-top: 1px solid #E4E4E4;
        }
        .chat-content {
            flex-grow: 1; /* Grow to take available space, pushing footer down */
            overflow-y: auto; /* Enable vertical scrolling */
            padding: 10px;
        }
        .chat-input {
            flex-grow: 1; /* Input field should grow to fill the space */
            border: 1px solid #E4E4E4;
            border-radius: 4px;
            padding: 10px;
            margin-right: 10px;
        }
        .chat-send-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .chat-send-button:hover {
            background-color: #43A047; /* Darker shade of green for hover */
        }
        .chat-toggle-button {
            background: linear-gradient(135deg, #4B0082, #00FFFF);
            color: white;
            padding: 10px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            position: fixed;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: transform 0.3s ease; /* Add a smooth transition for the size change */
        }

        .chat-toggle-button::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, #fff, transparent);
            animation: rotate 4s linear infinite;
        }

        .chat-toggle-button::after {
            content: "";
            position: absolute;
            top: 4px;
            left: 4px;
            right: 4px;
            bottom: 4px;
            background-color: #1C2331;
            border-radius: 50%;
            z-index: 1;
        }

        .chat-toggle-button-text {
            position: relative;
            z-index: 2;
            background: linear-gradient(135deg, #E0E0E0, #C0C0C0, #E0E0E0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 18px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .chat-toggle-button:hover {
            background-color: #3B4C59;
            transform: scale(1.1); /* Increase the size by 10% on hover */
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .my-message {
            background-color: #DCF8C6;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 10px;
            align-self: flex-end;
        }
        .ai-message {
            background-color: #E5E5EA;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 10px;
            align-self: flex-start;
        }
        .chat-maximize-button {
            position: absolute;
            top: 10px;
            left: 10px;
            border: none;
            background: #4E5C6E;
            color: #FFFFFF;
            font-size: 16px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
        }
        
        .chat-maximize-button:hover {
            background-color: #687C8A;
        }
        
        .expanded {
            width: 50vw; /* Example: Use 50% of the viewport width */
            height: 75vh; /* Example: Use 75% of the viewport height */
            max-height: 75vh; /* Ensure it doesn't exceed 75% of the viewport height */
            transition: width 0.3s, height 0.3s; /* Smooth transition for size change */
        }
        
    `;

    document.head.appendChild(styleSheet); // Append the style to the head

    // Handle sending messages
    sendButton.onclick = function() {
        sendMessage();
    };

    // Find the specific script tag using a part of its src attribute
    var scripts = document.querySelectorAll('script');
    var currentScript = Array.from(scripts).find(scr => scr.src.includes('widget.js'));
    var token = currentScript ? currentScript.getAttribute('data-token') : null;
    var windowPosition = currentScript ? currentScript.getAttribute('data-window-position') || 'bottom-right' : 'bottom-right';

    // Update the position based on the "window-position" parameter
    if (windowPosition === 'top-right') {
        widget.style.top = '20px';
        widget.style.right = '20px';
        toggleButton.style.top = '20px';
        toggleButton.style.right = '20px';
    } else {
        widget.style.bottom = '20px';
        widget.style.right = '20px';
        toggleButton.style.bottom = '20px';
        toggleButton.style.right = '20px';
    }

    if (!global_state) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const json_body = {
            'subscription_external_id': token,
            'timezone': timezone,
            'caller': {},
            'caller_domain': get_main_domain()
        }
        if (INIT_AI_URL) {
            http_post(INIT_AI_URL, json_body)
            .then((data) => {
                global_state = deep_copy(data.data.attributes);
                talk_to_ai(global_state);
                console.log(global_state);
            })
            .catch((error) => {
                console.error(`Error: ${json_body} ${error}`);
                widget.style.display = 'none'; // Hide the widget if the request fails
            });    
        }
        else {
            global_state = {};
            talk_to_ai(global_state);
        }
    }

    // Example usage
    // addMessage('AI', 'Welcome! Your token is ' + token);

    // Finally, append the widget to the body
    document.body.appendChild(widget);
});
