"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { FaUsers, FaChartLine, FaMoneyBillWave, FaClipboardList, FaShoppingCart } from "react-icons/fa"
import Link from "next/link"

interface DashboardData {
  totalUsers: number
  activeUsers: number
  totalInvestment: number
  monthlyRevenue: number
  pendingTasks: number
  pendingNFTRequests: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const adminAuthToken = localStorage.getItem("adminAuthToken")
      const userRole = localStorage.getItem("userRole")
      console.log("Admin auth check:", { adminAuthToken, userRole })

      if (!adminAuthToken || userRole !== "admin") {
        console.log("Admin auth failed, redirecting to login")
        toast({
          title: "アクセスエラー",
          description: "管理者権限が必要です。ログインページにリダイレクトします。",
          variant: "destructive",
        })
        router.push("/login")
      } else {
        console.log("Admin auth successful")
        fetchDashboardData()
      }
    }

    checkAuth()
  }, [router])

  const fetchDashboardData = async () => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockData: DashboardData = {
      totalUsers: 1000,
      activeUsers: 750,
      totalInvestment: 5000000,
      monthlyRevenue: 250000,
      pendingTasks: 15,
      pendingNFTRequests: 3,
    }

    setDashboardData(mockData)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">管理者ダッシュボード</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総ユーザー数</CardTitle>
            <FaUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">アクティブユーザー: {dashboardData?.activeUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総投資額</CardTitle>
            <FaChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData?.totalInvestment.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月間収益</CardTitle>
            <FaMoneyBillWave className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData?.monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">保留中のタスク</CardTitle>
            <FaClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.pendingTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFT購入リクエスト</CardTitle>
            <FaShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.pendingNFTRequests}</div>
            <p className="text-xs text-muted-foreground">保留中のリクエスト</p>
            <Link href="/admin/nft-requests" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              詳細を見る
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

