import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface UserProfileEditProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    email: string
    usdtAddress: string
  }
  onSave: (updatedUser: { name: string; email: string; usdtAddress: string }) => void
}

export default function UserProfileEdit({ isOpen, onClose, user, onSave }: UserProfileEditProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [usdtAddress, setUsdtAddress] = useState(user.usdtAddress)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !usdtAddress) {
      toast({
        title: "エラー",
        description: "すべての項目を入力してください。",
        variant: "destructive",
      })
      return
    }
    onSave({ name, email, usdtAddress })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名前
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="usdtAddress" className="text-right">
                USDT (BEP20) アドレス
              </Label>
              <Input
                id="usdtAddress"
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
                className="col-span-3"
                placeholder="0x..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

