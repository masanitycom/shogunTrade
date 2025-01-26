export interface NFT {
  id: string
  name: string
  price: number
  dailyRate: number
  maxDailyRate: number
  imageUrl: string
  purchaseMessage?: string
  currentValue: number
  accumulatedRewards: number
  isActive: boolean
  purchaseDate: string
  operationStartDate: string
}

export const defaultNFTs: NFT[] = [
  {
    id: "nft300",
    name: "SHOGUN NFT300",
    price: 300,
    dailyRate: 0.005,
    maxDailyRate: 0.005,
    imageUrl: "/nft-images/nft300.jpg",
    currentValue: 300,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft500",
    name: "SHOGUN NFT500",
    price: 500,
    dailyRate: 0.005,
    maxDailyRate: 0.005,
    imageUrl: "/nft-images/nft500.jpg",
    currentValue: 500,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft1000",
    name: "SHOGUN NFT1000",
    price: 1000,
    dailyRate: 0.01,
    maxDailyRate: 0.01,
    imageUrl: "/nft-images/nft1000.jpg",
    currentValue: 1000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft3000",
    name: "SHOGUN NFT3000",
    price: 3000,
    dailyRate: 0.01,
    maxDailyRate: 0.01,
    imageUrl: "/nft-images/nft3000.jpg",
    currentValue: 3000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft5000",
    name: "SHOGUN NFT5000",
    price: 5000,
    dailyRate: 0.01,
    maxDailyRate: 0.01,
    imageUrl: "/nft-images/nft5000.jpg",
    currentValue: 5000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft10000",
    name: "SHOGUN NFT10000",
    price: 10000,
    dailyRate: 0.0125,
    maxDailyRate: 0.0125,
    imageUrl: "/nft-images/nft10000.jpg",
    currentValue: 10000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft50000",
    name: "SHOGUN NFT50000",
    price: 50000,
    dailyRate: 0.0175,
    maxDailyRate: 0.0175,
    imageUrl: "/nft-images/nft50000.jpg",
    currentValue: 50000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
  {
    id: "nft100000",
    name: "SHOGUN NFT100000",
    price: 100000,
    dailyRate: 0.02,
    maxDailyRate: 0.02,
    imageUrl: "/nft-images/nft100000.jpg",
    currentValue: 100000,
    accumulatedRewards: 0,
    isActive: true,
    purchaseDate: "",
    operationStartDate: "",
  },
]

