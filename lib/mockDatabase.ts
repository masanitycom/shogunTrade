import type { NFT } from "./models/nft"

export interface User {
  id: string
  name: string
  email: string
  level: string
  maxSeriesInvestment: number
  otherSeriesInvestment: number
  referrals: string[]
  nfts: NFT[]
}

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "ヤマダタロウ",
    email: "taro@example.com",
    level: "代官",
    maxSeriesInvestment: 5000,
    otherSeriesInvestment: 2500,
    referrals: ["user2", "user3"],
    nfts: [
      {
        id: "nft1",
        name: "SHOGUN NFT1000",
        price: 1000,
        dailyRate: 0.01,
        maxDailyRate: 0.01,
        imageUrl: "/nft-images/nft1000.jpg",
        currentValue: 1200,
        accumulatedRewards: 200,
        isActive: true,
        purchaseDate: "2023-05-01",
        operationStartDate: "2023-05-03",
      },
      {
        id: "nft2",
        name: "SHOGUN NFT3000",
        price: 3000,
        dailyRate: 0.01,
        maxDailyRate: 0.01,
        imageUrl: "/nft-images/nft3000.jpg",
        currentValue: 3300,
        accumulatedRewards: 300,
        isActive: true,
        purchaseDate: "2023-05-15",
        operationStartDate: "2023-05-17",
      },
    ],
  },
  {
    id: "user2",
    name: "サトウハナコ",
    email: "hanako@example.com",
    level: "武将",
    maxSeriesInvestment: 3000,
    otherSeriesInvestment: 1500,
    referrals: ["user4", "user5"],
    nfts: [
      {
        id: "nft3",
        name: "SHOGUN NFT1000",
        price: 1000,
        dailyRate: 0.01,
        maxDailyRate: 0.01,
        imageUrl: "/nft-images/nft1000.jpg",
        currentValue: 1100,
        accumulatedRewards: 100,
        isActive: true,
        purchaseDate: "2023-05-10",
        operationStartDate: "2023-05-12",
      },
    ],
  },
  {
    id: "user3",
    name: "タナカジロウ",
    email: "jiro@example.com",
    level: "足軽",
    maxSeriesInvestment: 1000,
    otherSeriesInvestment: 0,
    referrals: [],
    nfts: [
      {
        id: "nft4",
        name: "SHOGUN NFT1000",
        price: 1000,
        dailyRate: 0.01,
        maxDailyRate: 0.01,
        imageUrl: "/nft-images/nft1000.jpg",
        currentValue: 1050,
        accumulatedRewards: 50,
        isActive: true,
        purchaseDate: "2023-05-20",
        operationStartDate: "2023-05-22",
      },
    ],
  },
]

export interface NFTPurchaseRequest {
  id: string
  userId: string
  nftType: string
  requestDate: string
  status: "pending" | "approved" | "rejected" | "payment_confirmed"
  walletAddress: string
  approvalDate?: string
  operationStartDate?: string
}

export const mockNFTPurchaseRequests: NFTPurchaseRequest[] = [
  {
    id: "req1",
    userId: "user1",
    nftType: "SHOGUN NFT5000",
    requestDate: "2023-05-25",
    status: "pending",
    walletAddress: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "req2",
    userId: "user2",
    nftType: "SHOGUN NFT3000",
    requestDate: "2023-05-26",
    status: "pending",
    walletAddress: "0x0987654321098765432109876543210987654321",
  },
  {
    id: "req3",
    userId: "user3",
    nftType: "SHOGUN NFT1000",
    requestDate: "2023-05-27",
    status: "pending",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
]

export function getUser(userId: string): User | undefined {
  return mockUsers.find((user) => user.id === userId)
}

export function getNFTPurchaseRequests(): NFTPurchaseRequest[] {
  return mockNFTPurchaseRequests
}

export function updateNFTPurchaseRequest(requestId: string, updates: Partial<NFTPurchaseRequest>): void {
  const index = mockNFTPurchaseRequests.findIndex((req) => req.id === requestId)
  if (index !== -1) {
    mockNFTPurchaseRequests[index] = { ...mockNFTPurchaseRequests[index], ...updates }
  }
}

