"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Task {
  id: string
  week: number
  question: string
  options: string[]
  dueDate: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    week: 1,
    question: "あなたの投資目標は何ですか？",
    options: ["短期的な利益", "長期的な成長", "安定した収入", "リスク分散"],
    dueDate: "2023-06-01",
  },
  {
    id: "2",
    week: 2,
    question: "今週のNFT市場の動向についてどう思いますか？",
    options: ["非常に活発", "やや活発", "やや停滞", "非常に停滞"],
    dueDate: "2023-06-08",
  },
]

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    week: 0,
    question: "",
    options: ["", "", "", ""],
    dueDate: "",
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }])
    setNewTask({
      id: "",
      week: 0,
      question: "",
      options: ["", "", "", ""],
      dueDate: "",
    })
    toast({
      title: "タスクが追加されました",
      description: "新しいタスクが正常に追加されました。",
    })
  }

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete))
      setIsDeleteDialogOpen(false)
      setTaskToDelete(null)
      toast({
        title: "タスクが削除されました",
        description: "選択されたタスクが正常に削除されました。",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">タスク管理</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>新規タスク作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="week">週</Label>
              <Input
                id="week"
                type="number"
                value={newTask.week}
                onChange={(e) => setNewTask({ ...newTask, week: Number.parseInt(e.target.value) })}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="question">質問</Label>
              <Textarea
                id="question"
                value={newTask.question}
                onChange={(e) => setNewTask({ ...newTask, question: e.target.value })}
                placeholder="タスクの質問を入力してください"
                required
              />
            </div>
            <div>
              <Label htmlFor="options">選択肢</Label>
              {newTask.options.map((option, index) => (
                <Input
                  key={index}
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newTask.options]
                    updatedOptions[index] = e.target.value
                    setNewTask({ ...newTask, options: updatedOptions })
                  }}
                  placeholder={`選択肢 ${index + 1}`}
                  className="mt-2"
                  required
                />
              ))}
            </div>
            <div>
              <Label htmlFor="dueDate">期限</Label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
              />
            </div>
            <Button type="submit">タスクを保存</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>タスク一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>週</TableHead>
                <TableHead>質問</TableHead>
                <TableHead>選択肢</TableHead>
                <TableHead>期限</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.week}</TableCell>
                  <TableCell>{task.question}</TableCell>
                  <TableCell>{task.options.join(", ")}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>タスクを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。本当にこのタスクを削除してもよろしいですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTask}>削除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

