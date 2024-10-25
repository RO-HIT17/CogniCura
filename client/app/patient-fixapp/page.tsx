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
  const [view, setView] = useState('form'); // 'form' or 'doctors'
  const { locale } = useLocale();

  // Check if the selected date falls on a weekend
  const isLimitedAvailability = isWeekend(appointmentDate, locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitedAvailability) {
      alert('Limited availability of doctors on weekends. Please be patient!');
    } else {
      // Fetch available doctors
      const doctors = await fetchAvailableDoctors(appointmentDate, startTime, endTime);
      setAvailableDoctors(doctors);
      setView('doctors');
    }
    console.log('Appointment Date:', appointmentDate);
  };

  const fetchAvailableDoctors = async (date, startTime, endTime) => {
    // Mock API call to fetch doctors
    return [
      { id: 1, name: 'Dr. John Doe', rating: 4.5, availableTime: '10:00 AM - 12:00 PM', contact: '123-456-7890', email: 'john.doe@example.com', tags: ['Previously Visited', 'Most Experienced'] },
      { id: 2, name: 'Dr. Jane Smith', rating: 4.7, availableTime: '1:00 PM - 3:00 PM', contact: '987-654-3210', email: 'jane.smith@example.com', tags: ['Most Experienced'] },
      // Add more mock doctors as needed
    ];
  };

  const handleFixAppointment = (doctorId) => {
    // Handle fixing the appointment with the selected doctor
    console.log('Fixing appointment with doctor ID:', doctorId);
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
                isLimitedAvailability
                  ? 'Warning:Limited availability of doctors on weekends.'
                  : undefined
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
                <Button
                    onClick={() => {
                        handleFixAppointment(doctor.id);
                        window.location.href = '/patient-app-history';
                    }}
                    color="primary"
                    variant="bordered"
                >
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