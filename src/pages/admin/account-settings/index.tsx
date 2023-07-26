import React, { useState } from 'react';
import ChangePassword from '@/components/ChangePassword';
import AuthGuard from '@/components/AuthGuard';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useAuth } from '@/hook/useAuth';

const AccountSettings: React.FC = () => {
  const { changePassword } = useAuth();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await changePassword(currentPassword, newPassword);
      setSuccessDialogOpen(true);
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="background-title px-4 py-8">
          <div className="container mx-auto">
            <Typography variant="h2" align="left" gutterBottom>
              Account Settings
            </Typography>
          </div>
        </div>
        <Container>
          <div className="py-8">
            <div className="mb-4">
              <h2 className="mb-4 font-extrabold text-center text-2xl">Change Password</h2>
              <ChangePassword onSubmit={handleChangePassword} />
            </div>
            {/* Success Dialog */}
            <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
              <DialogTitle>Password Changed Successfully</DialogTitle>
              <DialogContent>
                <Typography variant="body1">Your password has been changed successfully.</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSuccessDialogClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
              <DialogTitle>Error Changing Password</DialogTitle>
              <DialogContent>
                <Typography variant="body1">There was an error changing your password.</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleErrorDialogClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </AdminLayout>
    </AuthGuard>
  );
};

export default AccountSettings;
