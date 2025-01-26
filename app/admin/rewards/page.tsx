"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardRequests } from "@/components/admin/RewardRequests"
import { UserRewards } from "@/components/admin/UserRewards"
import { Card, CardContent } from "@/components/ui/card"

export default function RewardsManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">報酬管理</h1>
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">報酬申請</TabsTrigger>
          <TabsTrigger value="userRewards">ユーザー報酬情報</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          <Card>
            <CardContent>
              <RewardRequests />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="userRewards">
          <Card>
            <CardContent>
              <UserRewards />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

