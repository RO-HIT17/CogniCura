'use client';

import React, { useState, useEffect } from 'react';
import { Card, Spacer, Chip, Button } from '@nextui-org/react';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';

const PatientAppointmentHistory: React.FC = () => {
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const p_id = localStorage.getItem('p_id');
      if (!p_id) {
        setError('Patient ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/appointments/patient/${p_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        console.log(data)
        setAppointmentHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/delete/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      setAppointmentHistory(appointmentHistory.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort the appointments: upcoming first, then by date in descending order
  const sortedAppointments = appointmentHistory.sort((a, b) => {
    if (new Date(a.starttime) > new Date()) return -1;
    if (new Date(b.starttime) > new Date()) return 1;
    return new Date(b.starttime).getTime() - new Date(a.starttime).getTime();
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Appointment History</h1>
      <div className="space-y-4">
        {sortedAppointments.map((appointment) => (
          <Card key={appointment._id}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h4>{appointment.firstName} {appointment.lastName}</h4>
                <div>
                  <Chip color="primary" variant="bordered" style={{ marginLeft: '0.5rem' }}>
                    {appointment.specialityRequired}
                  </Chip>
                  <Chip color="secondary" variant="bordered" style={{ marginLeft: '0.5rem' }}>
                    {appointment.reason}
                  </Chip>
                  <Chip color="success" variant="bordered" style={{ marginLeft: '0.5rem' }}>
                    {appointment.mode}
                  </Chip>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p>Doctor: {appointment.doc_id.firstName} {appointment.doc_id.lastName}</p>
              <p>Date: {new Date(appointment.starttime).toLocaleDateString()}</p>
              <p>Time: {new Date(appointment.starttime).toLocaleTimeString()} - {new Date(appointment.endtime).toLocaleTimeString()}</p>
              <p>Symptoms: {appointment.symptoms}</p>
              <p>Location: {appointment.location}</p>
              <p>Send Reminders: {appointment.sendRemainders ? 'Yes' : 'No'}</p>
            </CardBody>
            {new Date(appointment.starttime) > new Date() && (
              <CardFooter>
                <Button color="primary" variant="bordered" onClick={() => window.location.href = '/patient-fixapp'}>
                  Reschedule
                </Button>
                <Button color="error" variant="bordered" onClick={() => handleCancelAppointment(appointment._id)}>
                  Cancel
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
        <Spacer y={1} />
      </div>
    </div>
  );
};

export default PatientAppointmentHistory;