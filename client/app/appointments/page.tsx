'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Input, Button } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spacer,
} from '@nextui-org/react';

interface Appointment {
  date: string; 
  time: string;
  patientName: string;
  reason: string;
  contact: string;
  symptoms: string;
  appointmentMode: string;
  files?: string[];
}

const appointmentsData: Appointment[] = [
];

const DoctorAppointmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  const filteredAppointments = appointmentsData.filter(appointment => {
    return appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const convertTimeToComparable = (time: string) => {
    const [hour, minutePart] = time.split(':');
    const [minute, period] = minutePart.split(' ');
    const hour24 = period === 'PM' ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;
    return new Date(`1970-01-01T${hour24.toString().padStart(2, '0')}:${minute}:00`);
  };

  const sortedFilteredAppointments = filteredAppointments.sort((a, b) => {
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison === 0) {
      return convertTimeToComparable(a.time).getTime() - convertTimeToComparable(b.time).getTime();
    }
    return dateComparison;
  });

  const handleViewDetails = (index: number) => {
    setSelectedAppointment(selectedAppointment === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('/medical-bg.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-[1200px] p-6 rounded-lg shadow-lg mt-10">
        <CardHeader className="text-center">
          <h2 className="text-xl font-bold text-blue-500">Scheduled Appointments</h2>
          <Spacer y={1} />
          <Input
            clearable
            underlined
            placeholder="Search by patient name..."
            className="w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Spacer y={1} />
        </CardHeader>
        <CardBody>
          <Table aria-label="Scheduled Appointments" shadow={false} bordered>
            <TableHeader>
              <TableColumn>Date</TableColumn> 
              <TableColumn>Time</TableColumn>
              <TableColumn>Patient</TableColumn>
              <TableColumn>Contact</TableColumn>
              <TableColumn>Appointment Mode</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {sortedFilteredAppointments.length > 0 ? (
                sortedFilteredAppointments.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.contact}</TableCell>
                    <TableCell>{appointment.appointmentMode}</TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleViewDetails(index)} 
                        size="sm" 
                        color="primary"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center text-gray-500">No appointments found for this search.</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedAppointment !== null && (
            <div className="mt-4">
              <h3 className="font-bold text-lg">Appointment Details</h3>
              <p><strong>Reason:</strong> {sortedFilteredAppointments[selectedAppointment].reason}</p>
              <p><strong>Symptoms:</strong> {sortedFilteredAppointments[selectedAppointment].symptoms}</p>
              <p><strong>Attached Files:</strong></p>
              <ul>
                {sortedFilteredAppointments[selectedAppointment].files?.map((file, idx) => (
                  <li key={idx}>{file}</li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default DoctorAppointmentPage;
