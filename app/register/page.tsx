"use client"

import { useSearchParams } from "next/navigation"
import UserRegistration from "@/components/UserRegistration"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const referrerId = searchParams.get("ref") || ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UserRegistration referrerId={referrerId} />
    </div>
  )
}

