import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaUser, FaUsers } from "react-icons/fa"
import type { User } from "@/lib/mockDatabase"

interface OrganizationChartProps {
  data: User[]
}

const renderMember = (member: User, allUsers: User[]) => {
  if (!member) {
    console.error("Attempted to render undefined member")
    return null
  }

  return (
    <div key={member.id} className="mb-4">
      <div className="flex items-center mb-2">
        <FaUser className="mr-2" />
        <span className="font-semibold">{member.name}</span>
        <span className="ml-2 text-sm text-gray-600">({member.level})</span>
      </div>
      <div className="ml-8">
        <span className="text-sm text-gray-600">最大系列投資額: ${member.maxSeriesInvestment.toLocaleString()}</span>
      </div>
      <div className="ml-8">
        <span className="text-sm text-gray-600">他系列投資額: ${member.otherSeriesInvestment.toLocaleString()}</span>
      </div>
      {member.referrals && member.referrals.length > 0 && (
        <div className="ml-8">
          <FaUsers className="inline-block mr-2" />
          <span className="text-sm text-gray-600">紹介者: {member.referrals.length}人</span>
          {member.referrals.map((referralId) => {
            const referral = allUsers.find((u) => u.id === referralId)
            return referral ? renderMember(referral, allUsers) : null
          })}
        </div>
      )}
    </div>
  )
}

export default function OrganizationChart({ data }: OrganizationChartProps) {
  console.log("OrganizationChart data:", data)

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn("OrganizationChart received invalid or empty data")
    return (
      <Card>
        <CardHeader>
          <CardTitle>組織構造</CardTitle>
        </CardHeader>
        <CardContent>
          <p>データがありません。</p>
        </CardContent>
      </Card>
    )
  }

  const rootUser = data[0]
  if (!rootUser) {
    console.error("Root user is undefined")
    return (
      <Card>
        <CardHeader>
          <CardTitle>組織構造</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ユーザーデータの読み込みに失敗しました。</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>組織構造</CardTitle>
      </CardHeader>
      <CardContent>{renderMember(rootUser, data)}</CardContent>
    </Card>
  )
}

