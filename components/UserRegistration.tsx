"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface RegistrationFormData {
  name: string
  userId: string
  email: string
  password: string
  confirmPassword: string
  referrerId: string
  usdtAddress: string
  walletType: "evo" | "other"
}

interface UserRegistrationProps {
  referrerId?: string
  isAdminRegistration?: boolean
}

export default function UserRegistration({ referrerId = "", isAdminRegistration = false }: UserRegistrationProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    userId: "",
    email: "",
    password: "",
    confirmPassword: "",
    referrerId: referrerId,
    usdtAddress: "",
    walletType: "other",
  })
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({})

  useEffect(() => {
    if (referrerId) {
      setFormData((prevData) => ({ ...prevData, referrerId }))
    }
  }, [referrerId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const newErrors: Partial<RegistrationFormData> = {}

    if (!/^[ァ-ヶー]+$/.test(formData.name)) {
      newErrors.name = "カタカナのみ入力してください"
    }

    if (formData.userId.length < 6 || !/^[a-zA-Z0-9]+$/.test(formData.userId)) {
      newErrors.userId = "半角英数6文字以上で入力してください"
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください"
    }

    if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません"
    }

    if (formData.usdtAddress && !/^0x[a-fA-F0-9]{40}$/.test(formData.usdtAddress)) {
      newErrors.usdtAddress = "有効なUSDT BEP20アドレスを入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        // 紹介者IDが入力されている場合のみチェック
        if (formData.referrerId) {
          const isValidReferrer = await checkReferrer(formData.referrerId)
          if (!isValidReferrer) {
            setErrors({ ...errors, referrerId: "無効な紹介者IDです" })
            return
          }
        }

        // TODO: 実際のAPIを呼び出してユーザー登録を行う
        console.log("ユーザー登録:", formData)
        // 登録成功後、適切なページにリダイレクト
        if (isAdminRegistration) {
          router.push("/admin/users")
        } else {
          router.push("/dashboard")
        }
      } catch (err) {
        console.error("登録エラー:", err)
        // エラーハンドリング
      }
    }
  }

  // 紹介者IDの照合をシミュレートする関数
  const checkReferrer = async (referrerId: string): Promise<boolean> => {
    // TODO: 実際のデータベース照合ロジックに置き換える
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 1秒の遅延をシミュレート
    return ["user1", "user2", "user3"].includes(referrerId) // サンプルの有効なID
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isAdminRegistration ? "新規ユーザー登録（管理者）" : "新規ユーザー登録"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              名前（カタカナ）<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => {
                const katakanaValue = e.target.value.replace(/[^ァ-ヶー]/g, "")
                setFormData({ ...formData, name: katakanaValue })
              }}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="userId">
              ユーザーID<span className="text-red-500">*</span>
            </Label>
            <Input id="userId" name="userId" value={formData.userId} onChange={handleChange} required />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス<span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              パスワード<span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              パスワード（確認）<span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="referrerId">
              紹介者ID{!isAdminRegistration && !referrerId && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="referrerId"
              name="referrerId"
              value={formData.referrerId}
              onChange={handleChange}
              required={!isAdminRegistration && !referrerId}
              readOnly={!!referrerId}
            />
            {errors.referrerId && <p className="text-red-500 text-sm">{errors.referrerId}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="usdtAddress">USDTアドレス（BEP20）</Label>
            <Input id="usdtAddress" name="usdtAddress" value={formData.usdtAddress} onChange={handleChange} />
            {errors.usdtAddress && <p className="text-red-500 text-sm">{errors.usdtAddress}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletType">ウォレットタイプ</Label>
            <Select
              value={formData.walletType}
              onValueChange={(value) => setFormData({ ...formData, walletType: value as "evo" | "other" })}
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
          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            パスワードをお忘れですか？
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          <span className="text-red-500">*</span> は必須項目です
        </p>
      </CardContent>
    </Card>
  )
}

