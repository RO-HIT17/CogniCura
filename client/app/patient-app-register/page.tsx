'use client';
import React, { useState } from 'react';
import { Input, Textarea, Checkbox, Button, Select, SelectItem } from '@nextui-org/react';

const PatientAppointmentRegistration: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [reason, setReason] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [medicalRecords, setMedicalRecords] = useState<File | null>(null);
  const [sendReminders, setSendReminders] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Specialty:', specialty);
    console.log('Reason for Visit:', reason);
    console.log('Appointment Mode:', appointmentMode);
    console.log('Symptoms:', symptoms);
    console.log('Location:', location);
    console.log('Medical Records:', medicalRecords);
    console.log('Send Reminders:', sendReminders);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Appointment Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="bordered"
            color="primary"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="bordered"
            color="primary"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Specialty Required"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            variant="bordered"
            color="primary"
          >
            <SelectItem key="Orthopedics" value="Orthopedics">Orthopedics</SelectItem>
            <SelectItem key="Dermatology" value="Dermatology">Dermatology</SelectItem>
            <SelectItem key="Cardiology" value="Cardiology">Cardiology</SelectItem>
            {/* Add more specialties as needed */}
          </Select>
          <Select
            label="Reason for Visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            variant="bordered"
            color="primary"
          >
            <SelectItem key="new consultation" value="new consultation">New Consultation</SelectItem>
            <SelectItem key="follow-up" value="follow-up">Follow-up</SelectItem>
            <SelectItem key="test results" value="test results">Test Results</SelectItem>
            {/* Add more reasons as needed */}
          </Select>
        </div>
        <div>
          <Select
            label="Appointment Mode"
            value={appointmentMode}
            onChange={(e) => setAppointmentMode(e.target.value)}
            required
            variant="bordered"
            color="primary"
          >
            <SelectItem key="In-person" value="In-person">In-person</SelectItem>
            <SelectItem key="Teleconsultation" value="Teleconsultation">Online</SelectItem>
          </Select>
        </div>
        <div>
          <Textarea
            label="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
            variant="bordered"
            color="primary"
          />
        </div>
        <div>
          <Select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            variant="bordered"
            color="primary"
          >
            <SelectItem key="Chennai" value="Chennai">Chennai</SelectItem>
            <SelectItem key="Mumbai" value="Mumbai">Mumbai</SelectItem>
            <SelectItem key="Delhi" value="Delhi">Delhi</SelectItem>
            <SelectItem key="Bangalore" value="Bangalore">Bangalore</SelectItem>
            {/* Add more locations as needed */}
          </Select>
        </div>
        <br></br>
        <div className="mt-4">
            <Input
              type="file"
              placeholder="Upload Medical Records"
              onChange={(e) => setMedicalRecords(e.target.files?.[0] || null)}
              variant="bordered"
              color="primary"
              label="Upload Medical Records"
            />
        </div>
        <div>
          <Checkbox
            checked={sendReminders}
            onChange={(e) => setSendReminders(e.target.checked)}
            color="primary"
          >
            Send Reminders
          </Checkbox>
        </div>
        <Button type="submit" color="primary" onClick={() => window.location.href = '/patient-fixapp'} >Schdule Appointment</Button>
      </form>
    </div>
  );
};

export default PatientAppointmentRegistration;