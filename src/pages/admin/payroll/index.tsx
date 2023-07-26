// pages/payroll.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthGuard from '@/components/AuthGuard';
import AdminLayout from '@/layouts/admin/AdminLayout';
import PayrollTable from '@/components/PayrollTable';

const PayrollPage: React.FC = () => {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="background-title px-4 py-8">
          <div className="container mx-auto">
            <Typography variant="h2" align="left" gutterBottom>
              User Timelogs
            </Typography>
          </div>
        </div>
        <Container>
          <div className="py-8">
            <PayrollTable/>
          </div>
        </Container>
      </AdminLayout>
    </AuthGuard>
  );
};

export default PayrollPage;