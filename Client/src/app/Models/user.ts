import { Course } from './course';

export class User {
  _id: string = '';
  firstName: string = '';
  familyName: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  birthday: Date = new Date();
  phoneNumber: string = '';
  photo: string = '';
  courses: { enrolled: Course[] } = { enrolled: [] }; // Initialize with an empty array
}