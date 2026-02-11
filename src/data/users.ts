export interface User {
  username: string;
  password: string;
}

export const users: User[] = [
  { username: 'admin', password: 'password123' },
  { username: 'staff', password: 'password456' },
];
