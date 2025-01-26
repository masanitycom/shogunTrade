import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface WeeklyTaskProps {
  isOpen: boolean
  onComplete: (answer: string) => void
  onClose: () => void
}

export default function WeeklyTask({ isOpen, onComplete, onClose }: WeeklyTaskProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAnswer) {
      onComplete(selectedAnswer)
    }
  }

  // This is a mock question. In a real application, this would be fetched from a backend.
  const question = "今週のNFT市場の動向についてどう思いますか？"
  const options = ["非常に活発", "やや活発", "やや停滞", "非常に停滞"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>週次タスク</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <p className="mb-4">{question}</p>
          <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={!selectedAnswer}>
              回答を送信
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

