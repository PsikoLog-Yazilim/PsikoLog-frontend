import React, { useState, useEffect } from 'react';
import { registerPatient } from '../actions/PatientActions';
import { PATIENT_REGISTERED, PATIENT_REGISTER_ERROR } from '../constants/ActionTypes';
import { Container, Form, Button } from 'react-bootstrap';
import patientStore from '../stores/PatientStore';


const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: ''
  });

  useEffect(() => {
    console.log("PatientSignUp useEffect çalıştı!");

    const handleRegistered = () => {
      window.alert("Kayıt başarılı!");
    };

    const handleRegisterError = () => {
      console.log("Kayit basarisiz.");
      window.alert("Kayit basarisiz!!");
    };

    patientStore.on(PATIENT_REGISTERED, handleRegistered);
    patientStore.on(PATIENT_REGISTER_ERROR, handleRegisterError);

    return () => {
      console.log("PatientSignUp useEffect");
      patientStore.off(PATIENT_REGISTERED, handleRegistered);
      patientStore.on(PATIENT_REGISTER_ERROR, handleRegisterError);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    console.log("PatientSignUp handlesubmit");
    event.preventDefault();
    registerPatient(formData);
  };

  const { email, password, confirmPassword, name, surname } = formData;

  return (
    <Container className="d-flex containerForm2">
      <div className="form-con">
        <h2>Hasta Kayıt Ol</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>İsim:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="surname">
            <Form.Label>Soyisim:</Form.Label>
            <Form.Control 
              type="text"
              name="surname"
              value={surname}
              className="custom-form-control"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>E-posta:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Şifre:</Form.Label>
            <Form.Control className="custom-form-group"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Şifre Tekrarı:</Form.Label>
            <Form.Control className="custom-form-group"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <div className="text-center">
          <Button variant="btn custom-btn-primary" type="submit">Kayıt Ol</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default PatientSignUp;
