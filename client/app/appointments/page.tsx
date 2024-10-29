'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Input, Button, Select, SelectItem, Spacer } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  specialityRequired: string;
  reason: string;
  mode: string;
  symptoms: string;
  location: string;
  sendRemainders: boolean;
  pat_id: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  doc_id: string;
  endtime: string;
  starttime: string;
  status: string;
}

const DoctorAppointmentPage: React.FC = () => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const d_id = localStorage.getItem('d_id');
      if (!d_id) {
        setError('Doctor ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/appointments/doctor/${d_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointmentsData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointmentsData.filter(appointment => {
    const isFutureAppointment = new Date(appointment.starttime) > new Date();
    const matchesSearchTerm = appointment.pat_id.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.pat_id.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = selectedMode === 'All' || appointment.mode === selectedMode;
    return isFutureAppointment && matchesSearchTerm && matchesMode;
  });

  const sortedFilteredAppointments = filteredAppointments.sort((a, b) => {
    return new Date(a.starttime).getTime() - new Date(b.starttime).getTime();
  });

  const handleViewDetails = (index: number) => {
    setSelectedAppointment(selectedAppointment === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('/medical-bg.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-[1200px] p-6 rounded-lg shadow-lg mt-10">
        <CardHeader className="text-center">
          <h2 className="text-xl font-bold text-blue-500">Scheduled Future Appointments</h2>
          <Spacer y={1} />
          <Input
            clearable
            underlined
            placeholder="Search by patient name..."
            className="w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Spacer x={2} />
          <Select
            placeholder="Select Appointment Mode"
            className="w-full mb-4"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <SelectItem key="all" value="All">All</SelectItem>
            <SelectItem key="online" value="Online">Online</SelectItem>
            <SelectItem key="offline" value="Offline">Offline</SelectItem>
          </Select>
          <Spacer y={1} />
        </CardHeader>
        <CardBody>
          <Table aria-label="Scheduled Future Appointments" shadow={false} bordered>
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Time</TableColumn>
              <TableColumn>Patient</TableColumn>
              <TableColumn>Contact</TableColumn>
              <TableColumn>Appointment Mode</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {sortedFilteredAppointments.length > 0 ? (
                sortedFilteredAppointments.map((appointment, index) => (
                  <TableRow key={appointment._id}>
                    <TableCell>{new Date(appointment.starttime).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(appointment.starttime).toLocaleTimeString()}</TableCell>
                    <TableCell>{appointment.firstName} {appointment.lastName}</TableCell>
                    <TableCell>{appointment.pat_id.phone}</TableCell>
                    <TableCell>{appointment.mode}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
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
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No future appointments found for this search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedAppointment !== null && (
            <div className="mt-4">
              <h3 className="font-bold text-lg">Appointment Details</h3>
              <p><strong>Reason:</strong> {sortedFilteredAppointments[selectedAppointment].reason}</p>
              <p><strong>Symptoms:</strong> {sortedFilteredAppointments[selectedAppointment].symptoms}</p>
              <p><strong>Location:</strong> {sortedFilteredAppointments[selectedAppointment].location}</p>
              <p><strong>Send Reminders:</strong> {sortedFilteredAppointments[selectedAppointment].sendRemainders ? 'Yes' : 'No'}</p>
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