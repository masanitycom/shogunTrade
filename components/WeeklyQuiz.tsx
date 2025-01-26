"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface WeeklyQuizProps {
  weekNumber: number
  question: string
  options: string[]
  onSubmit: (answer: string) => void
  onClose: () => void
}

export function WeeklyQuiz({ weekNumber, question, options, onSubmit, onClose }: WeeklyQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAnswer) {
      onSubmit(selectedAnswer)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">エアドロップクイズ (第{weekNumber}週)</CardTitle>
          <Button variant="ghost" className="text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg font-medium text-gray-800">{question}</p>
          <form onSubmit={handleSubmit}>
            <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base text-gray-700 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              disabled={!selectedAnswer}
            >
              回答を送信
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50 text-sm text-gray-600 rounded-b-lg">
          正確に回答することで、エアドロップ（報酬）を受け取る資格が得られます。
        </CardFooter>
      </Card>
    </motion.div>
  )
}

