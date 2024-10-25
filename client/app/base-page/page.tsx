'use client';

import React from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

const BasePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ maxWidth: '400px', padding: '20px' }}>
        <CardHeader style={{ justifyContent: 'center' }}>
          <h2>Welcome</h2>
        </CardHeader>
        <CardBody style={{ textAlign: 'center' }}>
          <h4>Are you a patient or a doctor?</h4>
          <Spacer y={1} />
          <Button shadow color="primary" style={{ marginBottom: '10px' }} onClick={() => window.location.href = '/sign-up-patient'} auto>
            I am a Patient
          </Button>
          <Button shadow color="secondary" onClick={() => window.location.href = '/sign-up-doctor'} auto>
            I am a Doctor
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BasePage;