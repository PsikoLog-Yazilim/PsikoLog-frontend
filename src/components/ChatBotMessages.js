








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
        <div>
            <h1>Mesajlarım Sayfası</h1>
            <div>
                <h2>Kullanıcılar</h2>
                <ul>
                    {users && users.map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleUserSelection(user)}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        >
                            <b>{user.name} {user.surname}</b>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Geçmiş Mesajlar</h2>
                {selectedUser && messages && (
                    <>
                        <h3>{selectedUser.name} {selectedUser.surname}</h3>
                        <ul>
                            {messages.map((message, index) => (
                                <li
                                    key={index}>
                                    {message.sender_id === myId ? <h4>Ben: </h4> : <h4>Psikolog: </h4>}{message.message}
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Gönder</button>
                    </>
                )}
            </div>
        </div>
    );

}

export default Messages;





