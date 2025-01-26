"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement actual password reset logic
      console.log("Password reset requested for:", email)
      toast({
        title: "パスワードリセット",
        description: "パスワードリセットの手順をメールで送信しました。",
      })
      router.push("/login")
    } catch (err) {
      console.error("Password reset error:", err)
      toast({
        title: "エラー",
        description: "パスワードリセットに失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">パスワードをお忘れの方</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
              パスワードリセット
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

