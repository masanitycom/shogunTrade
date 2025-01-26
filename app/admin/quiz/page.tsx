"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface QuizQuestion {
  id: string
  week: number
  question: string
  options: string[]
  correctAnswer: number
}

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: "1",
    week: 1,
    question: "ビットコインの作者は誰ですか？",
    options: ["サトシ・ナカモト", "ヴィタリック・ブテリン", "チャーリー・リー", "ニック・サボ"],
    correctAnswer: 0,
  },
  {
    id: "2",
    week: 2,
    question: "イーサリアムのメインネットの名前は何ですか？",
    options: ["Mainnet", "Ethereum", "Homestead", "Frontier"],
    correctAnswer: 2,
  },
]

export default function QuizManagement() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(mockQuizQuestions)
  const [newQuestion, setNewQuestion] = useState<QuizQuestion>({
    id: "",
    week: 0,
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuizQuestions([...quizQuestions, { ...newQuestion, id: Date.now().toString() }])
    setNewQuestion({
      id: "",
      week: 0,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = value
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">クイズ管理</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>新規クイズ作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="week">週</Label>
              <Input
                id="week"
                type="number"
                value={newQuestion.week}
                onChange={(e) => setNewQuestion({ ...newQuestion, week: Number.parseInt(e.target.value) })}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="question">質問</Label>
              <Textarea
                id="question"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                placeholder="クイズの質問を入力してください"
                required
              />
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <Label htmlFor={`option-${index}`}>選択肢 {index + 1}</Label>
                <Input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`選択肢 ${index + 1} を入力してください`}
                  required
                />
              </div>
            ))}
            <div>
              <Label htmlFor="correctAnswer">正解の選択肢</Label>
              <Input
                id="correctAnswer"
                type="number"
                value={newQuestion.correctAnswer + 1}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: Number.parseInt(e.target.value) - 1 })}
                min={1}
                max={4}
                required
              />
            </div>
            <Button type="submit">クイズを保存</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>クイズ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>週</TableHead>
                <TableHead>質問</TableHead>
                <TableHead>選択肢</TableHead>
                <TableHead>正解</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizQuestions.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.week}</TableCell>
                  <TableCell>{quiz.question}</TableCell>
                  <TableCell>{quiz.options.join(", ")}</TableCell>
                  <TableCell>{quiz.options[quiz.correctAnswer]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

