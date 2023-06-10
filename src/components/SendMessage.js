import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologist } from '../actions/AppActions';
import appStore from '../stores/AppStore';
import { PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import { sendMessage } from '../actions/MessageActions';
import messageStore from '../stores/MessageStore';
import { MESSAGE_SENT } from '../constants/ActionTypes';
import { useNavigate } from 'react-router-dom';

function SendMessage() {
    const [message, setMessage] = useState('');
    const [psychologist, setPsychologist] = useState(null);
    const { psychologistId } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
        //burası psychologistId
        getPsychologist({ id: psychologistId });

        const handlePsychologistFetched = (psychologist) => {
            setPsychologist(psychologist);
        }

        const handleMessageSent = (message) => {
            window.alert(message);
            navigate('/psychologists/' + psychologistId);
        }

        appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
        messageStore.on(MESSAGE_SENT, handleMessageSent);

        return () => {
            appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
            messageStore.off(MESSAGE_SENT, handleMessageSent);
        }
    }, [psychologistId, navigate])

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Mesaj gönderme işlemleri burada gerçekleştirilebilir
        sendMessage({ to: psychologist.id, text: message});
    };

    return (
        <div>
            {psychologist ? (<div><h2>Mesaj Gönder</h2>
            <div>
                <label>Psikolog Adı: {psychologist.name}</label>
            </div>
            <div>
                <label>Psikolog Soyadı: {psychologist.surname}</label>
            </div>
            <div>
                <label>Mesaj:</label>
                <input type="text" value={message} onChange={handleMessageChange} />
            </div>
            <button onClick={handleSubmit}>Gönder</button></div>) : (<p>Yükleniyor...</p>)}
        </div>
    );
}

export default SendMessage;
