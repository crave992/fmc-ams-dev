import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import useFirebase from '@/hook/useFirebase';
import { UserModel } from '@/models/UserModels'; // Import UserModel from the correct file

interface ImageUploaderProps {
  register: UseFormRegister<ExtendedUserModel>; // Use the ExtendedUserModel type here
  name: string;
  label: string;
}

interface UserImageModel extends Partial<UserModel> {
  profileImageURL?: string | null;
}

type ExtendedUserModel = UserModel & UserImageModel; // Union of UserModel and UserImageModel with optional properties

const ImageUploader: React.FC<ImageUploaderProps> = ({ register, name, label }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const firebase = useFirebase();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const storageRef = firebase?.storage().ref(`UsersImage/${file.name}`);
        const snapshot = await storageRef?.put(file);
        const downloadURL = await snapshot?.ref.getDownloadURL();
        setImageUrl(downloadURL || null);
        setUploading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id={name}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor={name}>
        <Button variant="contained" component="span" disabled={uploading}>
          Upload {label}
        </Button>
      </label>
      {imageUrl && (
        <TextField
          label={label}
          value={imageUrl}
          InputProps={{
            readOnly: true,
          }}
          className="mb-4 w-full"
        />
      )}
    </>
  );
};

export default ImageUploader;
