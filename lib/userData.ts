import { getUserLevel, getLevelRewardRate } from "./userLevels"
import type { NFT } from "./models/nft"

export async function getUserData(userId: string) {
  // 実際のデータベースからユーザーデータを取得する代わりに、モックデータを使用
  const userData = await fetchUserFromDatabase(userId)

  const level = getUserLevel(userData.maxSeriesInvestment, userData.otherSeriesInvestment, userData.nfts)
  const levelRewardRate = getLevelRewardRate(level)

  return {
    ...userData,
    level,
    levelRewardRate,
  }
}

// この関数はモックデータを返します。実際の実装では、データベースクエリに置き換えてください。
async function fetchUserFromDatabase(userId: string) {
  // モックデータ
  return {
    id: userId,
    name: "ヤマダタロウ",
    email: "taro@example.com",
    maxSeriesInvestment: 0,
    otherSeriesInvestment: 0,
    investment: 0,
    nfts: [] as NFT[],
    referrals: [],
    dailyRewards: 0,
    totalRewards: 0,
    airdropReward: 0,
    recentRewards: [],
    weeklyRewards: [],
    usdtAddress: "0x1234567890123456789012345678901234567890",
  }
}

