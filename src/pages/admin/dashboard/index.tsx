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
        <div className="background-title px-4 py-8">
          <div className="container mx-auto">
            <Typography variant="h2" align="left" gutterBottom>
              Dashboard
            </Typography>
          </div>
        </div>
        <Container>
          <div className="py-8">
            <EmployeeRecord/>
          </div>
        </Container>
      </AdminLayout>
    </AuthGuard>
  );
};

export default Dashboard;
