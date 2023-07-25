// pages/admin/dashboard.tsx
import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import AuthGuard from '@/components/AuthGuard';
import AdminLayout from '@/layouts/admin/AdminLayout';
import EmployeeRecord from "@/components/EmployeeRecord";

const Dashboard: NextPage = () => {
  return (
    <AuthGuard>
      <AdminLayout>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
              Dashboard
          </Typography>
          <EmployeeRecord/>
        </Container>
      </AdminLayout>
    </AuthGuard>
  );
};

export default Dashboard;
