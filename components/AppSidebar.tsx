"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaSitemap,
  FaTasks,
  FaCog,
  FaPercent,
  FaUserPlus,
  FaClipboardCheck,
  FaClipboardList,
  FaImage,
} from "react-icons/fa"

const menuItems = [
  { href: "/admin/dashboard", icon: FaTachometerAlt, label: "ダッシュボード" },
  { href: "/admin/users", icon: FaUsers, label: "ユーザー管理" },
  { href: "/admin/users/new", icon: FaUserPlus, label: "新規ユーザー登録" },
  { href: "/admin/rewards", icon: FaChartLine, label: "報酬計算" },
  { href: "/admin/organization", icon: FaSitemap, label: "組織図" },
  { href: "/admin/tasks", icon: FaTasks, label: "タスク管理" },
  { href: "/admin/unanswered-tasks", icon: FaClipboardCheck, label: "未回答タスク" },
  { href: "/admin/nft-management", icon: FaImage, label: "NFT管理" },
  { href: "/admin/nft-settings", icon: FaImage, label: "NFT設定" },
  { href: "/admin/settings", icon: FaCog, label: "システム設定" },
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const NavContent = () => (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* モバイル用ハンバーガーメニュー */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="px-2 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 px-4">管理パネル</h2>
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* デスクトップ用サイドバー */}
      <div className="hidden lg:flex w-72 bg-white shadow-md flex-col fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">管理パネル</h2>
        </div>
        <div className="px-4 flex-1 overflow-y-auto">
          <NavContent />
        </div>
      </div>
      {/* スペーサー */}
      <div className="hidden lg:block w-72" />
    </>
  )
}

