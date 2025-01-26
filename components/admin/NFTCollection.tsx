import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { getNFTCollection } from "@/lib/nftManagement"
import type { NFT } from "@/lib/models/nft"

export function NFTCollection() {
  const [nfts, setNfts] = useState<NFT[]>([])

  useEffect(() => {
    setNfts(getNFTCollection())
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFTコレクション</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <Card key={nft.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-2">
                  <Image
                    src={nft.imageUrl || "/placeholder.svg"}
                    alt={nft.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="font-bold text-lg truncate">{nft.name}</h3>
                <p className="text-sm text-gray-600">価格: ${nft.price.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

