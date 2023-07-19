import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import useFirebase from '@/hook/useFirebase'; // Import the hook from the correct location
import { UserModel } from '@/models/UserModels';
import SinglePageLayout from '@/layouts/SinglePage';
import ImageUploader from '@/components/ImageUploader';

const Register: React.FC = () => {
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserModel>();

  // Initialize the password state to an empty string
  const [password, setPassword] = useState('');

  // State variables for password conditions
  const [isMinLength, setMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

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

  // Update password conditions on password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setMinLength(checkMinLength(value));
    setHasUppercase(checkUppercase(value));
    setHasLowercase(checkLowercase(value));
    setHasNumber(checkNumber(value));
  };

  const onSubmit = async (data: UserModel) => {
    if (!firebase) return;

    try {
      const { email, password, meta } = data;

      // Example Firebase integration (create user)
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Set the displayName field
      const displayName = `${meta.firstName} ${meta.lastName}`;
      await firebase.auth().currentUser?.updateProfile({ displayName });

      // Save user data to Firestore
      if (userCredential?.user) {
        const userRef = firebase.firestore().collection('users').doc(userCredential.user.uid);
        await userRef.set({
          id: userCredential.user.uid,
          displayName,
          email,
          role: 'user', // Assuming new users have the 'user' role by default
          meta,
          dateCreated: new Date(),
        });

        console.log('User created and data stored in Firestore successfully!');
      } else {
        console.error('User data not saved. Something went wrong during authentication.');
      }
    } catch (error) {
      console.error('Error creating user or saving data:', error);
    }
  };

  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(event.target.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    setValue('meta.age', age);
  };

  return (
    <SinglePageLayout>
      <h2 className="mb-4 font-extrabold text-center text-2xl">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* FirstName */}
        <TextField
          label="First Name"
          {...register('meta.firstName', { required: true })}
          error={!!errors?.meta?.firstName}
          helperText={errors?.meta?.firstName ? 'First Name is required' : ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        {/* LastName */}
        <TextField
          label="Last Name"
          {...register('meta.lastName', { required: true })}
          error={!!errors?.meta?.lastName}
          helperText={errors?.meta?.lastName ? 'Last Name is required' : ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        {/* Username */}
        <TextField
          label="Username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username ? 'Username is required' : ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        {/* Email */}
        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message || ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        {/* Password */}
        <TextField
          type="password"
          label="Password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one numeric character',
            },
          })}
          value={password} // Set the value prop to the password state variable
          error={!!errors.password}
          helperText={errors.password?.message || ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
          onChange={handlePasswordChange}
        />

        {/* Password checklist */}
        <div>
          <ul>
            <li>{isMinLength ? '✓' : '✗'} Minimum 8 characters</li>
            <li>{hasUppercase ? '✓' : '✗'} Uppercase character</li>
            <li>{hasLowercase ? '✓' : '✗'} Lowercase character</li>
            <li>{hasNumber ? '✓' : '✗'} Numeric character</li>
          </ul>
        </div>

        <FormControl component="fieldset" className="mb-4" {...register('meta.gender', { required: true })}>
          <FormLabel component="legend" className="required">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender" className="flex flex-row">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          {errors?.meta?.gender && <span className="text-red-600">Gender is required</span>}
        </FormControl>

        {/* Date of Birth */}
        <TextField
          type="date"
          label="Date of Birth"
          {...register('meta.dateOfBirth', { required: true })}
          error={!!errors?.meta?.dateOfBirth}
          helperText={errors?.meta?.dateOfBirth ? 'Date of Birth is required' : ''}
          InputLabelProps={{
            shrink: true,
            className: 'required',
          }}
          className="mb-4 w-full"
          onChange={handleDateOfBirthChange}
        />

        {/* Address */}
        <TextField
          label="Address"
          {...register('meta.address', { required: true })}
          error={!!errors?.meta?.address}
          helperText={errors?.meta?.address ? 'Address is required' : ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          {...register('meta.phoneNumber', {
            required: 'Phone Number is required',
            pattern: {
              value: /^\d{11,13}$/,
              message: 'Phone Number must be 11 to 13 digits',
            },
          })}
          error={!!errors.meta?.phoneNumber}
          helperText={errors.meta?.phoneNumber?.message || ''}
          InputLabelProps={{ className: 'required' }}
          className="mb-4 w-full"
        />

        <div className="mb-4 w-full">
          <ImageUploader register={register} name="profileImageURL" label="Profile Image" />
        </div>

        {/* Add more fields based on the UserModel interface */}
        <Button type="submit" variant="outlined" color="primary">
          Submit
        </Button>
      </form>
    </SinglePageLayout>
  );
};

export default Register;
