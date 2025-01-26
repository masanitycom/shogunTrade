import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"

interface PaymentConfirmationProps {
  userId: string
  onConfirm: (data: PaymentData) => void
}

interface PaymentData {
  amount: number
  currency: "JPY" | "USDT"
  transactionId?: string
  approvalDate: string
}

export function PaymentConfirmation({ userId, onConfirm }: PaymentConfirmationProps) {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<"JPY" | "USDT">("JPY")
  const [transactionId, setTransactionId] = useState("")
  const [approvalDate, setApprovalDate] = useState(formatDate(new Date()))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const paymentData: PaymentData = {
      amount: Number.parseFloat(amount),
      currency,
      transactionId: currency === "USDT" ? transactionId : undefined,
      approvalDate,
    }
    onConfirm(paymentData)
    toast({
      title: "支払い確認完了",
      description: `${currency === "JPY" ? "¥" : "$"}${amount} の支払いを確認しました。承認日: ${approvalDate}`,
    })
    // フォームをリセット
    setAmount("")
    setCurrency("JPY")
    setTransactionId("")
    setApprovalDate(formatDate(new Date()))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>支払い確認</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">入金額</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="入金額を入力"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">通貨</Label>
            <Select value={currency} onValueChange={(value: "JPY" | "USDT") => setCurrency(value)}>
              <SelectTrigger>
                <SelectValue placeholder="通貨を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JPY">日本円 (JPY)</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {currency === "USDT" && (
            <div className="space-y-2">
              <Label htmlFor="transactionId">トランザクションID</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="トランザクションIDを入力"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="approvalDate">承認日</Label>
            <Input
              id="approvalDate"
              type="date"
              value={approvalDate}
              onChange={(e) => setApprovalDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">支払い確認</Button>
        </form>
      </CardContent>
    </Card>
  )
}

