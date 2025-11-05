import { NextRequest, NextResponse } from "next/server";
import { strapiAPI } from "@/lib/strapi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone, address, hearAboutUs } = body;

    // Register user with Strapi
    const result = await strapiAPI.register({
      email,
      username: email, // Use email as username
      password,
      firstName,
      lastName,
      phone,
      address,
      hearAboutUs,
    });

    return NextResponse.json({
      jwt: result.jwt,
      user: result.user,
    });
  } catch (error: unknown) {
    console.error("Registration error:", error);

    // Handle Strapi validation errors
    if (error instanceof Error && error.message.includes("400")) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
