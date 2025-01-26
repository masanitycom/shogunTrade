import { NextResponse } from "next/server"
import { sendNFTToWallet } from "@/lib/blockchain" // 仮想的な関数
import { updateUserNFT } from "@/lib/db" // 仮想的な関数

export async function POST(req: Request) {
  try {
    const { userId, nftId, reflectionDate } = await req.json()

    // ブロックチェーンにNFTを送信
    await sendNFTToWallet(userId, nftId)

    // データベースを更新（反映日を含む）
    await updateUserNFT(userId, nftId, reflectionDate)

    return NextResponse.json({ success: true, message: "NFTが正常に送信され、反映日が設定されました" })
  } catch (error) {
    console.error("NFT送信エラー:", error)
    return NextResponse.json({ success: false, message: "NFTの送信に失敗しました" }, { status: 500 })
  }
}

