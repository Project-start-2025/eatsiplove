import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDataSource } from '@/lib/orm';
import { Account } from '@/model/Account';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    // Lưu ý: Nếu frontend gửi qua "email", thì đổi tên biến cho khớp!

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    const resUser = await pool.request()
      .input('username', sql.NVarChar, email)
      .query('SELECT * FROM Accounts WHERE Username = @username');

    if (resUser.recordset.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const payload = {
      id: user.id, // <-- thêm dòng này!
      username: user.username,
      fullname: user.fullName,
      role: user.role,
    };
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,         // <-- Bắt buộc PHẢI trả về trường id này!
        username: user.username,
        fullname: user.fullName,
        role: user.role,
      },
    });
  } catch(error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}