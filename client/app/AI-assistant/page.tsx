"use client";

import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

export default function Component() {
  const fileInputRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const router = useRouter();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ta-IN'; 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert('Failed to recognize speech. Please try again.');
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInstructions(false);
    setSubmittedInput(userInput);
    setUserInput("");
    setResponse(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/symptoms/process-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }),
      });

      if (!res.ok) throw new Error("Failed to process symptoms");

      const data = await res.json();
      setResponse(data);

      const doctorRes = await fetch("http://localhost:5000/api/doctor/get/specialization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialization: data.specialization }),
      });

      if (!doctorRes.ok) throw new Error("Failed to fetch doctors");

      const doctorData = await doctorRes.json();
      setDoctors(doctorData);
    } catch (error) {
      console.error("Error processing symptoms:", error);
      alert("Failed to process symptoms. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFixAppointment = (doctorId) => {
    router.push(`/patient-fixapp?doctorId=${doctorId}`);
  };

  return (
    <div className="flex flex-col h-screen justify-between p-6 space-y-6">
      {showInstructions && (
        <div className="flex-grow flex items-center justify-center text-center mb-4">
          <div className="inline-block max-w-xl">
            <span className={title({ color: "blue" })}>Your AI Assistant is Here</span>
            <p className="text-lg mt-2">
              Enter your symptoms to get possible diseases, doctor recommendations, and fix appointments instantly.
            </p>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col items-start justify-start overflow-y-auto mb-4 space-y-6">
        {submittedInput && (
          <div className="bg-gray-800 bg-opacity-45 text-white p-3 rounded-lg self-end w-fit shadow-md">
            <p>Given Symptoms: {submittedInput}</p>
          </div>
        )}

        {isLoading && (
          <div className="w-full max-w-xl">
            <Skeleton height="40px" />
            <Skeleton height="40px" className="mt-2" />
          </div>
        )}

        {response && (
          <div className="bg-gray-800 bg-opacity-45 text-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <h2 className="text-xl font-bold mb-2">Diagnosis Result</h2>
            <p><strong>Possible Disease:</strong> {response.disease} ({response.tam_disease})</p>
            <p><strong>Recommended Medicine:</strong> {response.medicine} ({response.tam_medicine})</p>
            <p><strong>Specialization:</strong> {response.specialization} ({response.tam_specialization})</p>
            <p className="mt-4">{response.response}</p>
            <p>{response.tam_res}</p>
            <p className="mt-4">Would you like to fix an appointment with one of these doctors?</p>
          </div>
        )}

        {doctors.length > 0 && (
          <div className="w-full max-w-xl space-y-4">
            {doctors.map((doctor) => (
              <Card key={doctor._id} className="border border-gray-300 rounded-lg shadow-md">
                <CardHeader className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <Chip>{doctor.specialization}</Chip>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <p>Name: {doctor.firstName} {doctor.lastName}</p>
                  <p>Specialization: {doctor.specialization}</p>
                  <p>Contact: {doctor.phone}</p>
                  <p>Email: {doctor.email}</p>
                </CardBody>
                <CardFooter className="p-4">
                  <Button onClick={() => handleFixAppointment(doctor._id)} color="primary" variant="bordered">
                    Fix Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} >
        <Textarea
          id="message"
          placeholder="Enter your symptoms here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 rounded-lg" // Original textarea styling
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="flex items-center mt-2">
          <Button type="button" size="sm" className="mr-2" onClick={handleVoiceInput}>
            Voice Input
          </Button>
          <Button type="submit" size="sm" className="ml-auto">
            Check Symptoms
          </Button>
        </div>
      </form>
    </div>
  );
}