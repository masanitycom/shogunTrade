import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FEE_RATES } from "@/lib/constants"

interface UserReward {
  userId: string
  userName: string
  totalRewards: number
  pendingRewards: number
  lastRewardDate: string
  walletType: "evo" | "other"
}

const mockUserRewards: UserReward[] = [
  {
    userId: "user1",
    userName: "山田太郎",
    totalRewards: 5000,
    pendingRewards: 1000,
    lastRewardDate: "2023-05-25",
    walletType: "evo",
  },
  {
    userId: "user2",
    userName: "佐藤花子",
    totalRewards: 7500,
    pendingRewards: 1500,
    lastRewardDate: "2023-05-24",
    walletType: "other",
  },
  {
    userId: "user3",
    userName: "鈴木一郎",
    totalRewards: 10000,
    pendingRewards: 2000,
    lastRewardDate: "2023-05-23",
    walletType: "evo",
  },
  {
    userId: "user4",
    userName: "田中次郎",
    totalRewards: 2500,
    pendingRewards: 500,
    lastRewardDate: "2023-05-22",
    walletType: "other",
  },
]

const calculateFeeAmount = (amount: number, walletType: "evo" | "other") => {
  const feeRate = FEE_RATES[walletType]
  return amount * feeRate
}

export function UserRewards() {
  const [userRewards, setUserRewards] = useState<UserReward[]>(mockUserRewards)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRewards = userRewards.filter(
    (reward) =>
      reward.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-6">ユーザー報酬情報</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="ユーザー名またはIDで検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ユーザー名</TableHead>
              <TableHead>ユーザーID</TableHead>
              <TableHead>総報酬額</TableHead>
              <TableHead>保留中の報酬</TableHead>
              <TableHead>手数料</TableHead>
              <TableHead>最終報酬日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRewards.map((reward) => (
              <TableRow key={reward.userId}>
                <TableCell>{reward.userName}</TableCell>
                <TableCell>{reward.userId}</TableCell>
                <TableCell>${reward.totalRewards.toLocaleString()}</TableCell>
                <TableCell>${reward.pendingRewards.toLocaleString()}</TableCell>
                <TableCell>
                  ${calculateFeeAmount(reward.pendingRewards, reward.walletType).toLocaleString()} (
                  {FEE_RATES[reward.walletType] * 100}%)
                </TableCell>
                <TableCell>{reward.lastRewardDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

