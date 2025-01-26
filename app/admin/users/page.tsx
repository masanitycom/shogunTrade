"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import Link from "next/link"

// モックユーザーデータ
const mockUsers = [
  {
    id: 1,
    name: "山田太郎",
    email: "taro@example.com",
    level: "代官",
    investment: 6000,
    nfts: [
      { name: "SHOGUN NFT1000", purchaseDate: "2023-05-15" },
      { name: "SHOGUN NFT3000", purchaseDate: "2023-06-01" },
    ],
  },
  {
    id: 2,
    name: "佐藤花子",
    email: "hanako@example.com",
    level: "武将",
    investment: 3000,
    nfts: [{ name: "SHOGUN NFT500", purchaseDate: "2023-05-20" }],
  },
  { id: 3, name: "鈴木一郎", email: "ichiro@example.com", level: "足軽", investment: 1000, nfts: [] },
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">ユーザー管理</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ユーザー検索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="名前またはメールアドレスで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button variant="outline">
              <FaSearch className="mr-2" />
              検索
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ユーザー一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>レベル</TableHead>
                <TableHead>投資額</TableHead>
                <TableHead>所有NFT</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.level}</TableCell>
                  <TableCell>${user.investment.toLocaleString()}</TableCell>
                  <TableCell>
                    {user.nfts.map((nft, index) => (
                      <div key={index}>
                        {nft.name} (購入日: {nft.purchaseDate})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <FaEdit className="mr-2" />
                          編集
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm">
                        <FaTrash className="mr-2" />
                        削除
                      </Button>
                    </div>
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

