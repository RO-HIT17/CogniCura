
# CogniCura

CogniCura leverages modern web technologies to provide a seamless experience for managing healthcare appointments, patient history, and AI-assisted diagnostics. The app supports both **Tamil** and **English** for the AI chat assistant, allowing users to interact in their preferred language.

---

> **Built by Team Code Crusaders for Sparkathon - I++'24**  

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

---

## Overview

Cogni Cura is designed to streamline healthcare information management. It includes features such as patient registration, appointment scheduling, managing patient history, and AI-assisted diagnostics that provide doctor recommendations. The AI chat assistant is multilingual and supports both **Tamil** and **English**, enabling a wider range of users to interact with the app.

---

## Features

- **Patient Registration**: Easily register new patients.
- **Appointment Scheduling**: Schedule and manage appointments seamlessly.
- **Patient History**: View and manage patient visit history.
- **AI Assistant**: Get AI-assisted diagnostics and doctor recommendations in both **Tamil** and **English**.
- **User Authentication**: Secure login and logout functionality.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or newer)
- **npm** or **yarn**
- **MongoDB** (or MongoDB Atlas for cloud storage)

---

## Project Setup

To install dependencies and run the development server, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RO-HIT17/CogniCura.git
   cd CogniCura
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

   The development server will be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

---

## Folder Structure

### Client

```plaintext
client/
├── app/
│   ├── AI-assistant/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── base-page/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── history/
│   │   ├── layout.tsx
│   ├── patient-app-history/
│   │   ├── layout.tsx
│   ├── patient-app-register/
│   │   ├── layout.tsx
│   ├── patient-fixapp/
│   │   ├── layout.tsx
│   ├── patdashboard/
│   │   ├── layout.tsx
│   ├── providers.tsx
│   ├── settings/
│   │   ├── page.tsx
│   ├── sign-up-doctor/
│   │   ├── layout.tsx
├── components/
│   ├── docnavbar.tsx
│   ├── navbar.tsx
├── config/
│   ├── site.ts
├── styles/
│   ├── globals.css
├── .eslintignore
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
```

### Server

```plaintext
server/
├── src/
│   ├── controllers/
│   │   ├── appointmentController.ts
│   │   ├── doctorController.ts
│   │   ├── patientController.ts
│   ├── models/
│   │   ├── appointment.ts
│   │   ├── doctor.ts
│   │   ├── patient.ts
│   ├── routes/
│   │   ├── appointmentRoutes.ts
│   │   ├── doctorRoutes.ts
│   │   ├── patientRoutes.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
```

---

## Technologies Used

### Client-Side

- **Next.js 14**
- **NextUI v2**
- **Tailwind CSS**
- **Tailwind Variants**
- **TypeScript**
- **Framer Motion**
- **next-themes**

### Server-Side

- **Express**
- **Mongoose**
- **Node.js**
- **TypeScript**
- **Nodemailer**
- **Twilio**

---

## Usage

### **AI Assistant**

The **AI Assistant** component offers AI-assisted diagnostics and doctor recommendations. It supports both **Tamil** and **English**, allowing users to get medical advice in their preferred language. Here's how to use it:

1. **Navigate to the AI Assistant Section**:
   - You can access the AI Assistant from the main dashboard or through the **AI Assistant** tab in the navigation bar.
   
2. **Input Symptoms**:
   - Enter your symptoms or concerns into the chat interface. You can use either **Tamil** or **English** based on your preference.
   - Example:
     - **English**: "I have a headache and fever."
     - **Tamil**: "எனக்கு தலைவலி மற்றும் காய்ச்சல் உள்ளது."

3. **AI Diagnosis**:
   - The AI Assistant processes the input and provides a possible diagnosis.
   - It might also recommend visiting a specific doctor based on the symptoms you provided.

4. **Doctor Recommendations**:
   - Based on the input, the AI Assistant will recommend a specialist and provide options to schedule an appointment.
   - It may suggest a **General Physician**, **Neurologist**, or other specialists depending on the symptoms.

5. **Chat Interface**:
   - The assistant's responses will be provided in the same language used to enter the symptoms (either **Tamil** or **English**).
   - If the response is not understood, you can rephrase the question, and the assistant will provide a more accurate reply.

### **Patient Registration**

The **Patient Registration** feature allows you to easily register as a new patient. Here's how to use it:

1. **Access Registration Page**:
   - Go to the **Patient Registration** page from the dashboard or the main menu.
   
2. **Fill in Patient Details**:
   - Provide personal details such as **Name**, **Age**, **Gender**, **Contact Information**, and **Medical History**.
   
3. **Submit the Registration Form**:
   - Once you have entered all the necessary information, click **Submit** to register the patient.

4. **Confirmation**:
   - After successful registration, you will receive a confirmation message, and the patient details will be stored in the database.

### **Appointment Scheduling**

Scheduling appointments with doctors is quick and easy. Here's how to use the **Appointment Scheduling** feature:

1. **Access the Appointment Scheduling Page**:
   - Navigate to the **Appointments** section from the main dashboard or through the navigation menu.
   
2. **Choose a Doctor and Specialization**:
   - Select the **Doctor** and **Specialization** you need (e.g., General Physician, Neurologist, etc.).
   
3. **Select Available Time Slots**:
   - The system will show the available time slots for the chosen doctor.
   
4. **Confirm Appointment**:
   - Choose a time slot and confirm the appointment. You will receive a confirmation with all appointment details, including date, time, and doctor information.

### **Patient History**

View and manage your visit history using the **Patient History** feature:

1. **Access the Patient History Page**:
   - Go to the **History** section from the patient dashboard or menu.
   
2. **View Past Appointments**:
   - The system will display a list of your past appointments with doctors, including dates, symptoms, and any notes from the doctor.
   
3. **Download or Print History**:
   - You can download or print your visit history for reference or for sharing with your current doctor.

### **Doctor Sign-Up**

If you are a doctor, you can sign up using the **Doctor Registration** form:

1. **Navigate to Doctor Registration**:
   - Access the **Doctor Sign-Up** page from the main navigation.
   
2. **Fill Out the Form**:
   - Provide your **Name**, **Specialization**, **License Number**, and **Contact Information**.
   
3. **Submit Registration**:
   - After filling in all the details, submit the form for approval. Your details will be reviewed, and upon successful registration, you can start accepting appointments.

---

## Additional Features

### **Notifications and Alerts**

The system can send **notifications** for:

- **Upcoming Appointments**: Alerts before your scheduled appointment to remind you.
- **Doctor Availability**: Notifications when your preferred doctor is available or when slots are open.
- **AI Assistant Suggestions**: Recommendations or follow-up questions from the AI Assistant regarding your symptoms.

You can manage your notification preferences from the **Settings** page.

### **Multilingual Support**

The AI Assistant is equipped to handle both **English** and **Tamil**. It can switch between languages based on the user's input. You can interact with the system in the language you are most comfortable with.

1. **Switch Language**: In the **AI Assistant** section, you can toggle between **Tamil** and **English**.
2. **AI Diagnosis in Preferred Language**: The assistant will respond in the selected language.

---

