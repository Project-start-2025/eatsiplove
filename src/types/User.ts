export interface User {
    id: number;
    fullname: string;    // trùng với field trong backend là fullName
    username: string;
    role: string;
    createdAt: string;   // ngày tạo tài khoản, kiểu string ISO date
  }