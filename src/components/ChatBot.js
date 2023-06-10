import React, { useState } from 'react';
import axios from 'axios';


const API_KEY = "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";
const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Merhaba, Ben ChatRobot! Bugün Nasıl Hissediyorsun!",
      date: "şimdi",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        message: inputText,
        date: new Date().toLocaleString(),
        sender: "user"
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputText('');
      setIsTyping(true);

      await processMessageToChatGPT(newMessages);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const data = response.data;
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          date: new Date().toLocaleString(),
          sender: "ChatGPT"
        }]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsTyping(false);
  }

  return (
    <div className="container chatBotContainer">
      <div style={{width: "95%"}} className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <p>ChatBot Geçmişi</p>
                </div>
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                <li className="clearfix">
                  <div className="about">
                    <div className="name">ChatBot</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                  </div>
                </li>
                <li className="clearfix active">
                  <div className="about">
                    <div className="name">ChatBot</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="chat-about">
                  <h6 className="m-b-0">ChatBot</h6>
                  <small>Last seen: {messages[messages.length - 1].date}</small>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {messages.map((message, index) => (
                    <li className={`clearfix ${message.sender === 'user' ? 'me' : ''}`} key={index}>
                      <div className="message-data">
                        <span className="message-data-time">{message.date}</span>
                      </div>
                      <div className={`message ${message.sender === 'user' ? 'my-message float-right' : 'other-message'}`}>
                        {message.message}
                      </div>
                    </li>
                  ))}
                  {isTyping && (
                    <li>
                      <div className="message-data align-right">
                        <span className="message-data-time">...</span>
                      </div>
                      <div className="message other-message float-right typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend"></div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mesajınızı giriniz..."
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className="chatsend-button" onClick={handleSendMessage}>
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;