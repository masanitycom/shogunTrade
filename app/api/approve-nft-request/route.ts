import { NextResponse } from "next/server"
import { approveNFTRequest } from "@/lib/db" // 仮想的な関数

export async function POST(req: Request) {
  try {
    const { requestId, approvalDate } = await req.json()

    // NFTリクエストを承認し、データベースを更新
    await approveNFTRequest(requestId, approvalDate)

    return NextResponse.json({ success: true, message: "NFTリクエストが承認され、反映日が設定されました" })
  } catch (error) {
    console.error("NFTリクエスト承認エラー:", error)
    return NextResponse.json({ success: false, message: "NFTリクエストの承認に失敗しました" }, { status: 500 })
  }
}

