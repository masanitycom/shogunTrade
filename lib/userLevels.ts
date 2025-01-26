import type { NFT } from "./models/nft"

export type UserLevel = "未投資" | "足軽" | "武将" | "代官" | "奉行" | "老中" | "大老" | "大名" | "将軍"

export function getUserLevel(maxSeriesInvestment: number, otherSeriesInvestment: number, ownedNFTs: NFT[]): UserLevel {
  // SHOGUN NFT1000以上を所有しているか確認
  const hasRequiredNFT = ownedNFTs.some((nft) => nft.price >= 1000 && nft.name.startsWith("SHOGUN NFT"))

  if (!hasRequiredNFT || maxSeriesInvestment === 0) return "未投資"

  if (maxSeriesInvestment >= 600000 && otherSeriesInvestment >= 500000) return "将軍"
  if (maxSeriesInvestment >= 300000 && otherSeriesInvestment >= 150000) return "大名"
  if (maxSeriesInvestment >= 100000 && otherSeriesInvestment >= 50000) return "大老"
  if (maxSeriesInvestment >= 50000 && otherSeriesInvestment >= 25000) return "老中"
  if (maxSeriesInvestment >= 10000 && otherSeriesInvestment >= 5000) return "奉行"
  if (maxSeriesInvestment >= 5000 && otherSeriesInvestment >= 2500) return "代官"
  if (maxSeriesInvestment >= 3000 && otherSeriesInvestment >= 1500) return "武将"
  if (maxSeriesInvestment >= 1000) return "足軽"

  return "未投資"
}

export function getLevelRewardRate(level: UserLevel): number {
  switch (level) {
    case "将軍":
      return 0.02
    case "大名":
      return 0.015
    case "大老":
      return 0.0125
    case "老中":
      return 0.01
    case "奉行":
      return 0.0075
    case "代官":
      return 0.005
    case "武将":
      return 0.0025
    case "足軽":
      return 0.001
    default:
      return 0
  }
}

