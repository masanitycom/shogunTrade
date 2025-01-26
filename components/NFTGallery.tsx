import React from "react"
import type { User } from "@/lib/models/user"

interface NFTGalleryProps {
  user: User
}

export function NFTGallery({ user }: NFTGalleryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">NFTギャラリー</h2>
      <div className="grid grid-cols-2 gap-4">
        {user.nfts.map((nft) => (
          <div key={nft.id} className="border p-2 rounded">
            <h3 className="font-bold">{nft.name}</h3>
            <p>価値: {nft.value}円</p>
          </div>
        ))}
      </div>
    </div>
  )
}

