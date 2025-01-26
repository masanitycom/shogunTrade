import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download } from "lucide-react"
import { FEE_RATES } from "@/lib/constants"

interface RewardRequest {
  id: string
  userId: string
  userName: string
  amount: number
  requestDate: string
  status: "pending" | "sent" | "rejected"
  usdtAddress: string
  walletType: "evo" | "other"
}

const mockRewardRequests: RewardRequest[] = [
  {
    id: "1",
    userId: "user1",
    userName: "山田太郎",
    amount: 1000,
    requestDate: "2023-05-25",
    status: "pending",
    usdtAddress: "0x1234567890123456789012345678901234567890",
    walletType: "evo",
  },
  {
    id: "2",
    userId: "user2",
    userName: "佐藤花子",
    amount: 1500,
    requestDate: "2023-05-24",
    status: "pending",
    usdtAddress: "0x0987654321098765432109876543210987654321",
    walletType: "other",
  },
  {
    id: "3",
    userId: "user3",
    userName: "鈴木一郎",
    amount: 2000,
    requestDate: "2023-05-23",
    status: "sent",
    usdtAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    walletType: "evo",
  },
  {
    id: "4",
    userId: "user4",
    userName: "田中次郎",
    amount: 500,
    requestDate: "2023-05-22",
    status: "rejected",
    usdtAddress: "0x123abc456def789ghi012jkl345mno678pqr90",
    walletType: "other",
  },
]

const FEE_RATES = {
  evo: 0.01, // 1% fee for EVO Card
  other: 0.03, // 3% fee for other wallets
}

export function RewardRequests() {
  const [requests, setRequests] = useState<RewardRequest[]>(mockRewardRequests)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSend = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "sent" as const } : req)))
    toast({
      title: "送金処理完了",
      description: "ユーザーへの送金が完了しました。",
    })
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "rejected" as const } : req)))
    toast({
      title: "送金拒否",
      description: "ユーザーへの送金を拒否しました。",
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "コピー完了",
        description: "USDTアドレスをクリップボードにコピーしました。",
      })
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast({
        title: "コピー失敗",
        description: "USDTアドレスのコピーに失敗しました。",
        variant: "destructive",
      })
    }
  }

  const calculateAmountAfterFee = (amount: number, walletType: "evo" | "other") => {
    const feeRate = FEE_RATES[walletType]
    const fee = amount * feeRate
    return amount - fee
  }

  const filteredRequests = requests.filter(
    (req) =>
      req.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const exportCSV = () => {
    const headers = [
      "ID",
      "ユーザーID",
      "ユーザー名",
      "申請額",
      "手数料適用後の金額",
      "申請日",
      "ステータス",
      "USDTアドレス",
      "ウォレットタイプ",
    ]
    const csvContent =
      headers.join(",") +
      "\n" +
      filteredRequests
        .map((req) =>
          [
            req.id,
            req.userId,
            req.userName,
            req.amount,
            calculateAmountAfterFee(req.amount, req.walletType),
            req.requestDate,
            req.status,
            req.usdtAddress,
            req.walletType,
          ].join(","),
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "reward_requests.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-6">報酬申請</h2>
      <div className="flex justify-between items-center mb-4">
        <Input
          className="max-w-sm"
          placeholder="ユーザー名またはIDで検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={exportCSV} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          CSVエクスポート
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ユーザー</TableHead>
              <TableHead>申請額</TableHead>
              <TableHead>手数料後</TableHead>
              <TableHead>申請日</TableHead>
              <TableHead>状態</TableHead>
              <TableHead>USDTアドレス</TableHead>
              <TableHead>ウォレット</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.userName}</TableCell>
                <TableCell>${request.amount.toLocaleString()}</TableCell>
                <TableCell>${calculateAmountAfterFee(request.amount, request.walletType).toLocaleString()}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "sent" ? "success" : request.status === "rejected" ? "destructive" : "default"
                    }
                  >
                    {request.status === "sent" ? "送金済" : request.status === "rejected" ? "拒否" : "保留中"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="truncate max-w-[150px]">{request.usdtAddress}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => copyToClipboard(request.usdtAddress)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{request.walletType === "evo" ? "EVO" : "その他"}</TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSend(request.id)} size="sm">
                        送金済
                      </Button>
                      <Button onClick={() => handleReject(request.id)} variant="destructive" size="sm">
                        拒否
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

