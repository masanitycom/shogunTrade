"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaSearch, FaUser, FaUsers } from "react-icons/fa"
import { mockUsers, type User } from "@/lib/mockDatabase"

const renderMember = (member: User) => (
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
    {member.referrals.length > 0 && (
      <div className="ml-8">
        <FaUsers className="inline-block mr-2" />
        <span className="text-sm text-gray-600">紹介者: {member.referrals.length}人</span>
        {member.referrals.map((referralId) => {
          const referral = mockUsers.find((m) => m.id === referralId)
          return referral && renderMember(referral)
        })}
      </div>
    )}
  </div>
)

export default function OrganizationChart() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">組織図</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>メンバー検索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="名前で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button variant="outline">
              <FaSearch className="mr-2" />
              検索
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>組織構造</CardTitle>
        </CardHeader>
        <CardContent>{filteredUsers.map((member) => member.level === "代官" && renderMember(member))}</CardContent>
      </Card>
    </div>
  )
}

