import React from "react"
import type { User } from "@/lib/models/user"

interface InvestmentSummaryProps {
  user: User
  totalInvestment: number
}

export function InvestmentSummary({ user, totalInvestment }: InvestmentSummaryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">投資サマリー</h2>
      <p>レベル: {user.level}</p>
      <p>最大系列投資額: ${user.maxSeriesInvestment.toFixed(2)}</p>
      <p>他系列投資額: ${user.otherSeriesInvestment.toFixed(2)}</p>
      <p>総投資額: ${totalInvestment.toFixed(2)}</p>
    </div>
  )
}

