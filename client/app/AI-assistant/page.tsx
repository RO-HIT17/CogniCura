"use client";

import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; 
import { title } from "@/components/primitives";

export default function Component() {
  const fileInputRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true); 
  const router = useRouter(); 

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInstructions(false); 
    setSubmittedInput(userInput);
    setUserInput("");
    setResponse(null);
    setIsLoading(true);

  
    setTimeout(() => {
      const mockResponse = {
        disease: "Common Cold",
        doctors: [
          { name: "Dr. John Doe", specialty: "General Physician" },
          { name: "Dr. Jane Smith", specialty: "ENT Specialist" },
        ],
      };
      setIsLoading(false);
      setResponse(mockResponse);
    }, 2000);
  };

  const handleFixAppointment = () => {
    router.push("/patient-fixapp");
  };

  return (
    <div className="flex flex-col h-screen justify-between p-4">
      {showInstructions && (
        <div className="flex-grow flex items-center justify-center">
          <div className="inline-block max-w-xl text-center mb-4">
            <span className={title({ color: "blue" })}>Your AI Assistant is Here</span>
            <br />
            <span className="text-lg">
              Enter your symptoms to get possible diseases, doctor recommendations, and fix appointments instantly.
            </span>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col items-start justify-start overflow-y-auto mb-4 space-y-4">
        {submittedInput && (
          <div className="text-white p-3 rounded-lg self-end w-fit shadow-md bg-gray-800 bg-opacity-45 text-white">
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
            <div className="min-h-12 resize-none border-10 p-3 shadow-none focus-visible:ring-0 rounded-lg p-3 self-start w-1/2 shadow-md border-blue-300 bg-gray-800 bg-opacity-45 text-white">
              <p>Possible Disease: {response.disease}</p>
              <p>
              Based on the symptoms you provided, it is likely that you might have a {response.disease}. It is a common condition that can be treated effectively with the right medical care. We recommend consulting with one of the following doctors:
              </p>
              <ul>
              {response.doctors.map((doctor, index) => (
              <li key={index}>
              {doctor.name} - {doctor.specialty}
              </li>
              ))}
              </ul>
              <p>Would you like to fix an appointment with one of these doctors?</p>
              <Button shadow color="primary" variant="bordered" onClick={handleFixAppointment}>
              Fix Appointment
              </Button>
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
          <Button type="submit" size="sm" className="ml-auto">
            Check Symptoms
          </Button>
        </div>
      </form>
    </div>
  );
}