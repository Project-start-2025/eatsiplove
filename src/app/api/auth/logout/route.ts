import { NextResponse } from "next/server";

export async function POST() {
  // Xoá cookie token ở đây, ví dụ:
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { maxAge: 0, path: "/" }); // xoá cookie token

  return response;
}