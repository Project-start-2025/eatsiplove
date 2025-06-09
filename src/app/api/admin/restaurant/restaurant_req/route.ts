import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { RestaurantRequest } from "@/models/BE/Restaurant/RestaurantRequest";

function parseTimeString(timeStr: string): string {
  if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr)) {
    throw new Error("Invalid time format (must be HH:mm)");
  }
  return `${timeStr}:00`; // Chuyển "08:00" → "08:00:00"
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, phone, openTime, closeTime, restaurantStatus } = body;

    if (!name || !address || !phone || !openTime || !closeTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const openTimeFormatted = parseTimeString(openTime);
    const closeTimeFormatted = parseTimeString(closeTime);

    const dbSource = await getDataSource();
    const db = dbSource.getRepository(RestaurantRequest);

    const request = db.create({
      name,
      address,
      phone,
      openTime,
      closeTime,
      restaurantStatus,
    });

    await db.save(request);

    return NextResponse.json({ message: "Restaurant request submitted" }, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
