"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AirdropUser {
  id: string
  name: string
  email: string
  usdtAddress: string
  quizWeek: number
  reward: number
  isPaid: boolean
}

const mockAirdropUsers: AirdropUser[] = [
  {
    id: "1",
    name: "山田太郎",
    email: "taro@example.com",
    usdtAddress: "0x1234...",
    quizWeek: 1,
    reward: 100,
    isPaid: false,
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "hanako@example.com",
    usdtAddress: "0x5678...",
    quizWeek: 1,
    reward: 100,
    isPaid: true,
  },
  {
    id: "3",
    name: "鈴木一郎",
    email: "ichiro@example.com",
    usdtAddress: "0xabcd...",
    quizWeek: 2,
    reward: 150,
    isPaid: false,
  },
]

export default function AirdropManagement() {
  const [airdropUsers, setAirdropUsers] = useState<AirdropUser[]>(mockAirdropUsers)
  const [filter, setFilter] = useState("")

  const filteredUsers = airdropUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) || user.email.toLowerCase().includes(filter.toLowerCase()),
  )

  const handlePaymentStatusChange = (userId: string) => {
    setAirdropUsers(airdropUsers.map((user) => (user.id === userId ? { ...user, isPaid: !user.isPaid } : user)))
  }

  const handleCSVDownload = () => {
    const headers = ["ID", "名前", "メールアドレス", "USDTアドレス", "クイズ週", "報酬", "支払い状況"]
    const csvContent =
      headers.join(",") +
      "\n" +
      filteredUsers
        .map((user) =>
          [
            user.id,
            user.name,
            user.email,
            user.usdtAddress,
            user.quizWeek,
            user.reward,
            user.isPaid ? "支払済" : "未払い",
          ].join(","),
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "airdrop_users.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">エアドロップ管理</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ユーザー検索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Label htmlFor="filter" className="sr-only">
              検索
            </Label>
            <Input
              id="filter"
              placeholder="名前またはメールアドレスで検索"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button onClick={handleCSVDownload}>CSVダウンロード</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>エアドロップ対象ユーザー</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>USDTアドレス</TableHead>
                <TableHead>クイズ週</TableHead>
                <TableHead>報酬</TableHead>
                <TableHead>支払い状況</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.usdtAddress}</TableCell>
                  <TableCell>{user.quizWeek}</TableCell>
                  <TableCell>${user.reward}</TableCell>
                  <TableCell>{user.isPaid ? "支払済" : "未払い"}</TableCell>
                  <TableCell>
                    <Button onClick={() => handlePaymentStatusChange(user.id)}>
                      {user.isPaid ? "未払いにする" : "支払済にする"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

