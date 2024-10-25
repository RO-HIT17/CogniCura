'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Input } from '@nextui-org/react';
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
  doctorName: string;
}

const patientVisitData: PatientVisit[] = [
  { visitDate: "2024-01-15", patientName: "John Doe", reason: "Follow-up", doctorName: "Dr. Smith" },
  { visitDate: "2024-01-20", patientName: "Jane Smith", reason: "New Consultation", doctorName: "Dr. Brown" },
  { visitDate: "2024-02-05", patientName: "Carlos Hernandez", reason: "Routine Check-up", doctorName: "Dr. Lee" },
  { visitDate: "2024-03-10", patientName: "Sarah Lee", reason: "Consultation", doctorName: "Dr. Smith" },
  { visitDate: "2024-03-15", patientName: "David Johnson", reason: "Specialist Referral", doctorName: "Dr. Brown" },
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
              <TableColumn>Doctor</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell>{visit.visitDate}</TableCell>
                    <TableCell>{visit.patientName}</TableCell>
                    <TableCell>{visit.reason}</TableCell>
                    <TableCell>{visit.doctorName}</TableCell>
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
        </CardBody>
        <CardFooter className="text-center text-sm text-gray-400">
          Patient visit history details.
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientVisitHistoryPage;
