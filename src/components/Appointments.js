import { getAppointments } from "../actions/AppActions";
import { APPOINTMENTS_FETCHED, APPOINTMENT_APPROVED, APPOINTMENT_DECLINED, APPOINTMENT_DELETED } from "../constants/ActionTypes";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import appStore from "../stores/AppStore";
import { deleteAppointment } from "../actions/PatientActions";
import patientStore from "../stores/PatientStore";
import { approveAppointment, declineAppointment } from "../actions/PsychologistActions";
import psychologistStore from "../stores/PsychologistStore";
import { PATIENT, PSYCHOLOGIST } from "../constants/UserTypes";
import { Container, Card, Button } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

const Appointments = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId;
    const userType = decodedToken.userType;

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        getAppointments({ id, userType });

        const handleAppointmentsFetched = (data) => {
            const formattedAppointments = data.map((appointment) => {
                const date = new Date(appointment.appointment_date);
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                return { ...appointment, appointment_date: formattedDate };
            });
            setAppointments(formattedAppointments);
        };

        const handleAppointmentDeleted = () => {
            window.alert("Randevu iptal edildi.");
            getAppointments({ id, userType });
        }

        const handleAppointmentApproved = () => {
            window.alert("Randevu onaylandi.");
            getAppointments({ id, userType });
        }

        const handleAppointmentDeclined = () => {
            window.alert("Randevu reddedildi.");
            getAppointments({ id, userType });
        }

        appStore.on(APPOINTMENTS_FETCHED, handleAppointmentsFetched);

        if (userType === PATIENT) {
            patientStore.on(APPOINTMENT_DELETED, handleAppointmentDeleted);
        }
        else if (userType === PSYCHOLOGIST) {
            psychologistStore.on(APPOINTMENT_APPROVED, handleAppointmentApproved);
            psychologistStore.on(APPOINTMENT_DECLINED, handleAppointmentDeclined);
        }

        return () => {
            appStore.off(APPOINTMENTS_FETCHED, handleAppointmentsFetched);
            if (userType === PATIENT) {
                patientStore.off(APPOINTMENT_DELETED, handleAppointmentDeleted);
            }
            else if (userType === PSYCHOLOGIST) {
                psychologistStore.off(APPOINTMENT_APPROVED, handleAppointmentApproved);
                psychologistStore.off(APPOINTMENT_DECLINED, handleAppointmentDeclined);
            }
        };
    }, [id, userType]);

    const handleCancelAppointment = (appointmentId) => {
        deleteAppointment({ appointmentId });
    }

    const handleApproveAppointment = (appointmentId) => {
        approveAppointment(appointmentId);
    }

    const handleDeclineAppointment = (appointmentId) => {
        declineAppointment(appointmentId);
    }

    

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <div style={{ width: "95%"}}>
            <h2 className="text-center">Randevu Talepleri</h2>
                <Card className="bg-white mb-3" style={{ width: '85%', margin: '0 auto' }}>
                    <Card.Body style={{ padding: '1rem' }}>
                        <div className="card-container">
                            {appointments.map((appointment) => (
                                <Card key={appointment.id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>
                                            Durum:{" "}
                                            {appointment.status !== "pending" ? (
                                                appointment.status === "approved" ? (
                                                    <span style={{ color: "green" }}>Onaylandı</span>
                                                ) : appointment.status === "declined" ? (
                                                    <span style={{ color: "red" }}>Reddedildi</span>
                                                ) : (
                                                    <span>Yanıtlanmadı</span>
                                                )
                                            ) : (
                                                userType === PATIENT ? (
                                                    <button style={{ margin: '5px' }} onClick={() => handleCancelAppointment(appointment.id)}>İptal Et</button>
                                                ) : (
                                                    <div>
                                                        <button style={{ margin: '5px' }} onClick={() => handleApproveAppointment(appointment.id)}>
                                                            <BsCheck />
                                                        </button>
                                                        <button style={{ margin: '5px' }} onClick={() => handleDeclineAppointment(appointment.id)}>
                                                            <BsX />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </Card.Title>
                                        <Card.Text>Randevu Tarihi: {appointment.appointment_date}</Card.Text>
                                        <Card.Text>Randevu Saati: {appointment.appointment_time}</Card.Text>
                                        <Card.Text>Ad: {appointment.name}</Card.Text>
                                        <Card.Text>Soyad: {appointment.surname}</Card.Text>
                                        <Card.Text>Email: {appointment.email}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );


}

export default Appointments;