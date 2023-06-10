import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createAppointment } from '../actions/PatientActions';
import { APPOINTMENT_CREATED, PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import { useEffect } from 'react';
import patientStore from '../stores/PatientStore';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import appStore from '../stores/AppStore';
import { getPsychologist } from '../actions/AppActions';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';

const CreateAppointment = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const patientId = decodedToken.userId;
    const { id } = useParams();
    const psychologistId = id;

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    const [psychologist, setPsychologist] = useState(null);
    
    useEffect(() => {

        getPsychologist({ id });
        console.log("useEffect: " + psychologistId);

        const handlePsychologistFetched = (data) => {
            setPsychologist(data);
        }

        const handleAppointmentCreated = (data) => {
            window.alert(data.message);
            navigate("/psychologists/" + psychologistId);
        };

        appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
        patientStore.on(APPOINTMENT_CREATED, handleAppointmentCreated);

        return () => {
            appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
            patientStore.off(APPOINTMENT_CREATED, handleAppointmentCreated);
        };
    }, [id, navigate, psychologistId]);

    const handleDateChange = (e) => {
        setAppointmentDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setAppointmentTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("PsychologistId: " + psychologistId);
        console.log(JSON.stringify({ patientId, psychologistId, appointmentDate, appointmentTime }));
        
        // Randevu talebi gönderme işlemleri burada yapılacak
        // Örneğin, bir API isteği yapabilir veya başka bir işlem gerçekleştirebilirsiniz
        createAppointment({ patientId, psychologistId, appointmentDate, appointmentTime });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
          <Card className="p-4" style={{width: "95%"}}>
          <h2 className="text-center">Psikologdan Randevu Al</h2>
            {psychologist ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Psikolog Adı:</Form.Label>
                  <div className="d-flex align-items-center">
                    <BsPerson className="mr-2" />
                    <Form.Control type="text" value={psychologist.name} readOnly />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Psikolog Soyadı:</Form.Label>
                  <div className="d-flex align-items-center">
                    <BsPerson className="mr-2" />
                    <Form.Control type="text" value={psychologist.surname} readOnly />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Psikolog E-Posta:</Form.Label>
                  <div className="d-flex align-items-center">
                    <BsPerson className="mr-2" />
                    <Form.Control type="text" value={psychologist.email} readOnly />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Randevu Tarihi:</Form.Label>
                  <Form.Control
                    type="date"
                    name="appointmentDate"
                    value={appointmentDate}
                    onChange={handleDateChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Randevu Saati:</Form.Label>
                  <Form.Control
                    type="time"
                    name="appointmentTime"
                    value={appointmentTime}
                    onChange={handleTimeChange}
                    required
                  />
                </Form.Group>
                <Button style={{ margin: '5px' }} type="submit">Randevu Talebi Et</Button>
              </Form>
            ) : (
              <p>Yükleniyor...</p>
            )}
          </Card>
        </Container>
      );
};

export default CreateAppointment;
