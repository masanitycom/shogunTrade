"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { FaUser, FaUserCog } from "react-icons/fa"

export default function LoginPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const router = useRouter()

  // モックユーザー情報
  const mockUsers = {
    user: { id: "user123", password: "pass123" },
    admin: { id: "admin123", password: "admin123" },
  }

  useEffect(() => {
    // 既存のセッションをクリア
    localStorage.removeItem("adminAuthToken")
    localStorage.removeItem("userAuthToken")
    localStorage.removeItem("userRole")
    console.log("Session cleared") // デバッグ用
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { userId, password, isAdminLogin }) // デバッグ用

    if (isAdminLogin) {
      if (userId === mockUsers.admin.id && password === mockUsers.admin.password) {
        console.log("Admin login successful") // デバッグ用
        localStorage.setItem("adminAuthToken", "dummy_admin_token")
        localStorage.setItem("userRole", "admin")
        toast({
          title: "管理者ログイン成功",
          description: "管理者ダッシュボードにリダイレクトします。",
        })
        await new Promise((resolve) => setTimeout(resolve, 1000)) // トースト表示のための遅延
        router.push("/admin/dashboard")
      } else {
        console.log("Admin login failed") // デバッグ用
        toast({
          title: "エラー",
          description: "管理者IDまたはパスワードが正しくありません",
          variant: "destructive",
        })
      }
    } else {
      if (userId === mockUsers.user.id && password === mockUsers.user.password) {
        console.log("User login successful") // デバッグ用
        localStorage.setItem("userAuthToken", "dummy_user_token")
        localStorage.setItem("userRole", "user")
        toast({
          title: "ユーザーログイン成功",
          description: "ダッシュボードにリダイレクトします。",
        })
        await new Promise((resolve) => setTimeout(resolve, 1000)) // トースト表示のための遅延
        router.push("/dashboard")
      } else {
        console.log("User login failed") // デバッグ用
        toast({
          title: "エラー",
          description: "ユーザーIDまたはパスワードが正しくありません",
          variant: "destructive",
        })
      }
    }
  }

  const toggleLoginType = () => {
    setIsAdminLogin(!isAdminLogin)
    setUserId("")
    setPassword("")
    console.log("Login type toggled:", !isAdminLogin ? "Admin" : "User") // デバッグ用
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isAdminLogin ? "管理者ログイン" : "ユーザーログイン"}
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">Shogun-Tradeへようこそ</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">ユーザーID</Label>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="ユーザーIDを入力"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              ログイン
            </Button>
            {!isAdminLogin && (
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">
                  新規登録
                </Button>
              </Link>
            )}
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="secondary"
              onClick={toggleLoginType}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium"
            >
              {isAdminLogin ? (
                <span className="flex items-center justify-center gap-2">
                  <FaUser className="w-4 h-4" />
                  ユーザーログインへ戻る
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaUserCog className="w-4 h-4" />
                  管理者ログインはこちら
                </span>
              )}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">テスト用アカウント：</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>一般ユーザー: ID: user123 / パスワード: pass123</p>
              <p>管理者: ID: admin123 / パスワード: admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

