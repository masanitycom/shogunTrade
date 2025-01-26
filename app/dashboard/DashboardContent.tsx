"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FaUser,
  FaChartLine,
  FaUsers,
  FaCoins,
  FaChartBar,
  FaSignOutAlt,
  FaGift,
  FaLink,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
} from "react-icons/fa"
import { toast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import NFTCollection from "@/components/NFTCollection"
import DailyRewards from "@/components/DailyRewards"
import WeeklyRewards from "@/components/WeeklyRewards"
import OrganizationChart from "@/components/OrganizationChart"
import UserProfileEdit from "@/components/UserProfileEdit"
import WeeklyTask from "@/components/WeeklyTask"
import NFTPurchaseModal from "@/components/NFTPurchaseModal"
import { getUserLevel, getLevelRewardRate } from "@/lib/userLevels"

export default function DashboardContent({ initialData }) {
  const router = useRouter()
  const [user, setUser] = useState(initialData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isWeeklyTaskOpen, setIsWeeklyTaskOpen] = useState(false)
  const [isTaskCompleted, setIsTaskCompleted] = useState(false)
  const [isNFTPurchaseModalOpen, setIsNFTPurchaseModalOpen] = useState(false)

  useEffect(() => {
    // リアルタイム更新のためのWebSocket接続をここに実装
  }, [])

  const handleLogout = () => {
    // ログアウト処理
    router.push("/login")
  }

  const handleAirdropClaim = () => {
    if (isTaskCompleted) {
      setUser((prevUser) => ({
        ...prevUser,
        totalRewards: prevUser.totalRewards + prevUser.airdropReward,
        airdropReward: 0,
      }))
      setIsTaskCompleted(false)
      toast({
        title: "エアドロップ報酬を受け取りました",
        description: `${user.airdropReward}USDTが追加されました。`,
      })
    } else {
      setIsWeeklyTaskOpen(true)
    }
  }

  const handleWeeklyTaskComplete = (answer: string) => {
    setIsWeeklyTaskOpen(false)
    setIsTaskCompleted(true)
    toast({
      title: "週次タスクが完了しました",
      description: "エアドロップ報酬を受け取ることができます。",
    })
  }

  const copyReferralLink = () => {
    const referralLink = `https://example.com/register?ref=${user.id}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "紹介リンクをコピーしました",
      description: "友達に共有してください。",
    })
  }

  const handleSaveUserProfile = async (updatedUser: { name: string; email: string; usdtAddress: string }) => {
    try {
      // API呼び出しをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({ ...user, ...updatedUser })
      toast({
        title: "プロフィールを更新しました",
        description: "ユーザー情報が正常に更新されました。",
      })
    } catch (error) {
      console.error("Error updating user profile:", error)
      toast({
        title: "エラー",
        description: "プロフィールの更新中にエラーが発生しました。",
        variant: "destructive",
      })
    }
  }

  const onPurchaseConfirm = (nftType: string) => {
    console.log(`Purchasing NFT: ${nftType}`)
    toast({
      title: "NFT購入リクエスト送信",
      description: `${nftType}の購入リクエストが送信されました。`,
    })
    setIsNFTPurchaseModalOpen(false)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">マイページ</h1>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              ログアウト
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaUser className="mr-2" />
                    ユーザー情報
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditModalOpen(true)}>
                    <FaEdit />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">ユーザーID: {user.id}</p>
                <p className="text-lg mt-2">現在のレベル: {user.level}</p>
                <p className="text-sm text-gray-600">レベル報酬率: {(user.levelRewardRate * 100).toFixed(2)}%</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">USDT (BEP20) アドレス:</p>
                  <p className="text-xs text-gray-600 break-all">{user.usdtAddress}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaChartLine className="mr-2" />
                  投資状況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${user.investment.toLocaleString()}</p>
                <p className="text-sm text-gray-600">総投資額</p>
                <p className="mt-2">最大系列投資額: ${user.maxSeriesInvestment.toLocaleString()}</p>
                <p>他系列投資額: ${user.otherSeriesInvestment.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaUsers className="mr-2" />
                  紹介者数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user.referrals.length}</p>
                <p className="text-sm text-gray-600">直接の紹介者</p>
                <Button onClick={copyReferralLink} className="mt-4">
                  <FaLink className="mr-2" />
                  紹介リンクをコピー
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaCoins className="mr-2" />
                  本日の報酬
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${user.dailyRewards.toLocaleString()}</p>
                <p className="text-sm text-gray-600">今日の獲得報酬</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaChartBar className="mr-2" />
                  総報酬
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${user.totalRewards.toLocaleString()}</p>
                <p className="text-sm text-gray-600">これまでの総獲得報酬</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaGift className="mr-2" />
                  エアドロップ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${user.airdropReward.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mb-2">受け取り可能な報酬</p>
                <div className="flex items-center mb-2">
                  {isTaskCompleted ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  <p className="text-sm">{isTaskCompleted ? "週次タスク完了" : "週次タスク未完了"}</p>
                </div>
                <Button onClick={handleAirdropClaim} disabled={user.airdropReward === 0}>
                  {isTaskCompleted ? "報酬を受け取る" : "タスクに回答する"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DailyRewards rewards={user.recentRewards} />
            <WeeklyRewards rewards={user.weeklyRewards} />
          </div>

          <div className="space-y-8">
            <NFTCollection ownedNFTs={user.nfts} onPurchase={() => setIsNFTPurchaseModalOpen(true)} />
            <OrganizationChart data={[user]} />
          </div>

          <UserProfileEdit
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={user}
            onSave={handleSaveUserProfile}
          />

          <WeeklyTask
            isOpen={isWeeklyTaskOpen}
            onComplete={handleWeeklyTaskComplete}
            onClose={() => setIsWeeklyTaskOpen(false)}
          />

          <NFTPurchaseModal
            isOpen={isNFTPurchaseModalOpen}
            onClose={() => setIsNFTPurchaseModalOpen(false)}
            onPurchase={onPurchaseConfirm}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

