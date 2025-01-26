import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface WeeklyReward {
  weekEnding: string
  amount: number
}

interface WeeklyRewardsProps {
  rewards: WeeklyReward[]
}

export default function WeeklyRewards({ rewards }: WeeklyRewardsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>週次報酬履歴</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>週末日</TableHead>
              <TableHead>金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.map((reward, index) => (
              <TableRow key={index}>
                <TableCell>{reward.weekEnding}</TableCell>
                <TableCell>${reward.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

