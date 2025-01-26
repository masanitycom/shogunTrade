"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface UnansweredTask {
  id: string
  userId: string
  userName: string
  submissionDate: string
  submissionContent: string
}

const mockUnansweredTasks: UnansweredTask[] = [
  {
    id: "1",
    userId: "user1",
    userName: "山田太郎",
    submissionDate: "2023-05-20",
    submissionContent: "タスク1の回答内容",
  },
  {
    id: "2",
    userId: "user2",
    userName: "佐藤花子",
    submissionDate: "2023-05-21",
    submissionContent: "タスク2の回答内容",
  },
  {
    id: "3",
    userId: "user3",
    userName: "鈴木一郎",
    submissionDate: "2023-05-22",
    submissionContent: "タスク3の回答内容",
  },
  {
    id: "4",
    userId: "user4",
    userName: "田中次郎",
    submissionDate: "2023-05-23",
    submissionContent: "タスク4の回答内容",
  },
  {
    id: "5",
    userId: "user5",
    userName: "高橋三郎",
    submissionDate: "2023-05-24",
    submissionContent: "タスク5の回答内容",
  },
]

export default function UnansweredTasks() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<UnansweredTask[]>(mockUnansweredTasks)
  const [searchTerm, setSearchTerm] = useState("")
  // 削除: const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  // 削除: const [currentTask, setCurrentTask] = useState<UnansweredTask | null>(null)
  // 削除: const [reviewComment, setReviewComment] = useState("")

  const filteredTasks = tasks.filter(
    (task) =>
      task.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 削除: const handleReview = (task: UnansweredTask) => {
  // 削除:   setCurrentTask(task)
  // 削除:   setIsReviewModalOpen(true)
  // 削除: }

  const handleComplete = (task: UnansweredTask) => {
    // TODO: Implement API call to mark the task as completed
    console.log(`Marking task ${task.id} as completed`)
    // Remove the completed task from the list
    setTasks(tasks.filter((t) => t.id !== task.id))
    toast({
      title: "タスク完了",
      description: `${task.userName}のタスクを完了としてマークしました。`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">未回答タスク</h1>
      <Card>
        <CardHeader>
          <CardTitle>タスク一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="ユーザー名またはIDで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ユーザー名</TableHead>
                <TableHead>ユーザーID</TableHead>
                <TableHead>提出日</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.userName}</TableCell>
                  <TableCell>{task.userId}</TableCell>
                  <TableCell>{task.submissionDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleComplete(task)}>完了</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* 削除: <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        削除:   <DialogContent>
        削除:     <DialogHeader>
        削除:       <DialogTitle>タスクレビュー</DialogTitle>
        削除:     </DialogHeader>
        削除:     <div className="grid gap-4 py-4">
        削除:       <div className="grid grid-cols-4 items-center gap-4">
        削除:         <Label htmlFor="user-name" className="text-right">
        削除:           ユーザー名
        削除:         </Label>
        削除:         <div id="user-name" className="col-span-3">
        削除:           {currentTask?.userName}
        削除:         </div>
        削除:       </div>
        削除:       <div className="grid grid-cols-4 items-center gap-4">
        削除:         <Label htmlFor="task-week" className="text-right">
        削除:           タスク週
        削除:         </Label>
        削除:         <div id="task-week" className="col-span-3">
        削除:           {currentTask?.taskWeek}
        削除:         </div>
        削除:       </div>
        削除:       <div className="grid grid-cols-4 items-center gap-4">
        削除:         <Label htmlFor="review-comment" className="text-right">
        削除:           レビューコメント
        削除:         </Label>
        削除:         <Textarea
        削除:           id="review-comment"
        削除:           className="col-span-3"
        削除:           value={reviewComment}
        削除:           onChange={(e) => setReviewComment(e.target.value)}
        削除:         />
        削除:       </div>
        削除:     </div>
        削除:     <DialogFooter>
        削除:       <Button onClick={handleReviewSubmit}>レビュー完了</Button>
        削除:     </DialogFooter>
        削除:   </DialogContent>
        削除: </Dialog> */}
    </div>
  )
}

