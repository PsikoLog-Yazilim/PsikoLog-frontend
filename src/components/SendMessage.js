import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologist } from '../actions/AppActions';
import appStore from '../stores/AppStore';
import { PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import { sendMessage } from '../actions/MessageActions';
import messageStore from '../stores/MessageStore';
import { MESSAGE_SENT } from '../constants/ActionTypes';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function SendMessage() {
    const [message, setMessage] = useState('');
    const [psychologist, setPsychologist] = useState(null);
    const { psychologistId } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
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
        sendMessage({ to: psychologist.id, text: message});
    };

    return (
        <Container className="d-flex justify-content-start align-items-start mt-5" style={{ minHeight: '100vh' }}>
        <Card className="text-center" style={{ width: '95%'}}>
            <Card.Body>
              <Card.Title>Mesaj Gönder</Card.Title>
              {psychologist ? (
                <>
                  <div>
                    <label>Psikolog Adı: {psychologist.name}</label>
                  </div>
                  <div>
                    <label>Psikolog Soyadı: {psychologist.surname}</label>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="message">
                      <Form.Label>Mesaj:</Form.Label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsPerson />
                          </span>
                        </div>
                        <Form.Control
                          type="text"
                          value={message}
                          onChange={handleMessageChange}
                        />
                      </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ margin: '5px' }}>Gönder</Button>
                  </Form>
                </>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </Card.Body>
          </Card>
        </Container>
      );
      
}

export default SendMessage;
