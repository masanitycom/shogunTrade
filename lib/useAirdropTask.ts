import { useState, useEffect } from "react"
import { isWeekend, getNextMonday, calculateCompoundInterest } from "./dateUtils"

export function useAirdropTask(initialAirdropReward: number) {
  const [airdropReward, setAirdropReward] = useState(initialAirdropReward)
  const [isTaskCompleted, setIsTaskCompleted] = useState(false)
  const [lastCompoundDate, setLastCompoundDate] = useState<Date | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date()
      if (!isTaskCompleted && lastCompoundDate) {
        const daysSinceLastCompound = Math.floor((today.getTime() - lastCompoundDate.getTime()) / (1000 * 60 * 60 * 24))
        if (daysSinceLastCompound > 0) {
          setAirdropReward((prev) => calculateCompoundInterest(prev, 0.01, daysSinceLastCompound)) // 1% daily compound interest
          setLastCompoundDate(today)
        }
      }
    }, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [isTaskCompleted, lastCompoundDate])

  const canAnswerTask = isWeekend()

  const handleTaskCompletion = () => {
    if (canAnswerTask) {
      setIsTaskCompleted(true)
      setLastCompoundDate(null)
    }
  }

  const claimAirdrop = () => {
    if (isTaskCompleted) {
      // Here you would typically call an API to process the airdrop claim
      console.log(`Claiming airdrop reward: ${airdropReward}`)
      setAirdropReward(0)
      setIsTaskCompleted(false)
    }
  }

  const resetTaskForNextWeek = () => {
    const today = new Date()
    const nextMonday = getNextMonday(today)
    if (today >= nextMonday) {
      setIsTaskCompleted(false)
      if (!lastCompoundDate) {
        setLastCompoundDate(today)
      }
    }
  }

  useEffect(() => {
    resetTaskForNextWeek()
    const timer = setInterval(resetTaskForNextWeek, 60000) // Check every minute
    return () => clearInterval(timer)
  }, [])

  return {
    airdropReward,
    isTaskCompleted,
    canAnswerTask,
    handleTaskCompletion,
    claimAirdrop,
  }
}

