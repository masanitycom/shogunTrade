"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function DailyRatePage() {
  const [dailyRate, setDailyRate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 実際のAPIエンドポイントに日次利率を保存するロジックを実装
      console.log("Saving daily rate:", dailyRate)
      toast({
        title: "日次利率を保存しました",
        description: `設定された日次利率: ${dailyRate}%`,
      })
    } catch (error) {
      console.error("日次利率の保存に失敗しました:", error)
      toast({
        title: "エラー",
        description: "日次利率の保存に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">日次利率設定</h1>
      <Card>
        <CardHeader>
          <CardTitle>本日の利率を入力</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="dailyRate" className="text-sm font-medium">
                日次利率 (%)
              </label>
              <Input
                id="dailyRate"
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                step="0.01"
                min="0"
                max="100"
                required
              />
            </div>
            <Button type="submit">保存</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

