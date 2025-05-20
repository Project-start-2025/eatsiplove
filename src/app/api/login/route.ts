import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

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

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    // Giả sử trường là Email
      const resUser = await pool.request()
      .input('username', sql.NVarChar, email)  // 'email' biến frontend gửi, thực tế là username
      .query('SELECT * FROM Accounts WHERE Username = @username');

      if (resUser.recordset.length === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const user = resUser.recordset[0];
    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const payload = {
      username: user.Username,
      fullname: user.FullName,
      role: user.Role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        username: user.Username,
        fullname: user.FullName,
        role: user.Role,
      },
    });
  } catch(error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}