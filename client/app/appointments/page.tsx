'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
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
  { date: "2024-10-25", time: "10:00 AM", patientName: "John Doe", reason: "Follow-up", contact: "7465960367", symptoms: "Fever, Cough", appointmentMode: "Online", files: ["file1.pdf", "file2.png"] },
  { date: "2024-10-25", time: "11:30 AM", patientName: "Jane Smith", reason: "New Consultation", contact: "7446379972", symptoms: "Headache", appointmentMode: "Offline", files: ["file3.pdf"] },
  { date: "2024-10-25", time: "2:00 PM", patientName: "Carlos Hernandez", reason: "Routine Check-up", contact: "8928715210", symptoms: "Fatigue, Nausea", appointmentMode: "Online", files: ["file4.pdf", "file5.png"] },
  { date: "2024-10-25", time: "9:30 AM", patientName: "Sarah Lee", reason: "Consultation", contact: "9105254664", symptoms: "Anxiety", appointmentMode: "Offline", files: [] },
  { date: "2024-10-25", time: "1:00 PM", patientName: "David Johnson", reason: "Specialist Referral", contact: "4669799937", symptoms: "Chest Pain", appointmentMode: "Offline", files: ["file6.pdf"] },
  { date: "2024-10-26", time: "10:30 AM", patientName: "Emily Parker", reason: "Skin Allergy", contact: "4866289862", symptoms: "Rash", appointmentMode: "Online", files: ["file7.pdf"] },
  { date: "2024-10-26", time: "3:00 PM", patientName: "Michael Brown", reason: "Dental Check-up", contact: "4433157808", symptoms: "Toothache", appointmentMode: "Offline", files: [] },
  { date: "2024-10-27", time: "1:30 PM", patientName: "Jessica Taylor", reason: "Physical Therapy", contact: "9547956327", symptoms: "Knee Pain", appointmentMode: "Online", files: ["file8.pdf"] },
];

const DoctorAppointmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  const filteredAppointments = appointmentsData.filter(appointment => {
    const matchesSearchTerm = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = selectedMode === 'All' || appointment.appointmentMode === selectedMode;
    return matchesSearchTerm && matchesMode;
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
          <Spacer x={2} />
          {/* <Select
            label="Filter by Appointment Mode"
            onChange={setSelectedMode}
            placeholder="Select Mode"
            className="w-full"
          >
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </Select> */}
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
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No appointments found for this search.
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
