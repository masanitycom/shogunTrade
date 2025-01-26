"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getUserData } from "@/lib/userData"

const UserContext = createContext<{ user: any | null }>({ user: null })

export function RealtimeUserData({ children, initialData }) {
  const [user, setUser] = useState(initialData)

  useEffect(() => {
    // WebSocketまたはServer-Sent Eventsを使用してリアルタイム更新を実装
    const eventSource = new EventSource(`/api/user-updates/${user.id}`)

    eventSource.onmessage = (event) => {
      const updatedUser = JSON.parse(event.data)
      setUser(updatedUser)
    }

    return () => {
      eventSource.close()
    }
  }, [user.id])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}

