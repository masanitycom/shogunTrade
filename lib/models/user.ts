export type UserLevel = "" | "足軽" | "武将" | "代官" | "奉行" | "老中" | "大老" | "大名" | "将軍"

export interface User {
  id: string
  name: string
  email: string
  level: UserLevel
  maxSeriesInvestment: number
  otherSeriesInvestment: number
  usdtAddress: string
  referrals: string[]
  nfts: NFT[]
  ownedNFTs: NFT[]
}

interface NFT {
  id: string
  name: string
  value: number
}

export const getLevelRequirements = (level: UserLevel): { maxSeries: number; otherSeries: number } => {
  switch (level) {
    case "足軽":
      return { maxSeries: 1000, otherSeries: 0 }
    case "武将":
      return { maxSeries: 3000, otherSeries: 1500 }
    case "代官":
      return { maxSeries: 5000, otherSeries: 2500 }
    case "奉行":
      return { maxSeries: 10000, otherSeries: 5000 }
    case "老中":
      return { maxSeries: 50000, otherSeries: 25000 }
    case "大老":
      return { maxSeries: 100000, otherSeries: 50000 }
    case "大名":
      return { maxSeries: 300000, otherSeries: 150000 }
    case "将軍":
      return { maxSeries: 600000, otherSeries: 500000 }
    default:
      return { maxSeries: 0, otherSeries: 0 }
  }
}

export const getUserLevel = (
  maxSeriesInvestment: number,
  otherSeriesInvestment: number,
  ownedNFTs: NFT[],
): UserLevel => {
  const hasRequiredNFT = ownedNFTs.some((nft) => nft.value >= 1000 && nft.name.startsWith("SHOGUN NFT"))
  if (!hasRequiredNFT) return ""

  if (maxSeriesInvestment >= 600000 && otherSeriesInvestment >= 500000) return "将軍"
  if (maxSeriesInvestment >= 300000 && otherSeriesInvestment >= 150000) return "大名"
  if (maxSeriesInvestment >= 100000 && otherSeriesInvestment >= 50000) return "大老"
  if (maxSeriesInvestment >= 50000 && otherSeriesInvestment >= 25000) return "老中"
  if (maxSeriesInvestment >= 10000 && otherSeriesInvestment >= 5000) return "奉行"
  if (maxSeriesInvestment >= 5000 && otherSeriesInvestment >= 2500) return "代官"
  if (maxSeriesInvestment >= 3000 && otherSeriesInvestment >= 1500) return "武将"
  if (maxSeriesInvestment >= 1000) return "足軽"
  return ""
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "山田太郎",
    email: "taro@example.com",
    level: "",
    maxSeriesInvestment: 800,
    otherSeriesInvestment: 0,
    usdtAddress: "0x1234567890123456789012345678901234567890",
    referrals: ["2"],
    nfts: [
      { id: "nft1", name: "ゴールドサムライ", value: 500 },
      { id: "nft2", name: "シルバーニンジャ", value: 300 },
    ],
    ownedNFTs: [
      { id: "nft1", name: "SHOGUN NFT1000", value: 1000 },
      { id: "nft2", name: "SHOGUN NFT500", value: 500 },
    ],
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "hanako@example.com",
    level: "武将",
    investment: 3500,
    maxSeriesInvestment: 3000,
    otherSeriesInvestment: 1500,
    usdtAddress: "0x0987654321098765432109876543210987654321",
    referrals: [],
    nfts: [{ id: "nft3", name: "ブロンズアーチャー", value: 3500 }],
    ownedNFTs: [{ id: "nft3", name: "SHOGUN NFT3000", value: 3000 }],
  },
]

