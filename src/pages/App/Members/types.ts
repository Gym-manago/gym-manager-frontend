export interface MemberBase {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  membershipEndDate: string;
  membershipStartDate: string;
  membershipType: string;
  phoneNumber: string;
  active: boolean;
  email: string;
  age: number;
}

export interface Member extends MemberBase {
  address: {
    streetLine1: string;
    streetLine2?: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  paymentMethod: 'UPI' | 'CASH';
  duration: number;
}
