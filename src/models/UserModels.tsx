export interface Meta {
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  address: string | null;
  phoneNumber: string | null;
}

export interface UserModel {
  id: string;
  displayName: string;
  profileImageURL: string | null;
  username: string;
  email: string;
  password: string;
  loginAttempts: number;
  role: 'superadmin' | 'admin' | 'manager' | 'user' | 'guest';
  meta: Meta;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export const defaultUserModel: UserModel = {
  id: '',
  displayName: '',
  profileImageURL: 'https://placehold.co/150x150',
  username: '',
  email: '',
  password: '',
  loginAttempts: 0,
  role: 'guest',
  meta: {
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'male',
    dateOfBirth: new Date(),
    address: '',
    phoneNumber: ''
  },
  dateCreated: new Date(),
  dateUpdated: new Date(),
  dateDeleted: null,
};