import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface MaintenanceAnnouncementProps {
  initialMessage: string
  initialIsActive: boolean
  onUpdate: (message: string, isActive: boolean) => void
  className?: string
}

export function MaintenanceAnnouncement({
  initialMessage,
  initialIsActive,
  onUpdate,
  className,
}: MaintenanceAnnouncementProps) {
  const [message, setMessage] = useState(initialMessage)
  const [isActive, setIsActive] = useState(initialIsActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(message, isActive)
    toast({
      title: "メンテナンス情報を更新しました",
      description: `メッセージ: ${message}, 有効: ${isActive ? "はい" : "いいえ"}`,
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>メンテナンスアナウンス</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maintenance-message">メンテナンスメッセージ</Label>
            <Input
              id="maintenance-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メンテナンスメッセージを入力してください"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenance-active" checked={isActive} onCheckedChange={setIsActive} />
            <Label htmlFor="maintenance-active">メンテナンスモードを有効にする</Label>
          </div>
          <Button type="submit">更新</Button>
        </form>
      </CardContent>
    </Card>
  )
}

