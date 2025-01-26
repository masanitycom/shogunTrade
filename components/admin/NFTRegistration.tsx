import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { registerNFT } from "@/lib/nftManagement"

export function NFTRegistration() {
  const [nftName, setNftName] = useState("")
  const [nftPrice, setNftPrice] = useState("")
  const [nftImage, setNftImage] = useState<File | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNftImage(event.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nftName || !nftPrice || !nftImage) {
      toast({
        title: "エラー",
        description: "すべての項目を入力してください。",
        variant: "destructive",
      })
      return
    }

    const newNFT = {
      id: `nft${Date.now()}`,
      name: nftName,
      price: Number(nftPrice),
      dailyRate: 0.01, // デフォルト値
      maxDailyRate: 0.01, // デフォルト値
      imageUrl: URL.createObjectURL(nftImage),
      currentValue: Number(nftPrice),
      accumulatedRewards: 0,
      isActive: true,
      purchaseDate: "",
      operationStartDate: "",
    }

    registerNFT(newNFT)

    toast({
      title: "NFTが登録されました",
      description: `${nftName}が正常に登録されました。`,
    })

    // Reset form
    setNftName("")
    setNftPrice("")
    setNftImage(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nft-name">NFT名</Label>
            <Input
              id="nft-name"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="SHOGUN NFT1000"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nft-price">価格 (USDT)</Label>
            <Input
              id="nft-price"
              type="number"
              value={nftPrice}
              onChange={(e) => setNftPrice(e.target.value)}
              placeholder="1000"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nft-image">NFT画像</Label>
            <Input id="nft-image" type="file" onChange={handleImageChange} accept="image/*" required />
          </div>
          <Button type="submit">NFTを登録</Button>
        </form>
      </CardContent>
    </Card>
  )
}

