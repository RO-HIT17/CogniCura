'use client';

import React from 'react';
import { Card, Spacer, Chip, Button } from '@nextui-org/react';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';

const PatientAppointmentHistory: React.FC = () => {
  // Mock data for demonstration
  const appointmentHistory = [
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      date: '2023-09-15',
      time: '10:00 AM - 11:00 AM',
      rating: 4.5,
      contact: '123-456-7890',
      email: 'john.doe@example.com',
      tags: ['Cardiology', 'Follow-up'],
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      date: '2023-08-20',
      time: '2:00 PM - 3:00 PM',
      rating: 4.7,
      contact: '987-654-3210',
      email: 'jane.smith@example.com',
      tags: ['Dermatology', 'Consultation'],
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Johnson',
      date: '2023-10-10',
      time: '1:00 PM - 2:00 PM',
      rating: 4.9,
      contact: '555-123-4567',
      email: 'emily.johnson@example.com',
      tags: ['Upcoming Appointment', 'New Appointment'],
    },
    {
      id: 4,
      doctorName: 'Dr. Michael Brown',
      date: '2023-07-05',
      time: '11:00 AM - 12:00 PM',
      rating: 4.3,
      contact: '444-555-6666',
      email: 'michael.brown@example.com',
      tags: ['Orthopedics', 'Surgery'],
    },
    // Add more mock appointments as needed
  ];

  // Sort the appointments: upcoming first, then by date in descending order
  const sortedAppointments = appointmentHistory.sort((a, b) => {
    if (a.tags.includes('Upcoming Appointment')) return -1;
    if (b.tags.includes('Upcoming Appointment')) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Appointment History</h1>
      <div className="space-y-4">
        {sortedAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h4>{appointment.doctorName}</h4>
                <div>
                  {appointment.tags.map((tag, index) => (
                    <Chip key={index} color="primary" variant="bordered" style={{ marginLeft: '0.5rem' }}>
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Given Rating: {appointment.rating}</p>
              <p>Contact: {appointment.contact}</p>
              <p>Email: {appointment.email}</p>
            </CardBody>
            {appointment.tags.includes('Upcoming Appointment') && (
              <CardFooter>
                <Button color="primary" variant="bordered" onClick={() => window.location.href = '/patient-fixapp'}  >
                  Reschedule
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