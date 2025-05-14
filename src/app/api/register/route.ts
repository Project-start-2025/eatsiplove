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
    const body = await req.json();

    const { fullName, username, password, role } = body;

    if (!fullName || !username || !password) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    const checkUser = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Accounts WHERE Username = @username');

    if (checkUser.recordset.length > 0) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.request()
      .input('fullName', sql.NVarChar, fullName)
      .input('username', sql.NVarChar, username)
      .input('passwordHash', sql.NVarChar, hashedPassword)
      .input('role', sql.NVarChar, role || 'user')
      .query(`
        INSERT INTO Accounts (FullName, Username, PasswordHash, Role)
        VALUES (@fullName, @username, @passwordHash, @role)
      `);

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}