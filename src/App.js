import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import PatientSignUp from './components/PatientSignUp';
import PatientSignIn from './components/PatientSignIn';
import PsychologistSignUp from './components/PsychologistSignUp';
import PsychologistSignIn from './components/PsychologistSignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Psychologists from './components/Psychologists';
import ChatBot from './components/ChatBot';
import NavigationBar from './components/NavigationBar';
import { setAuthToken } from './config';
import PsychologistProfile from './components/PsychologistProfile';
import CreateAppointment from './components/CreateAppointment';
import myAxios from './config';
import Appointments from './components/Appointments';
import AddComment from './components/AddComment';
import ProtectedRoute from './components/ProtectedRoute';
import { PATIENT, PSYCHOLOGIST } from './constants/UserTypes';
import CreateBlogPost from './components/CreateBlogPost';
import BlogPost from './components/BlogPost';
import Messages from './components/Messages';
import SendMessage from './components/SendMessage';
import ChatBotMessage from './components/ChatBotMessages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    console.log(isLoggedIn);

    if (localStorage.getItem("token") != null) {
      setIsLoggedIn(true);
      setAuthToken(localStorage.getItem("token")); //Axios icin auth token
      console.log("Axios: " + myAxios.defaults.headers.common["Authorization"]);
    }
  }
    , [isLoggedIn])


  return (

    <Router>
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/patientSignUp"
            element={<PatientSignUp />}
          />
          <Route
            path="/patientSignIn"
            element={<PatientSignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/psychologistSignUp"
            element={<PsychologistSignUp />}
          />
          <Route
            path="/psychologistSignIn"
            element={<PsychologistSignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/psychologists"
            element={<Psychologists />}
          />
          <Route
            path="/psychologists/:id"
            element={<PsychologistProfile />}
          />
          <Route
            path="/createAppointment/:id"
            element={<ProtectedRoute element={<CreateAppointment />} type={PATIENT} />}
          />
          <Route
            path="/appointments"
            element={<ProtectedRoute element={<Appointments />} />}
          />
          <Route
            path="/comment/:id"
            element={<ProtectedRoute element={<AddComment />} type={PATIENT} />}
          />
          <Route
            path="/psychologist/createBlogPost"
            element={<ProtectedRoute element={<CreateBlogPost />} type={PSYCHOLOGIST} />}
          />
          <Route
            path="/chatbot"
            element={<ChatBot />}
          />
          <Route
            path="/blogPost/:postId"
            element={<BlogPost />}
          />
          <Route
            path="/messages"
            element={<ProtectedRoute element={<Messages />} />}
          />
          <Route
            path="/sendMessage/:psychologistId"
            element={<ProtectedRoute element={<SendMessage />} type={PATIENT} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
