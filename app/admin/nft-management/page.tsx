"use client"

import React from "react"
import { NFTRegistration } from "@/components/admin/NFTRegistration"
import { NFTAssignment } from "@/components/admin/NFTAssignment"
import { NFTCollection } from "@/components/admin/NFTCollection"

const mockNFTs = [
  { id: "nft300", name: "SHOGUN NFT300", imageUrl: "/nft-images/nft300.jpg", price: 300 },
  { id: "nft500", name: "SHOGUN NFT500", imageUrl: "/nft-images/nft500.jpg", price: 500 },
  { id: "nft1000", name: "SHOGUN NFT1000", imageUrl: "/nft-images/nft1000.jpg", price: 1000 },
  { id: "nft3000", name: "SHOGUN NFT3000", imageUrl: "/nft-images/nft3000.jpg", price: 3000 },
]

export default function NFTManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">NFT管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <NFTRegistration />
        <NFTAssignment />
      </div>
      <NFTCollection nfts={mockNFTs} />
    </div>
  )
}

