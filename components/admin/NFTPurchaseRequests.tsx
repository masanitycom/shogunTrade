import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NFTPurchaseRequest {
  id: string
  userId: string
  userName: string
  nftType: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
}

interface NFTPurchaseRequestsProps {
  className?: string
}

const mockRequests: NFTPurchaseRequest[] = [
  {
    id: "1",
    userId: "user1",
    userName: "山田太郎",
    nftType: "SHOGUN NFT1000",
    requestDate: "2023-05-20",
    status: "pending",
  },
  {
    id: "2",
    userId: "user2",
    userName: "佐藤花子",
    nftType: "SHOGUN NFT500",
    requestDate: "2023-05-21",
    status: "pending",
  },
  {
    id: "3",
    userId: "user3",
    userName: "鈴木一郎",
    nftType: "SHOGUN NFT3000",
    requestDate: "2023-05-22",
    status: "pending",
  },
  {
    id: "4",
    userId: "user4",
    userName: "田中次郎",
    nftType: "SHOGUN NFT1000",
    requestDate: "2023-05-23",
    status: "pending",
  },
  {
    id: "5",
    userId: "user5",
    userName: "高橋三郎",
    nftType: "SHOGUN NFT5000",
    requestDate: "2023-05-24",
    status: "pending",
  },
]

export function NFTPurchaseRequests({ className }: NFTPurchaseRequestsProps) {
  const [requests, setRequests] = useState<NFTPurchaseRequest[]>(mockRequests)
  const [approvalDate, setApprovalDate] = useState("")
  const [selectedRequestId, setSelectedRequestId] = useState("")
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false)

  const handleApprove = async (id: string) => {
    if (!approvalDate) {
      toast({
        title: "エラー",
        description: "承認日を入力してください。",
        variant: "destructive",
      })
      return
    }
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "approved" as const } : req)))
    // TODO: バックエンドAPIを呼び出して承認を処理
    console.log(`Approving request ${id} with date ${approvalDate}`)
    toast({
      title: "リクエストが承認されました",
      description: `承認日: ${approvalDate}`,
    })
    setApprovalDate("")
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "rejected" as const } : req)))
    // TODO: バックエンドAPIを呼び出して拒否を処理
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>NFT購入リクエスト</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ユーザー名</TableHead>
              <TableHead>NFTタイプ</TableHead>
              <TableHead>リクエスト日</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.userName}</TableCell>
                <TableCell>{request.nftType}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          setSelectedRequestId(request.id)
                          setIsApprovalModalOpen(true)
                        }}
                      >
                        承認
                      </Button>
                      <Button onClick={() => handleReject(request.id)} variant="destructive">
                        拒否
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NFT購入リクエストの承認</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="approvalDate" className="text-right">
                承認日
              </Label>
              <Input
                id="approvalDate"
                type="date"
                value={approvalDate}
                onChange={(e) => setApprovalDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handleApprove(selectedRequestId)
                setIsApprovalModalOpen(false)
              }}
            >
              承認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

