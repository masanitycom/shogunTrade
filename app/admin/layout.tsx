"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/AppSidebar"
import { toast } from "@/components/ui/use-toast"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken")
    localStorage.removeItem("userRole")
    toast({
      title: "ログアウト成功",
      description: "ログインページにリダイレクトします。",
    })
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar />
      <div className="flex-1">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-end items-center">
            <Button onClick={handleLogout}>ログアウト</Button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

