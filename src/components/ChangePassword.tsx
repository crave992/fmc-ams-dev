import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '@/hook/useAuth';
import PasswordInput from './PasswordInput';

interface ChangePasswordProps {
  onSubmit: (currentPassword: string, newPassword: string) => void; // Updated the onSubmit function type
}
  
const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }) => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const checkMinLength = (value: string) => {
    return value.length >= 8;
  };

  const checkUppercase = (value: string) => {
    return /[A-Z]/.test(value);
  };

  const checkLowercase = (value: string) => {
    return /[a-z]/.test(value);
  };

  const checkNumber = (value: string) => {
    return /\d/.test(value);
  };

  const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentPassword(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);
  
    // Display the "Passwords do not match" error only when both fields have values
    setPasswordError(value && value !== password ? 'Passwords do not match' : '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!user || !user.email) {
      console.error('User not authenticated or email not available.');
      return;
    }

    try {
      // Re-authenticate the user with their current password to validate it
      await onSubmit(currentPassword, password);

      console.log('Password change request submitted successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          error={false}
          onChange={handleCurrentPasswordChange}
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          label="New Password"
          value={password}
          error={passwordError !== ''}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          error={passwordError !== ''}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      {/* Password checklist */}
      <div>
        <ul>
          <li style={{ color: checkMinLength(password) ? 'green' : 'red' }}>Minimum 8 characters</li>
          <li style={{ color: checkUppercase(password) ? 'green' : 'red' }}>Uppercase character</li>
          <li style={{ color: checkLowercase(password) ? 'green' : 'red' }}>Lowercase character</li>
          <li style={{ color: checkNumber(password) ? 'green' : 'red' }}>Numeric character</li>
        </ul>
      </div>
      <div className="mb-4 flex flex-row justify-around">
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={Boolean(passwordError) || password !== confirmPassword}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
