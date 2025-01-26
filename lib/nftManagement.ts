import { defaultNFTs, type NFT } from "./models/nft"

const nftCollection: NFT[] = [...defaultNFTs]

export function registerNFT(newNFT: NFT) {
  const existingIndex = nftCollection.findIndex((nft) => nft.id === newNFT.id)
  if (existingIndex !== -1) {
    nftCollection[existingIndex] = newNFT
  } else {
    nftCollection.push(newNFT)
  }
}

export function getNFTCollection(): NFT[] {
  return nftCollection
}

export function assignNFTToUser(userId: string, nftId: string) {
  // This is a placeholder. In a real application, you would update the user's NFT collection in the database.
  console.log(`Assigning NFT ${nftId} to user ${userId}`)
}

export function updateNFT(updatedNFT: NFT) {
  const index = nftCollection.findIndex((nft) => nft.id === updatedNFT.id)
  if (index !== -1) {
    nftCollection[index] = updatedNFT
  }
}

