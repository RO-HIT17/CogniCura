'use client';

import React, { useState } from 'react';
import { Input, Button, Calendar, Card, Spacer, Chip } from '@nextui-org/react';
import { today, getLocalTimeZone, isWeekend } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';

const PatientAppointmentFixing: React.FC = () => {
  const [appointmentDate, setAppointmentDate] = useState(today(getLocalTimeZone()));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [view, setView] = useState('form');
  const { locale } = useLocale();

  const isLimitedAvailability = isWeekend(appointmentDate, locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitedAvailability) {
      alert('Limited availability of doctors on weekends. Please be patient!');
    } else {
      const doctors = await fetchAvailableDoctors(appointmentDate, startTime, endTime);
      setAvailableDoctors(doctors);
      setView('doctors');
    }
    console.log('Appointment Date:', appointmentDate);
  };

  const fetchAvailableDoctors = async (date, startTime, endTime) => {
    return [
      { id: 1, name: 'Dr. John Doe', rating: 4.5, availableTime: '10:00 AM - 12:00 PM', contact: '123-456-7890', email: 'john.doe@example.com', tags: ['Previously Visited', 'Most Experienced'] },
      { id: 2, name: 'Dr. Jane Smith', rating: 4.7, availableTime: '1:00 PM - 3:00 PM', contact: '987-654-3210', email: 'jane.smith@example.com', tags: ['Most Experienced'] },
    ];
  };

  const handleFixAppointment = async () => {
    const appointmentData = {
      patient_id: '671b607a34ffb80c3c018d6a',
      doctor_id: "671b5a36b5683674555b4009",
      appointment_time: `${appointmentDate.toString()}T${startTime}:00Z`,
      startTime: `${appointmentDate.toString()}T${startTime}:00Z`,
      endTime: `${appointmentDate.toString()}T${endTime}:00Z`,
      status: 'scheduled',
      reason: 'routine check-up',
      calendar_event_id: 'example_calendar_event_id',
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to fix appointment');
      }

      const data = await response.json();
      console.log('Appointment fixed successfully:', data);
      window.location.href = '/patient-app-history';

    } catch (error) {
      console.error('Error fixing appointment:', error);
      alert('Failed to fix appointment. Please try again later.');
    }
    window.location.href = '/patient-app-history';
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fix Patient Appointment</h1>
      {view === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Calendar
              aria-label="Select Appointment Date"
              value={appointmentDate}
              onChange={setAppointmentDate}
              isInvalid={isLimitedAvailability}
              errorMessage={
                isLimitedAvailability ? 'Warning: Limited availability of doctors on weekends.' : undefined
              }
              required
              variant="bordered"
              color="primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Available From"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              variant="bordered"
              color="primary"
            />
            <Input
              label="Available To"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              variant="bordered"
              color="primary"
            />
          </div>
          <Button type="submit" color="primary" variant="bordered">Schedule Appointment</Button>
        </form>
      ) : (
        <div className="space-y-4">
          {availableDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <h4>{doctor.name}</h4>
                  <div>
                    {doctor.tags.map((tag, index) => (
                      <Chip key={index} color="primary" variant="bordered" style={{ marginLeft: '0.5rem' }}>
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p>Rating: {doctor.rating}</p>
                <p>Available Time: {doctor.availableTime}</p>
                <p>Date: {appointmentDate.toString()}</p>
                <p>Contact: {doctor.contact}</p>
                <p>Email: {doctor.email}</p>
              </CardBody>
              <CardFooter>
                <Button onClick={() => handleFixAppointment(doctor.id)} color="primary" variant="bordered">
                  Fix Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Spacer y={1} />
          <Button onClick={() => setView('form')} color="secondary" variant="bordered">Pick Another Date/Time</Button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentFixing;
