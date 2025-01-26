import { NextResponse } from "next/server"
import { rejectNFTRequest } from "@/lib/db" // 仮想的な関数

export async function POST(req: Request) {
  try {
    const { requestId, rejectReason } = await req.json()

    // NFTリクエストを拒否し、データベースを更新
    await rejectNFTRequest(requestId, rejectReason)

    return NextResponse.json({ success: true, message: "NFTリクエストが拒否されました" })
  } catch (error) {
    console.error("NFTリクエスト拒否エラー:", error)
    return NextResponse.json({ success: false, message: "NFTリクエストの拒否に失敗しました" }, { status: 500 })
  }
}

