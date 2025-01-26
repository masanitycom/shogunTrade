import type React from "react"
import { useState, useEffect } from "react"
import type { User } from "@/lib/models/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileEditorProps {
  user: User
  onUpdate: (updatedUser: User) => void
}

export function ProfileEditor({ user, onUpdate }: ProfileEditorProps) {
  const [usdtAddress, setUsdtAddress] = useState("")

  useEffect(() => {
    if (user && user.usdtAddress) {
      setUsdtAddress(user.usdtAddress)
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      onUpdate({ ...user, usdtAddress })
    }
  }

  if (!user) {
    return <div>ユーザー情報を読み込んでいます...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">プロフィール編集</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" value={user.name} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" value={user.email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usdtAddress">USDT (BEP20) アドレス</Label>
            <Input
              id="usdtAddress"
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              placeholder="USDT アドレスを入力してください"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            プロフィールを更新
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

