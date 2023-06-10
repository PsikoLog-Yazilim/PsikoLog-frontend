import React, { useState, useEffect } from 'react';
import psychologistStore from '../stores/PsychologistStore';
import { registerPsychologist } from '../actions/PsychologistActions';
import { PSYCHOLOGIST_REGISTERED, PSYCHOLOGIST_REGISTER_ERROR } from '../constants/ActionTypes';
import { Container, Form, Button } from 'react-bootstrap';

const PsychologistSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
  });

  useEffect(() => {
    const handleRegistered = () => {
      window.alert("Kayıt başarılı!");
    };

    const handleRegisterError = () => {
      console.log("Kayit basarisiz.");
      window.alert("Kayit basarisiz!!");
    };

    psychologistStore.on(PSYCHOLOGIST_REGISTERED, handleRegistered);
    psychologistStore.on(PSYCHOLOGIST_REGISTER_ERROR, handleRegisterError);

    return () => {
      psychologistStore.off(PSYCHOLOGIST_REGISTERED, handleRegistered);
      psychologistStore.off(PSYCHOLOGIST_REGISTER_ERROR, handleRegisterError);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerPsychologist(formData);
  };

  const { email, password, confirmPassword, name, surname } = formData;

  return (
    <Container className="d-flex containerForm2">
      <div className="form-con">
        <h2>Psikolog Kayıt Ol</h2>
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
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Şifre Tekrarı:</Form.Label>
            <Form.Control
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

export default PsychologistSignUp;
