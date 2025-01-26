import type { User } from "./models/user"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "user1@example.com",
    name: "山田太郎",
    level: "足軽",
    investment: 800,
  },
  {
    id: "2",
    email: "user2@example.com",
    name: "鈴木花子",
    level: "武将",
    investment: 1000,
  },
]

console.log("mockUsers.ts: mockUsers loaded:", mockUsers)

