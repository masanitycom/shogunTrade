import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { getNFTCollection, assignNFTToUser } from "@/lib/nftManagement"
import type { NFT } from "@/lib/models/nft"

export function NFTAssignment() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedNFT, setSelectedNFT] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    setNfts(getNFTCollection())
  }, [])

  const handleAssign = async () => {
    if (!selectedNFT || !userId) {
      toast({
        title: "エラー",
        description: "NFTとユーザーIDを選択してください。",
        variant: "destructive",
      })
      return
    }

    assignNFTToUser(userId, selectedNFT)

    toast({
      title: "NFTが割り当てられました",
      description: `${selectedNFT}がユーザー${userId}に割り当てられました。`,
    })

    // Reset form
    setSelectedNFT("")
    setUserId("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT割り当て</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nft-select">NFT</Label>
            <Select value={selectedNFT} onValueChange={setSelectedNFT}>
              <SelectTrigger>
                <SelectValue placeholder="NFTを選択" />
              </SelectTrigger>
              <SelectContent>
                {nfts.map((nft) => (
                  <SelectItem key={nft.id} value={nft.id}>
                    {nft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-id">ユーザーID</Label>
            <Input
              id="user-id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ユーザーIDを入力"
            />
          </div>
          <Button onClick={handleAssign}>NFTを割り当て</Button>
        </div>
      </CardContent>
    </Card>
  )
}

