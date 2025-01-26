import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FaShoppingCart } from "react-icons/fa"
import { checkNFTStatus } from "@/lib/rewards"

interface NFT {
  id: string
  name: string
  price: number
  imageUrl: string
  currentValue: number
  accumulatedRewards: number
  isActive: boolean
  purchaseDate: string
  operationStartDate: string
}

interface NFTCollectionProps {
  ownedNFTs: NFT[] | null
  onPurchase: () => void
}

export default function NFTCollection({ ownedNFTs, onPurchase }: NFTCollectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NFTコレクション</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-4">所有中のNFT</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {ownedNFTs &&
            ownedNFTs.map((nft) => {
              const { isActive, remainingPercentage } = checkNFTStatus(nft)
              return (
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
                    <p className="text-sm text-gray-600">購入価格: ${nft.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">現在の価値: ${nft.currentValue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">累積報酬: ${nft.accumulatedRewards.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">購入日: {nft.purchaseDate}</p>
                    <p className="text-sm text-gray-600">運用開始日: {nft.operationStartDate}</p>
                    <p className="text-sm text-gray-600">ステータス: {isActive ? "運用中" : "運用終了"}</p>
                    {isActive && <p className="text-sm text-gray-600">残り: {remainingPercentage.toFixed(2)}%</p>}
                  </CardContent>
                </Card>
              )
            })}
        </div>
        <Button onClick={onPurchase} className="w-full">
          <FaShoppingCart className="mr-2" />
          NFTを購入
        </Button>
      </CardContent>
    </Card>
  )
}

