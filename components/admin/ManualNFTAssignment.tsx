import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { defaultNFTs } from "@/lib/models/nft"

interface ManualNFTAssignmentProps {
  className?: string
}

export function ManualNFTAssignment({ className }: ManualNFTAssignmentProps) {
  const [userId, setUserId] = useState("")
  const [selectedNFT, setSelectedNFT] = useState("")
  const [reflectionDate, setReflectionDate] = useState("")

  const handleAssignNFT = async () => {
    if (!userId || !selectedNFT || !reflectionDate) {
      toast({
        title: "エラー",
        description: "ユーザーID、NFTタイプ、反映日をすべて入力してください。",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/send-nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, nftId: selectedNFT, reflectionDate }),
      })

      if (!response.ok) {
        throw new Error("NFTの割り当てに失敗しました")
      }

      const data = await response.json()

      toast({
        title: "NFTが割り当てられました",
        description: `ユーザーID: ${userId} に ${selectedNFT} が割り当てられました。反映日: ${reflectionDate}`,
      })

      // フォームをリセット
      setUserId("")
      setSelectedNFT("")
      setReflectionDate("")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "エラー",
        description: "NFTの割り当て中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>手動NFT割り当て</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              ユーザーID
            </label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ユーザーIDを入力"
            />
          </div>
          <div>
            <label htmlFor="nftType" className="block text-sm font-medium text-gray-700">
              NFTタイプ
            </label>
            <Select value={selectedNFT} onValueChange={setSelectedNFT}>
              <SelectTrigger>
                <SelectValue placeholder="NFTタイプを選択" />
              </SelectTrigger>
              <SelectContent>
                {defaultNFTs.map((nft) => (
                  <SelectItem key={nft.id} value={nft.id}>
                    {nft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="reflectionDate" className="block text-sm font-medium text-gray-700">
              反映日
            </label>
            <Input
              id="reflectionDate"
              type="date"
              value={reflectionDate}
              onChange={(e) => setReflectionDate(e.target.value)}
            />
          </div>
          <Button onClick={handleAssignNFT}>NFTを割り当て</Button>
        </div>
      </CardContent>
    </Card>
  )
}

