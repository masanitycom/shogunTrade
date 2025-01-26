"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useSettings } from "@/lib/settings"

const nftOptions = [
  { value: "SHOGUN NFT300", label: "SHOGUN NFT300", price: 300 },
  { value: "SHOGUN NFT500", label: "SHOGUN NFT500", price: 500 },
  { value: "SHOGUN NFT1000", label: "SHOGUN NFT1000", price: 1000 },
  { value: "SHOGUN NFT3000", label: "SHOGUN NFT3000", price: 3000 },
  { value: "SHOGUN NFT5000", label: "SHOGUN NFT5000", price: 5000 },
  { value: "SHOGUN NFT10000", label: "SHOGUN NFT10000", price: 10000 },
  { value: "SHOGUN NFT30000", label: "SHOGUN NFT30000", price: 30000 },
  { value: "SHOGUN NFT100000", label: "SHOGUN NFT100000", price: 100000 },
]

interface NFTPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (nftType: string) => void
}

export default function NFTPurchaseModal({ isOpen, onClose, onPurchase }: NFTPurchaseModalProps) {
  const [selectedNFT, setSelectedNFT] = useState("")
  const [showPaymentAddress, setShowPaymentAddress] = useState(false)
  const { nftPurchaseMessage } = useSettings()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedNFT) {
      try {
        // TODO: 実際のAPIエンドポイントに置き換える
        const response = await fetch("/api/nft-purchase-requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nftType: selectedNFT }),
        })
        if (response.ok) {
          onPurchase(selectedNFT)
          setShowPaymentAddress(true)
          toast({
            title: "購入リクエストが送信されました",
            description: "管理者が確認後、NFTが送付されます。",
          })
        } else {
          throw new Error("購入リクエストの送信に失敗しました")
        }
      } catch (error) {
        console.error("Error:", error)
        toast({
          title: "エラー",
          description: "購入リクエストの送信中にエラーが発生しました。",
          variant: "destructive",
        })
      }
    }
  }

  const handleClose = () => {
    setSelectedNFT("")
    setShowPaymentAddress(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NFTを購入</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nft-type" className="text-right">
                NFTタイプ
              </Label>
              <Select value={selectedNFT} onValueChange={setSelectedNFT}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="NFTを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {nftOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} (${option.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!selectedNFT || showPaymentAddress}>
              購入する
            </Button>
          </DialogFooter>
        </form>
        {showPaymentAddress && (
          <div className="mt-4">
            <p className="font-bold">送金先アドレス:</p>
            <p className="text-sm break-all">0x1234567890123456789012345678901234567890</p>
            <p className="text-sm mt-2">{nftPurchaseMessage}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

