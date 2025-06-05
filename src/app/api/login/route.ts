import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcrypt';

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 });
    }

    const pool = await sql.connect(config);

<<<<<<< HEAD
    const resUser = await pool.request()
      .input('username', sql.NVarChar, email)
      .query('SELECT * FROM Accounts WHERE Username = @username');
=======
    // Giả sử trường là Email
    const resUser = await pool.request()
    .input('username', sql.NVarChar, email)  // 'email' biến frontend gửi, thực tế là username
    .query('SELECT * FROM Accounts WHERE Username = @username');
>>>>>>> b174dbc (Send restaurant request from vendor to admin)

    if (resUser.recordset.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const user = resUser.recordset[0];
    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Đăng nhập thành công, có thể tạo session/token ở đây

    return NextResponse.json({ message: 'Login successful', user: {
      username: user.Username,
      fullname: user.FullName,
      role: user.Role,
    }});
  } catch(error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}