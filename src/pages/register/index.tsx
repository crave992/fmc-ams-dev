import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, MenuItem, TextField } from '@mui/material';
import useFirebase from '@/hook/useFirebase';
import { UserModel } from '@/models/UserModels';
import SinglePageLayout from "@/layouts/SinglePage";

export default function Register() {
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();

  const onSubmit = async (data: UserModel) => {
    if (firebase) {
      try {
        // Example Firebase integration (create user)
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        // Set the displayName field
        const displayName = `${data.meta.firstName} ${data.meta.lastName}`;
        await firebase.auth().currentUser?.updateProfile({ displayName });

        console.log('User created successfully!');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  return (
    <SinglePageLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <TextField
          label="Email"
          {...register('email', { required: true })}
          error={!!errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          className="mb-4 w-full"
        />
        <TextField
          type="password"
          label="Password"
          {...register('password', { required: true })}
          error={!!errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          className="mb-4 w-full"
        />
        <TextField
          label="First Name"
          {...register('meta.firstName', { required: true })}
          error={!!errors?.meta?.firstName}
          helperText={errors?.meta?.firstName ? 'First Name is required' : ''}
          className="mb-4 w-full"
        />
        <TextField
          label="Last Name"
          {...register('meta.lastName', { required: true })}
          error={!!errors?.meta?.lastName}
          helperText={errors?.meta?.lastName ? 'Last Name is required' : ''}
          className="mb-4 w-full"
        />
        <TextField
          type="number"
          label="Age"
          {...register('meta.age', { required: true, min: 1 })}
          error={!!errors?.meta?.age}
          helperText={errors?.meta?.age ? 'Please enter a valid age' : ''}
          className="mb-4 w-full"
        />
        <TextField
          select
          label="Gender"
          {...register('meta.gender', { required: true })}
          error={!!errors?.meta?.gender}
          helperText={errors?.meta?.gender ? 'Gender is required' : ''}
          className="mb-4 w-full"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          type="date"
          label="Date of Birth"
          {...register('meta.dateOfBirth', { required: true })}
          error={!!errors?.meta?.dateOfBirth}
          helperText={errors?.meta?.dateOfBirth ? 'Date of Birth is required' : ''}
          InputLabelProps={{
            shrink: true,
          }}
          className="mb-4 w-full"
        />
        <TextField
          label="Address"
          {...register('meta.address', { required: true })}
          error={!!errors?.meta?.address}
          helperText={errors?.meta?.address ? 'Address is required' : ''}
          className="mb-4 w-full"
        />
        <TextField
          label="Profile Image URL"
          {...register('profileImageURL')}
          error={!!errors.profileImageURL}
          helperText={errors.profileImageURL ? 'Please enter a valid image URL' : ''}
          className="mb-4 w-full"
        />
        <TextField
          label="Username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username ? 'Username is required' : ''}
          className="mb-4 w-full"
        />
        {/* Add more fields based on the UserModel interface */}
        <Button type="submit" variant="outlined" color="primary">
          Submit
        </Button>
      </form>
    </SinglePageLayout>
  );
}
