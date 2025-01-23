export interface User {
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: number;
  lastLoggedIn: string;
  hasTemporaryPassword: boolean;
  isActive: boolean;
}

export const defaultUser: User = {
  firstName: "",
  lastName: "",
  email: "",
  accessLevel: 5, 
  lastLoggedIn: "",
  hasTemporaryPassword: false,
  isActive: true,
};
