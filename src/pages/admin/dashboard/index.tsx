// pages/admin/dashboard.tsx
import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import Logout from '@/components/Logout';
import AuthGuard from '@/components/AuthGuard';

const Dashboard: NextPage = () => {
  return (
    <AuthGuard>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
            Dashboard Page
        </Typography>
        <Logout />
      </Container>
    </AuthGuard>
  );
};

export default Dashboard;
