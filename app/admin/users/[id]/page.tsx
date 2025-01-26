"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/models/user"

const mockUsers: User[] = [
  {
    id: "1",
    name: "山田太郎",
    email: "taro@example.com",
    level: "武将",
    investment: 3000,
    maxSeriesInvestment: 3000,
    otherSeriesInvestment: 1500,
    usdtAddress: "0x1234...",
    referrals: ["2", "3"],
    nfts: [],
    walletType: "evo",
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "hanako@example.com",
    level: "足軽",
    investment: 1000,
    maxSeriesInvestment: 1000,
    otherSeriesInvestment: 0,
    usdtAddress: "0x5678...",
    referrals: [],
    nfts: [],
    walletType: "other",
  },
  {
    id: "3",
    name: "鈴木一郎",
    email: "ichiro@example.com",
    level: "大名",
    investment: 50000,
    maxSeriesInvestment: 50000,
    otherSeriesInvestment: 25000,
    usdtAddress: "0xabcd...",
    referrals: ["4", "5", "6"],
    nfts: [],
    walletType: "evo",
  },
]

export default function UserDetail() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call
    const foundUser = mockUsers.find((u) => u.id === params.id)
    setUser(foundUser || null)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "エラー",
        description: "新しいパスワードと確認用パスワードが一致しません。",
        variant: "destructive",
      })
      return
    }

    try {
      // TODO: Implement actual update logic including password change
      const response = await fetch(`/api/admin/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, newPassword }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user")
      }

      console.log("User updated:", user)
      toast({
        title: "ユーザー情報を更新しました",
        description: "変更が保存されました。",
      })
      router.push("/admin/users")
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "エラー",
        description: "ユーザー情報の更新に失敗しました。",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ユーザー詳細
      </motion.h1>
      <Card>
        <CardHeader>
          <CardTitle>ユーザー情報編集</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">名前</Label>
              <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="level">レベル</Label>
              <Input id="level" value={user.level} onChange={(e) => setUser({ ...user, level: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="investment">投資額</Label>
              <Input
                id="investment"
                type="number"
                value={user.investment}
                onChange={(e) => setUser({ ...user, investment: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="usdtAddress">USDTアドレス</Label>
              <Input
                id="usdtAddress"
                value={user.usdtAddress}
                onChange={(e) => setUser({ ...user, usdtAddress: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="walletType">ウォレットタイプ</Label>
              <Select
                value={user.walletType}
                onValueChange={(value) => setUser({ ...user, walletType: value as "evo" | "other" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ウォレットタイプを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evo">EVOカード</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="newPassword">新しいパスワード</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="新しいパスワードを入力"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="新しいパスワードを再入力"
              />
            </div>
            <Button type="submit">更新</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

