const http_get = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${url} - ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in HTTP GET Request:', error);
        throw error;
    }
};

const http_post = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${url} - ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in HTTP POST Request:', error);
        throw error;
    }
}

const get_main_domain = () => {
    let hostname = window.location.hostname;
    let parts = hostname.split('.');
    let mainDomain = hostname;

    let knownSuffixes = [
        'com', 'org', 'net', 'info', 'biz', 'website', 'online', 'site', 'app', 'tech',
        'edu', 'gov', 'mil', 'int',
        'us', 'uk', 'ca', 'de', 'fr', 'cn', 'jp', 'br', 'in', 'ru', 'au', 'nl', 'it', 'es', 'se',
        'co.uk', 'gov.uk', 'edu.au', 'co.in', 'gov.in', 'com.au', 'com.br', 'com.cn',
        'co.jp', 'co.nz', 'co.za', 'com.mx', 'com.sg', 'gov.cn', 'net.au', 'org.uk', 'school.nz',
        'xyz', 'club', 'live', 'news', 'guru', 'digital', 'art', 'io', 'ai'
    ];

    if (parts.length > 2) {
        let lastPart = parts[parts.length - 1];
        if (knownSuffixes.includes(lastPart)) {
            let secondLastPart = parts[parts.length - 2] + '.' + lastPart;
            if (knownSuffixes.includes(secondLastPart)) {
                mainDomain = parts[parts.length - 3] + '.' + secondLastPart;
            } else {
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

document.addEventListener('DOMContentLoaded', function() {
    const AI_URL = "https://talkee.ai/wheel/manage";
    const AI_URL_PING = "https://talkee.ai/wheel/ping";
    const INIT_AI_URL = null;

    let global_state = null;

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

    sendButton.textContent = 'Send';

    var toggleButtonText = document.createElement('span');
    toggleButtonText.className = 'chat-toggle-button-text';
    toggleButtonText.textContent = 'AMY';
    toggleButton.appendChild(toggleButtonText);

    closeButton.textContent = '×';
    closeButton.onclick = function() {
        chatWindow.style.display = 'none';
        toggleButton.style.display = 'block';
    };

    maximizeButton.textContent = '⛶';
    maximizeButton.onclick = function() {
        chatWindow.classList.toggle('expanded');
    };

    chatHeader.textContent = 'Chatbox Popup';
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

    chatWindow.style.display = 'none';

    toggleButton.onclick = function() {
        chatWindow.style.display = 'flex';
        toggleButton.style.display = 'none';
    };

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
            addMessage('AI', global_state.message);
            enable_button(sendButton);
        })
        .catch((error) => {
            addMessage('AI', `error: ${error}`);
            enable_button(sendButton);
        });
    }

    const sendMessage = () => {
        var text = inputArea.value.trim();
        if (text === '') return;

        addMessage('Me', text);
        const call_object = {
            'data': global_state,
            'message': text
        };
        talk_to_ai(call_object);
        inputArea.value = '';
    }

    inputArea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .chat-widget {
            position: fixed;
            z-index: 10000;
        }
        .chat-window {
            max-width: 90vw;
            max-height: 90vh;
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 300px;
            min-height: 400px;
            background-color: #FFF;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transform: translateZ(0);
        }
        .chat-header {
            position: relative;
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
        .chat-close-button:hover {
            background-color: #687C8A;
        }
        .chat-body {
            overflow-y: auto;
            padding: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .chat-footer {
            display: flex;
            padding: 10px;
            background-color: #F4F7F9;
            border-top: 1px solid #E4E4E4;
        }
        .chat-content {
            flex-grow: 1;
            overflow-y: auto;
            padding: 10px;
        }
        .chat-input {
            flex-grow: 1;
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
            background-color: #43A047;
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
            transition: transform 0.3s ease;
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
            transform: scale(1.1);
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
            width: 50vw;
            height: 75vh;
            max-height: 75vh;
            transition: width 0.3s, height 0.3s;
        }
    `;
    document.head.appendChild(styleSheet);

    sendButton.onclick = sendMessage;

    var scripts = document.querySelectorAll('script');
    var currentScript = Array.from(scripts).find(scr => scr.src.includes('widget.js'));
    var token = currentScript ? currentScript.getAttribute('data-token') : null;
    var windowPosition = currentScript ? currentScript.getAttribute('data-window-position') || 'bottom-right' : 'bottom-right';

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

    const pingAI = async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const data = await http_get(AI_URL_PING);
                if (data.message === "pong") {
                    return;
                }
            } catch (error) {
                if (attempt === 3) {
                    addMessage('AI', 'Error: Unable to access the AI. This may be due to strict security settings or insufficient permissions.');
                }
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    };

    const initializeChat = async () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const json_body = {
            'subscription_external_id': token,
            'timezone': timezone,
            'caller': {},
            'caller_domain': get_main_domain()
        };
        
        if (INIT_AI_URL) {
            try {
                const data = await http_post(INIT_AI_URL, json_body);
                global_state = deep_copy(data.data.attributes);
                talk_to_ai(global_state);
            } catch (error) {
                console.error(`Error: ${json_body} ${error}`);
                widget.style.display = 'none';
            }
        } else {
            global_state = json_body;
            talk_to_ai(global_state);
        }
    };

    pingAI().then(initializeChat);

    document.body.appendChild(widget);
});
