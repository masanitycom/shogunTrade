import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DailyReward {
  date: string
  amount: number
}

interface DailyRewardsProps {
  rewards: DailyReward[]
}

export default function DailyRewards({ rewards }: DailyRewardsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>日次報酬履歴</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日付</TableHead>
              <TableHead>金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.map((reward, index) => (
              <TableRow key={index}>
                <TableCell>{reward.date}</TableCell>
                <TableCell>${reward.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

