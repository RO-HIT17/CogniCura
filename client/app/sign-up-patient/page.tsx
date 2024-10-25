'use client';

import Link from "next/link";
import { useState, FormEvent } from 'react'; 
import { Button, Input } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; 
import { title } from "@/components/primitives";

interface PatientSignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const DoctorSignUpPage: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const [formData, setFormData] = useState<PatientSignUpFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/doctor-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      console.log('Doctor registered successfully:', data);

    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/doctor-bg.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-104 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>Sign Up</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-2" onSubmit={handleSignUp}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="firstName"
                type="text"
                label="First Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
                onChange={handleChange}
              />
              <Input
                id="lastName"
                type="text"
                label="Last Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
                onChange={handleChange}
              />
            </div>
            <Input
              id="email"
              type="email"
              label="Email"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="phoneNumber"
              type="tel"
              label="Phone Number"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Button 
              type="submit" 
              className="mt-2 border border-blue-500" 
              color="gradient" 
              auto
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorSignUpPage;
