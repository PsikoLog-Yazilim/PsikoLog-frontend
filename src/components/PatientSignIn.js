import React, { useState, useEffect } from 'react';
import { loginPatient } from '../actions/PatientActions';
import { PATIENT_LOGGEDIN, PATIENT_LOGIN_ERROR } from '../constants/ActionTypes';
import patientStore from '../stores/PatientStore';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const PatientSignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoggedIn = (token) => {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      window.alert("Giriş başarılı!");
      navigate("/");
    };
  
    const handleLoginError = () => {
      console.log("Hatalı giriş yapıldı.");
      window.alert("Hatalı giriş!");
    };
  
    patientStore.on(PATIENT_LOGGEDIN, handleLoggedIn);
    patientStore.on(PATIENT_LOGIN_ERROR, handleLoginError);
  
    return () => {
      patientStore.off(PATIENT_LOGGEDIN, handleLoggedIn);
      patientStore.off(PATIENT_LOGIN_ERROR, handleLoginError);
    };
  }, [navigate, setIsLoggedIn]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginPatient(formData);
  };

  const { email, password } = formData;

  return (
    <Container style={{width: "95%"}} className="d-flex containerForm2">
      <div className="form-con">
        <h2>Hasta Giriş Yap</h2>
        <Form onSubmit={handleSubmit}>
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
          <div className="text-center">
          <Button variant="btn custom-btn-primary" type="submit" style={{ margin: '5px' }}>Giriş Yap</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default PatientSignIn;