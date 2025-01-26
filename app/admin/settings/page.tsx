"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { PROFIT_DISTRIBUTION_PERCENTAGE } from "@/lib/constants"

export default function SystemSettings() {
  const { toast } = useToast()
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [evoFeeRate, setEvoFeeRate] = React.useState(5.5)
  const [otherFeeRate, setOtherFeeRate] = React.useState(8)
  const [nftPurchaseMessage, setNftPurchaseMessage] = useState(
    "上記アドレスに選択したNFTの金額を送金してください。送金が確認されると、NFTが発行されます。",
  )
  const [profitDistributionPercentage, setProfitDistributionPercentage] = useState(PROFIT_DISTRIBUTION_PERCENTAGE)

  const handleSave = () => {
    try {
      // API呼び出しをシミュレート
      console.log("Saving settings:", {
        maintenanceMode,
        evoFeeRate,
        otherFeeRate,
        nftPurchaseMessage,
      })
      // 利益分配率の保存
      // TODO: 実際のAPIエンドポイントに保存するロジックを実装
      console.log("Saving profit distribution percentage:", profitDistributionPercentage)

      toast({
        title: "設定を保存しました",
        description: `メンテナンスモード: ${maintenanceMode ? "有効" : "無効"}, EVOカード手数料: ${evoFeeRate}%, その他ウォレット手数料: ${otherFeeRate}%, NFT購入メッセージを更新しました。 利益分配率: ${profitDistributionPercentage}%`,
      })
    } catch (error) {
      console.error("設定の保存に失敗しました:", error)
      toast({
        title: "エラー",
        description: "設定の保存に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">システム設定</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>メンテナンスモード</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch checked={maintenanceMode} onCheckedChange={(checked) => setMaintenanceMode(checked)} />
              <Label>メンテナンスモードを有効にする</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>手数料設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="evoFee">EVOカード手数料 (%)</Label>
              <Input
                id="evoFee"
                type="number"
                value={evoFeeRate}
                onChange={(e) => setEvoFeeRate(Number(e.target.value))}
                min={0}
                max={100}
                step={0.1}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="otherFee">その他ウォレット手数料 (%)</Label>
              <Input
                id="otherFee"
                type="number"
                value={otherFeeRate}
                onChange={(e) => setOtherFeeRate(Number(e.target.value))}
                min={0}
                max={100}
                step={0.1}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NFT購入メッセージ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="nftPurchaseMessage">購入時のメッセージ</Label>
              <Textarea
                id="nftPurchaseMessage"
                value={nftPurchaseMessage}
                onChange={(e) => setNftPurchaseMessage(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>報酬設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="profitDistribution">利益分配率 (%)</Label>
                <Input
                  id="profitDistribution"
                  type="number"
                  value={profitDistributionPercentage}
                  onChange={(e) => setProfitDistributionPercentage(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>システム情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>バージョン</Label>
              <p className="text-sm text-gray-600">1.0.0</p>
            </div>
            <div className="grid gap-2">
              <Label>最終更新日</Label>
              <p className="text-sm text-gray-600">2024年1月21日</p>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">
          設定を保存
        </Button>
      </div>
    </div>
  )
}

