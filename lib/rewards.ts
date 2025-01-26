import { getUserNFTs, getUser } from "@/lib/db"
import type { NFT } from "@/lib/models/nft"
import { getLevelRewardRate, getUserLevel } from "@/lib/userLevels"

export async function calculateDailyRewards(userId: string, date: string) {
  const userNFTs = await getUserNFTs(userId)
  const user = await getUser(userId)
  let totalRewards = 0

  const userLevel = getUserLevel(user.maxSeriesInvestment, user.otherSeriesInvestment)
  const levelRewardRate = getLevelRewardRate(userLevel)

  for (const nft of userNFTs) {
    if (new Date(nft.operationStartDate) <= new Date(date) && nft.isActive) {
      const dailyReward = nft.price * nft.dailyRate
      const levelBonus = nft.price * levelRewardRate

      nft.accumulatedRewards += dailyReward + levelBonus
      nft.currentValue += dailyReward + levelBonus

      if (nft.currentValue >= nft.price * 3) {
        nft.isActive = false
        // ここでユーザーに通知を送る処理を追加
      } else {
        totalRewards += dailyReward + levelBonus
      }
    }
  }

  // 更新されたNFT情報をデータベースに保存する処理を追加

  return totalRewards
}

export function checkNFTStatus(nft: NFT): { isActive: boolean; remainingPercentage: number } {
  const maxValue = nft.price * 3
  const remainingPercentage = ((maxValue - nft.currentValue) / nft.price) * 100
  return {
    isActive: nft.currentValue < maxValue,
    remainingPercentage: Math.max(remainingPercentage, 0),
  }
}

