'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Input } from '@nextui-org/react';
import {Pagination} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spacer,
} from '@nextui-org/react';

interface PatientVisit {
  visitDate: string;
  patientName: string;
  reason: string;
}

const patientVisitData: PatientVisit[] = [
  { visitDate: "2024-04-05", patientName: "Emily Parker", reason: "Skin Allergy" },
  { visitDate: "2024-04-10", patientName: "Michael Brown", reason: "Dental Check-up" },
  { visitDate: "2024-04-15", patientName: "Jessica Taylor", reason: "Physical Therapy" },
  { visitDate: "2024-05-01", patientName: "Daniel Wilson", reason: "Routine Check-up" },
  { visitDate: "2024-05-10", patientName: "Olivia Martinez", reason: "Blood Pressure Monitoring" },
  { visitDate: "2024-05-20", patientName: "Nathan Lee", reason: "Diabetes Check" },
  { visitDate: "2024-06-01", patientName: "Sophia Clark", reason: "Asthma Management" },
  { visitDate: "2024-06-15", patientName: "Lucas Walker", reason: "Annual Check-up" },
  { visitDate: "2024-06-20", patientName: "Isabella Hall", reason: "Weight Management" },
  { visitDate: "2024-07-01", patientName: "Alexander Adams", reason: "Cholesterol Test" },
  { visitDate: "2024-07-15", patientName: "Chloe Davis", reason: "Sports Injury Consultation" },
  { visitDate: "2024-07-25", patientName: "Liam Roberts", reason: "Vision Test" },
  { visitDate: "2024-08-05", patientName: "Amelia Robinson", reason: "Flu Symptoms" },
  { visitDate: "2024-08-20", patientName: "James Lewis", reason: "Heart Check-up" },
  { visitDate: "2024-09-01", patientName: "Ava Evans", reason: "Pregnancy Check-up" },
  { visitDate: "2024-09-15", patientName: "Ethan Turner", reason: "Kidney Health Monitoring" },
  { visitDate: "2024-09-20", patientName: "Lily Thompson", reason: "General Consultation" },
  { visitDate: "2024-10-05", patientName: "William Campbell", reason: "Mental Health Check" },
  { visitDate: "2024-10-15", patientName: "Grace White", reason: "Nutrition Counseling" },
  { visitDate: "2024-10-25", patientName: "Benjamin Harris", reason: "Back Pain Consultation" },
  { visitDate: "2024-11-01", patientName: "Mia Young", reason: "Sleep Disorder Consultation" },
  { visitDate: "2024-11-10", patientName: "Ella King", reason: "ENT Consultation" },
  { visitDate: "2024-11-20", patientName: "Aiden Scott", reason: "Post-Surgery Check-up" },
  { visitDate: "2024-12-01", patientName: "Zoe Green", reason: "Skin Rash Consultation" },
  { visitDate: "2024-12-15", patientName: "Henry Edwards", reason: "Joint Pain Consultation" },
  { visitDate: "2024-12-20", patientName: "Layla Martinez", reason: "Dental Cleaning" }
];


const PatientVisitHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredVisits = patientVisitData.filter(visit =>
    visit.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('/medical-bg.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-[900px] p-6 rounded-lg shadow-lg mt-10">
        <CardHeader className="text-center">
          <h2 className="text-xl font-bold text-blue-500">Patient Visit History</h2>
          <Spacer y={1} />
          <Input
            clearable
            underlined
            placeholder="Search by patient name..."
            className="w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardBody>
          <Table aria-label="Patient Visit History" shadow={false} bordered>
            <TableHeader>
              <TableColumn>Visit Date</TableColumn>
              <TableColumn>Patient</TableColumn>
              <TableColumn>Reason</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell>{visit.visitDate}</TableCell>
                    <TableCell>{visit.patientName}</TableCell>
                    <TableCell>{visit.reason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No patient visits found for this search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            
          </Table>
          <Spacer x={10}/>
        </CardBody>
        <CardFooter className="text-center text-sm text-gray-400">
          Patient visit history details.
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientVisitHistoryPage;
