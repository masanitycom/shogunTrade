"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface ReferralLinkModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export default function ReferralLinkModal({ isOpen, onClose, userId }: ReferralLinkModalProps) {
  const [copied, setCopied] = useState(false)
  const [referralLink, setReferralLink] = useState("")

  useEffect(() => {
    if (userId) {
      setReferralLink(`${window.location.origin}/register?ref=${userId}`)
    }
  }, [userId])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>友達を招待</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">以下の紹介リンクを友達と共有してください：</p>
          {referralLink ? (
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 bg-gray-100 rounded">{referralLink}</code>
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ) : (
            <p className="text-yellow-600">ユーザー情報を読み込み中です。しばらくお待ちください。</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

