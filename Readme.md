# Healthcare App

Built for Sparkathon by team **Code Crusaders**, this Healthcare App leverages modern web technologies to provide a seamless experience for managing healthcare appointments, patient history, and AI-assisted diagnostics.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

The Healthcare App is designed to streamline healthcare information management with features like patient registration, appointment scheduling, patient history management, and AI-assisted diagnostics.

---

## Features

- **Patient Registration**: Easily register new patients.
- **Appointment Scheduling**: Schedule and manage appointments seamlessly.
- **Patient History**: View and manage patient visit history.
- **AI Assistant**: Get AI-assisted diagnostics and doctor recommendations.
- **User Authentication**: Secure login and logout functionality.

---

## Prerequisites

Ensure you have the following installed:
- Node.js and npm
- MongoDB

---

## Project Setup

To install dependencies and run the development server, you can use npm:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RO-HIT17/HealthCare_Sparkathon.git
   cd HealthCare_Sparkathon
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

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

### AI Assistant

The AI Assistant component offers AI-assisted diagnostics and doctor recommendations based on user input.

---


## Acknowledgements

Special thanks to the following technologies and libraries:

- **Next.js**
- **NextUI**
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion**
- **next-themes**
- **Express**
- **Mongoose**
- **Node.js**
- **Nodemailer**
- **Twilio**
