"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PaymentConfirmation } from "@/components/admin/PaymentConfirmation"
import { getNextMonday, formatDate } from "@/lib/utils"

interface NFTPurchaseRequest {
  id: string
  userId: string
  userName: string
  nftType: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  walletAddress: string
  approvalDate?: string
  operationStartDate?: string
}

const mockRequests: NFTPurchaseRequest[] = [
  {
    id: "1",
    userId: "user1",
    userName: "山田太郎",
    nftType: "SHOGUN NFT5000",
    requestDate: "2023-05-25",
    status: "pending",
    walletAddress: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "2",
    userId: "user2",
    userName: "佐藤花子",
    nftType: "SHOGUN NFT3000",
    requestDate: "2023-05-26",
    status: "pending",
    walletAddress: "0x0987654321098765432109876543210987654321",
  },
  {
    id: "3",
    userId: "user3",
    userName: "鈴木一郎",
    nftType: "SHOGUN NFT1000",
    requestDate: "2023-05-27",
    status: "pending",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
]

export default function NFTRequests() {
  const [requests, setRequests] = useState<NFTPurchaseRequest[]>(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<NFTPurchaseRequest | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const filteredRequests = requests.filter(
    (request) =>
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.nftType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRejectNFT = async () => {
    if (!selectedRequest || !rejectReason) return

    try {
      // TODO: Implement actual API call to reject NFT request
      setRequests(requests.map((r) => (r.id === selectedRequest.id ? { ...r, status: "rejected" } : r)))
      toast({
        title: "NFTが拒否されました",
        description: `${selectedRequest.userName}の${selectedRequest.nftType}が拒否されました。`,
      })
      setIsRejectModalOpen(false)
      setSelectedRequest(null)
      setRejectReason("")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "エラー",
        description: "NFTの拒否中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  const handlePaymentConfirmation = async (paymentData: any) => {
    if (!selectedRequest) return

    try {
      const operationStartDate = formatDate(getNextMonday(new Date(paymentData.approvalDate)))

      setRequests(
        requests.map((r) =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: "approved",
                approvalDate: paymentData.approvalDate,
                operationStartDate: operationStartDate,
              }
            : r,
        ),
      )

      toast({
        title: "支払いが確認され、NFTが承認されました",
        description: `${selectedRequest.userName}の${selectedRequest.nftType}の支払いが確認され、${operationStartDate}から運用開始予定です。`,
      })

      setIsPaymentModalOpen(false)
      setSelectedRequest(null)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "エラー",
        description: "支払いの確認と承認中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">NFT購入リクエスト</h1>
      <Card>
        <CardHeader>
          <CardTitle>リクエスト一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="ユーザー名、ID、またはNFTタイプで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>リクエスト日</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>ウォレットアドレス</TableHead>
                <TableHead>承認日</TableHead>
                <TableHead>運用開始日</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell className="font-mono text-sm">{request.walletAddress}</TableCell>
                  <TableCell>{request.approvalDate || "-"}</TableCell>
                  <TableCell>{request.operationStartDate || "-"}</TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsPaymentModalOpen(true)
                          }}
                          className="bg-primary"
                        >
                          支払い確認
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsRejectModalOpen(true)
                          }}
                          variant="destructive"
                        >
                          拒否
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NFT拒否</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rejectReason" className="text-right">
                拒否理由
              </Label>
              <Textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="col-span-3"
                placeholder="拒否理由を入力してください"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleRejectNFT} variant="destructive">
              拒否
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>支払い確認</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <PaymentConfirmation userId={selectedRequest.userId} onConfirm={handlePaymentConfirmation} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

