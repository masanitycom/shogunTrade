import { useState, useEffect } from "react"

interface Settings {
  maintenanceMode: boolean
  evoFeeRate: number
  otherFeeRate: number
  nftPurchaseMessage: string
}

const defaultSettings: Settings = {
  maintenanceMode: false,
  evoFeeRate: 5.5,
  otherFeeRate: 8,
  nftPurchaseMessage: "上記アドレスに選択したNFTの金額を送金してください。送金が確認されると、NFTが発行されます。",
}

let globalSettings: Settings = { ...defaultSettings }

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(globalSettings)

  useEffect(() => {
    // Fetch settings from API or local storage
    // For now, we'll use the default settings
    setSettings(globalSettings)
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    globalSettings = { ...globalSettings, ...newSettings }
    setSettings(globalSettings)
    // TODO: Implement API call to save settings
  }

  return {
    ...settings,
    updateSettings,
  }
}

