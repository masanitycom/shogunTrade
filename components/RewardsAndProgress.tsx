import React from "react"

interface RewardsAndProgressProps {
  currentLevel: string
  nextLevel: string
  progressToNextLevel: number
  totalRewards: number
}

export function RewardsAndProgress({
  currentLevel,
  nextLevel,
  progressToNextLevel,
  totalRewards,
}: RewardsAndProgressProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">報酬と進捗</h2>
      <p>現在のレベル: {currentLevel}</p>
      <p>次のレベル: {nextLevel}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressToNextLevel}%` }}></div>
      </div>
      <p>総報酬: {totalRewards}円</p>
    </div>
  )
}

