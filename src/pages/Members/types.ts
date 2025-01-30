export interface Member {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Others';
  dob: Date;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  membershipType: ['GYM' | 'SWIMMING POOL', 'GYM' | 'SWIMMING POOL'];
  phoneNumber: string;
  paymentMethod: 'UPI' | 'CASH';
  age: number;
  duration: number;
}
