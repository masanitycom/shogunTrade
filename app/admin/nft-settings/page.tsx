"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { defaultNFTs, type NFT } from "@/lib/models/nft"

export default function NFTSettingsPage() {
  const [nfts, setNfts] = useState<NFT[]>(defaultNFTs)

  const handleNFTChange = (id: string, field: keyof NFT, value: string | number) => {
    setNfts(
      nfts.map((nft) =>
        nft.id === id ? { ...nft, [field]: typeof value === "string" ? Number.parseFloat(value) : value } : nft,
      ),
    )
  }

  const handleSave = () => {
    // TODO: Implement API call to save NFT settings
    console.log("Saving NFT settings:", nfts)
    toast({
      title: "NFT設定を保存しました",
      description: "変更が適用されました。",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">NFT設定</h1>
      <Card>
        <CardHeader>
          <CardTitle>SHOGUN NFTシリーズ設定</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>価格 (USDT)</TableHead>
                <TableHead>日利 (%)</TableHead>
                <TableHead>最大日利 (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nfts.map((nft) => (
                <TableRow key={nft.id}>
                  <TableCell>{nft.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={nft.price}
                      onChange={(e) => handleNFTChange(nft.id, "price", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={nft.dailyRate * 100}
                      onChange={(e) => handleNFTChange(nft.id, "dailyRate", Number.parseFloat(e.target.value) / 100)}
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={nft.maxDailyRate * 100}
                      onChange={(e) => handleNFTChange(nft.id, "maxDailyRate", Number.parseFloat(e.target.value) / 100)}
                      step="0.01"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleSave} className="mt-4">
            設定を保存
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

