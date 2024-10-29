'use client';
import React, { useState } from 'react';
import { Input, Textarea, Checkbox, Button, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    const pat_id = localStorage.getItem('p_id');
    e.preventDefault();

    const appointmentData = {
      firstName,
      lastName,
      specialityRequired: specialty,
      reason,
      mode: appointmentMode,
      symptoms,
      location,
      sendRemainders: sendReminders,
      pat_id,  
      status: 'scheduled',
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      console.log('Appointment created successfully:', data);
      localStorage.setItem('app_id',data._id);
      router.push('/patient-fixapp');

    } catch (error) {
      console.error('Error during registration:', error);
    }
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
            <SelectItem key="orthopedics" value="orthopedics">Orthopedics</SelectItem>
            <SelectItem key="general" value="general">General</SelectItem>
            <SelectItem key="cardiology" value="cardiology">Cardiology</SelectItem>
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
            <SelectItem key="new_consultation" value="new_consultation">New Consultation</SelectItem>
            <SelectItem key="follow_up" value="follow_up">Follow-up</SelectItem>
            <SelectItem key="test_results" value="test_results">Test Results</SelectItem>
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
            <SelectItem key="in_person" value="in_person">In-person</SelectItem>
            <SelectItem key="online" value="online">Online</SelectItem>
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
            <SelectItem key="chennai" value="chennai">Chennai</SelectItem>
            <SelectItem key="mumbai" value="mumbai">Mumbai</SelectItem>
            <SelectItem key="delhi" value="delhi">Delhi</SelectItem>
            <SelectItem key="bangalore" value="bangalore">Bangalore</SelectItem>
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
        <Button type="submit" color="primary" >Schedule Appointment</Button>
      </form>
    </div>
  );
};

export default PatientAppointmentRegistration;