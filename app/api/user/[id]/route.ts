import { NextResponse } from "next/server"
import { getUserData } from "@/lib/userData"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id
  try {
    const userData = await getUserData(userId)
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

