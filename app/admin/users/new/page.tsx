"use client"

import React from "react"
import UserRegistration from "@/components/UserRegistration"

export default function AdminNewUser() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">新規ユーザー登録（管理者）</h1>
      <p className="mb-8 text-gray-600">
        管理者として新規ユーザーを登録します。紹介者IDを入力する場合は、既存のユーザーIDであることを確認してください。
      </p>
      <UserRegistration isAdminRegistration={true} />
    </div>
  )
}

