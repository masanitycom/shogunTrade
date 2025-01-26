"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { PROFIT_DISTRIBUTION_PERCENTAGE } from "@/lib/constants"

export default function WeeklyProfitPage() {
  const [weeklyProfit, setWeeklyProfit] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const profit = Number.parseFloat(weeklyProfit)
      const distributionAmount = (profit * PROFIT_DISTRIBUTION_PERCENTAGE) / 100

      // TODO: 実際のAPIエンドポイントに週次利益を保存し、報酬を計算・分配するロジックを実装
      console.log("Saving weekly profit:", profit)
      console.log("Distribution amount:", distributionAmount)

      toast({
        title: "週次利益を保存し、報酬を計算しました",
        description: `総利益: $${profit.toFixed(2)}, 分配額: $${distributionAmount.toFixed(2)}`,
      })
    } catch (error) {
      console.error("週次利益の保存と報酬計算に失敗しました:", error)
      toast({
        title: "エラー",
        description: "処理に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">週次利益入力</h1>
      <Card>
        <CardHeader>
          <CardTitle>今週の利益を入力</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="weeklyProfit" className="text-sm font-medium">
                週次利益 ($)
              </label>
              <Input
                id="weeklyProfit"
                type="number"
                value={weeklyProfit}
                onChange={(e) => setWeeklyProfit(e.target.value)}
                step="0.01"
                min="0"
                required
              />
            </div>
            <Button type="submit">保存と報酬計算</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

