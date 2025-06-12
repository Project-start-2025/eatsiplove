export interface User {
    id: number;
    fullname: string;    // trùng với field trong backend là fullName
    fullName?: string;  // thêm tùy chọn nếu có trả về
    username: string;
    role: string;
    createdAt: string;   // ngày tạo tài khoản, kiểu string ISO date
  }