import { Suspense } from "react"
import { getUserData } from "@/lib/userData"
import DashboardContent from "./DashboardContent"

export default async function DashboardPage() {
  const userData = await getUserData("user1") // 実際の実装では、認証されたユーザーのIDを使用します

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent initialData={userData} />
    </Suspense>
  )
}

