export interface Member {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Others";
  age: number;
  streetLine1: string;
  streetLint2: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  membershipType: ["GYM" | "SWIMMING POOL", "GYM" | "SWIMMING POOL"];
  phoneNumber: string;
  paymentMethod: "UPI" | "CASH";
}
