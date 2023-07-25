import React, { useState } from 'react';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '@/hook/useAuth';

interface ChangePasswordProps {
  onSubmit: (currentPassword: string, newPassword: string) => void; // Updated the onSubmit function type
}
  
const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }) => {
  const { user, changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
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
    setPasswordError(value !== password ? 'Passwords do not match' : '');
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
      {/* Current Password */}
      <div className="mb-4">
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Current Password"
          value={currentPassword}
          error={false} // No need to show errors here
          helperText=""
          InputLabelProps={{ className: 'required' }}
          className="w-full"
          onChange={handleCurrentPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {/* New Password */}
      <div className="mb-4">
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="New Password"
          value={password}
          error={passwordError !== ''}
          helperText={passwordError || ''}
          InputLabelProps={{ className: 'required' }}
          className="w-full"
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {/* Confirm New Password */}
      <div className="mb-4">
        <TextField
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm New Password"
          value={confirmPassword}
          error={passwordError !== ''}
          helperText={passwordError || ''}
          InputLabelProps={{ className: 'required' }}
          className="w-full"
          onChange={handleConfirmPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {/* Password checklist */}
      <div>
            <ul>
            <li>
                {checkMinLength(password) ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                ) : (
                <CancelIcon style={{ color: 'red' }} />
                )}{' '}
                Minimum 8 characters
            </li>
            <li>
                {checkUppercase(password) ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                ) : (
                <CancelIcon style={{ color: 'red' }} />
                )}{' '}
                Uppercase character
            </li>
            <li>
                {checkLowercase(password) ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                ) : (
                <CancelIcon style={{ color: 'red' }} />
                )}{' '}
                Lowercase character
            </li>
            <li>
                {checkNumber(password) ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                ) : (
                <CancelIcon style={{ color: 'red' }} />
                )}{' '}
                Numeric character
            </li>
            </ul>
        </div>
      <div className="mb-4">
        <Button type="submit" variant="outlined" color="primary">
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
