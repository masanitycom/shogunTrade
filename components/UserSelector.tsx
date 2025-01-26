import React from "react"
import type { User } from "@/lib/models/user"

interface UserSelectorProps {
  users: User[]
  onSelectUser: (userId: string) => void
}

export function UserSelector({ users, onSelectUser }: UserSelectorProps) {
  return (
    <select
      onChange={(e) => onSelectUser(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  )
}

