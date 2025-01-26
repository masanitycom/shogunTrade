import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface UnansweredQuiz {
  id: string
  userId: string
  userName: string
  quizWeek: number
  submissionDate: string
}

const mockUnansweredQuizzes: UnansweredQuiz[] = [
  { id: "1", userId: "user1", userName: "山田太郎", quizWeek: 1, submissionDate: "2023-05-20" },
  { id: "2", userId: "user2", userName: "佐藤花子", quizWeek: 1, submissionDate: "2023-05-21" },
  { id: "3", userId: "user3", userName: "鈴木一郎", quizWeek: 2, submissionDate: "2023-05-22" },
]

export function UnansweredQuizzes() {
  const [quizzes, setQuizzes] = useState<UnansweredQuiz[]>(mockUnansweredQuizzes)

  const handleReview = (id: string) => {
    // TODO: クイズ回答をレビューするためのモーダルを開く
    console.log(`Reviewing quiz ${id}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">未回答クイズ</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ユーザー名</TableHead>
            <TableHead>クイズ週</TableHead>
            <TableHead>提出日</TableHead>
            <TableHead>アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.userName}</TableCell>
              <TableCell>{quiz.quizWeek}</TableCell>
              <TableCell>{quiz.submissionDate}</TableCell>
              <TableCell>
                <Button onClick={() => handleReview(quiz.id)}>レビュー</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

