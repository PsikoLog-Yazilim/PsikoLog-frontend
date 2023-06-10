import React, { useEffect, useState } from 'react';
import messageStore from '../stores/MessageStore';
import { getChatHistory, getParticipants, sendMessage } from '../actions/MessageActions';
import { CHAT_HISTORY_FETCHED, MESSAGE_SENT, PARTICIPANTS_FETCHED } from '../constants/ActionTypes';
import jwt_decode from 'jwt-decode';

const Messages = () => {
    const [users, setUsers] = useState(null); // User; id, name, surname icerir
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const myId = decodedToken.userId;

    useEffect(() => {
        // Kullanıcıların mesajlaştığı kişilerin listesini API'dan al
        console.log("getParticipants cagirildi.");
        getParticipants();

        const handleParticipantsFetched = (participants) => {
            setUsers(participants);
        }

        const handleChatHistoryFetched = (messages) => {
            setMessages(messages);
        }

        const handleMessageSent = (message) => {
            console.log(message);
            if (selectedUser && selectedUser.id) {
                getChatHistory({ id: selectedUser.id });
            }
            setNewMessage('');
        }

        messageStore.on(PARTICIPANTS_FETCHED, handleParticipantsFetched);
        messageStore.on(CHAT_HISTORY_FETCHED, handleChatHistoryFetched);
        messageStore.on(MESSAGE_SENT, handleMessageSent);

        return () => {
            messageStore.off(PARTICIPANTS_FETCHED, handleParticipantsFetched);
        }
    }, [selectedUser]);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
        // Seçilen kullanıcının geçmiş mesajlarını API'dan al
        getChatHistory({ id: user.id });
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }
        // Mesajı API'ye gönder
        sendMessage({ to: selectedUser.id, text: newMessage });
    };

    return (
      <section style={{ backgroundColor: '#eee' }}>
        <div style={{width: "95%"}} className="container py-5">
          <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">Kişiler</h5>
              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {users &&
                      users.map((user) => (
                        <li className="p-2 border-bottom" style={{ backgroundColor: '#eee' }}>
                          <a
                            href="#!"
                            className="card-header d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                              />
    
                              <div
                                className="pt-1"
                                key={user.id}
                                onClick={() => handleUserSelection(user)}
                                style={{ cursor: 'pointer', color: 'blue' }}
                              >
                                <p className="fw-bold mb-0">
                                  {user.name} {user.surname}
                                </p>
                                <p className="small text-muted"></p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <span className="badge bg-danger float-end">1</span>
                            </div>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-7 col-xl-8">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">Chat</h5>
    
              <div className="card">
                {selectedUser && messages && (
                  <>
                    <h3 className="chatBaslikisim" style={{ margin: '10px ' }}>
                      {selectedUser.name} {selectedUser.surname}
                    </h3>
                    <div className="card-body">
                      {messages.map((message, index) => (
                        <div
                          className={`chat-message ${
                            message.sender_id === myId
                              ? 'chat-message-right'
                              : 'chat-message-left'
                          }`}
                          key={index}
                        >
                          <div className="chat-message-content bg-light">
                            <p>{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="card-footer">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleSendMessage}
                        >
                          Gönder
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    
      
};

export default Messages;