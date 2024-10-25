'use client';

import React from 'react';
import { Button, Spacer, Card } from '@nextui-org/react';
import { CardHeader, CardBody } from '@nextui-org/card';
import NextLink from 'next/link';
import { title, subtitle } from '@/components/primitives';

const BasePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <Card style={{ maxWidth: '600px', padding: '20px' }}>
        <CardHeader style={{ justifyContent: 'center' }}>
          <span className={title({ color: "violet" })}>Welcome!</span>
        </CardHeader>
        <CardBody style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#4A90E2' }}>Are you a patient or a doctor?</h4>
          <Spacer y={4} />
          <NextLink href="/sign-up-patient">
            <Button shadow color="primary" variant="bordered" style={{ marginBottom: '20px', padding: '15px 30px', fontSize: '16px' }} auto>
              I am a Patient
            </Button>
          </NextLink>
          <NextLink href="/sign-up-doctor">
            <Button shadow color="secondary" variant="bordered" style={{ padding: '15px 30px', fontSize: '16px' }} auto>
              I am a Doctor
            </Button>
          </NextLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default BasePage;