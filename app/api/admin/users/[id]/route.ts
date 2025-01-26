import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { updateUser } from "@/lib/db" // 仮想的な関数

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { newPassword, ...userData } = await req.json()

    let updatedUserData = { ...userData }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      updatedUserData = { ...updatedUserData, password: hashedPassword }
    }

    // ユーザー情報を更新
    await updateUser(id, updatedUserData)

    return NextResponse.json({ success: true, message: "ユーザー情報が更新されました" })
  } catch (error) {
    console.error("ユーザー更新エラー:", error)
    return NextResponse.json({ success: false, message: "ユーザー情報の更新に失敗しました" }, { status: 500 })
  }
}

