import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface NFT {
  id: string
  name: string
  price: number
  dailyRate: number
  maxDailyRate: number
}

const initialNFTs: NFT[] = [
  { id: "nft300", name: "SHOGUN NFT300", price: 300, dailyRate: 0.005, maxDailyRate: 0.005 },
  { id: "nft500", name: "SHOGUN NFT500", price: 500, dailyRate: 0.005, maxDailyRate: 0.005 },
  { id: "nft1000", name: "SHOGUN NFT1000", price: 1000, dailyRate: 0.01, maxDailyRate: 0.01 },
  { id: "nft3000", name: "SHOGUN NFT3000", price: 3000, dailyRate: 0.01, maxDailyRate: 0.01 },
  { id: "nft5000", name: "SHOGUN NFT5000", price: 5000, dailyRate: 0.01, maxDailyRate: 0.01 },
  { id: "nft10000", name: "SHOGUN NFT10000", price: 10000, dailyRate: 0.0125, maxDailyRate: 0.0125 },
  { id: "nft50000", name: "SHOGUN NFT50000", price: 50000, dailyRate: 0.0175, maxDailyRate: 0.0175 },
  { id: "nft100000", name: "SHOGUN NFT100000", price: 100000, dailyRate: 0.02, maxDailyRate: 0.02 },
]

export function NFTDailyRates() {
  const [nfts, setNFTs] = useState<NFT[]>(initialNFTs)

  const handleRateChange = (id: string, newRate: number) => {
    setNFTs(nfts.map((nft) => (nft.id === id ? { ...nft, dailyRate: Math.min(newRate, nft.maxDailyRate) } : nft)))
  }

  const handleSave = () => {
    // TODO: Implement API call to save the updated rates
    console.log("Saving updated NFT rates:", nfts)
    toast({
      title: "NFT日利を更新しました",
      description: "変更が保存されました。",
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NFT名</TableHead>
            <TableHead>価格 (USDT)</TableHead>
            <TableHead>現在の日利 (%)</TableHead>
            <TableHead>最大日利 (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nfts.map((nft) => (
            <TableRow key={nft.id}>
              <TableCell>{nft.name}</TableCell>
              <TableCell>{nft.price}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={nft.dailyRate}
                  onChange={(e) => handleRateChange(nft.id, Number.parseFloat(e.target.value))}
                  step="0.0001"
                  min="0"
                  max={nft.maxDailyRate}
                />
              </TableCell>
              <TableCell>{(nft.maxDailyRate * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleSave} className="mt-4">
        保存
      </Button>
    </div>
  )
}

