import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { NFTImageUpload } from "./NFTImageUpload"
import { NFTCollection } from "./NFTCollection"

interface NFT {
  id: string
  name: string
  imageUrl: string
  price: number
}

interface UserNFT extends NFT {
  userId: string
  purchaseDate: string
  startDate: string
}

const availableNFTs: NFT[] = [
  { id: "nft300", name: "SHOGUN NFT300", imageUrl: "/nft-images/nft300.jpg", price: 300 },
  { id: "nft500", name: "SHOGUN NFT500", imageUrl: "/nft-images/nft500.jpg", price: 500 },
  { id: "nft1000", name: "SHOGUN NFT1000", imageUrl: "/nft-images/nft1000.jpg", price: 1000 },
  { id: "nft3000", name: "SHOGUN NFT3000", imageUrl: "/nft-images/nft3000.jpg", price: 3000 },
  { id: "nft5000", name: "SHOGUN NFT5000", imageUrl: "/nft-images/nft5000.jpg", price: 5000 },
  { id: "nft10000", name: "SHOGUN NFT10000", imageUrl: "/nft-images/nft10000.jpg", price: 10000 },
  { id: "nft30000", name: "SHOGUN NFT30000", imageUrl: "/nft-images/nft30000.jpg", price: 30000 },
  { id: "nft100000", name: "SHOGUN NFT100000", imageUrl: "/nft-images/nft100000.jpg", price: 100000 },
]

export function NFTManagement() {
  const [userNFTs, setUserNFTs] = useState<UserNFT[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<string>("")
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    fetchUserNFTs()
  }, [])

  const fetchUserNFTs = async () => {
    // TODO: Fetch actual user NFTs from the backend
    const mockUserNFTs: UserNFT[] = [
      { ...availableNFTs[2], userId: "user1", purchaseDate: "2023-06-01", startDate: "2023-06-05" },
      { ...availableNFTs[3], userId: "user2", purchaseDate: "2023-06-08", startDate: "2023-06-12" },
    ]
    setUserNFTs(mockUserNFTs)
  }

  const handleAddNFT = async () => {
    if (!selectedNFT || !userId) {
      toast({
        title: "エラー",
        description: "NFTとユーザーIDを選択してください。",
        variant: "destructive",
      })
      return
    }

    try {
      // TODO: Implement actual API call to add NFT to user
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

      const nft = availableNFTs.find((nft) => nft.id === selectedNFT)
      if (!nft) throw new Error("Selected NFT not found")

      const purchaseDate = new Date().toISOString().split("T")[0]
      const nextMonday = getNextMonday()
      const newUserNFT: UserNFT = {
        ...nft,
        userId: userId,
        purchaseDate: purchaseDate,
        startDate: nextMonday.toISOString().split("T")[0],
      }

      setUserNFTs([...userNFTs, newUserNFT])
      setIsAddModalOpen(false)
      setSelectedNFT("")
      setUserId("")

      toast({
        title: "NFTが追加されました",
        description: `${nft.name}がユーザー${userId}に追加されました。購入日: ${purchaseDate}, 運用開始日: ${newUserNFT.startDate}`,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "エラー",
        description: "NFTの追加中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNFT = async (id: string, userId: string) => {
    try {
      // TODO: Implement actual API call to remove NFT from user
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

      setUserNFTs(userNFTs.filter((nft) => !(nft.id === id && nft.userId === userId)))

      toast({
        title: "NFTが削除されました",
        description: "NFTがユーザーから正常に削除されました。",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "エラー",
        description: "NFTの削除中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  const getNextMonday = () => {
    const today = new Date()
    const nextMonday = new Date(today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)))
    return nextMonday
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>NFT管理</span>
            <Button onClick={() => setIsAddModalOpen(true)}>NFT追加</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NFTImageUpload />
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>NFT名</TableHead>
                <TableHead>ユーザーID</TableHead>
                <TableHead>購入日</TableHead>
                <TableHead>運用開始日</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userNFTs.map((nft) => (
                <TableRow key={`${nft.id}-${nft.userId}`}>
                  <TableCell>{nft.name}</TableCell>
                  <TableCell>{nft.userId}</TableCell>
                  <TableCell>{nft.purchaseDate}</TableCell>
                  <TableCell>{nft.startDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteNFT(nft.id, nft.userId)} variant="destructive">
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NFTCollection nfts={availableNFTs} />

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NFT追加</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nft-select" className="text-right">
                NFT
              </Label>
              <Select value={selectedNFT} onValueChange={setSelectedNFT}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="NFTを選択" />
                </SelectTrigger>
                <SelectContent>
                  {availableNFTs.map((nft) => (
                    <SelectItem key={nft.id} value={nft.id}>
                      {nft.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-id" className="text-right">
                ユーザーID
              </Label>
              <Input id="user-id" value={userId} onChange={(e) => setUserId(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddNFT}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

