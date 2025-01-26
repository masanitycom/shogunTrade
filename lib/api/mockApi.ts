// 既存のインポートと関数はそのままで...

export const mockApi = {
  // 既存の関数はそのままで...

  // ユーザーマイページ用のデータを取得
  getUserDashboard: async (userId: string) => {
    // 実際のAPIでは、このデータはデータベースから取得します
    return {
      userId,
      username: "テストユーザー",
      level: 2,
      points: 1500,
      referrals: 3,
      rewards: [
        { id: 1, type: "デイリーボーナス", amount: 100 },
        { id: 2, type: "レベルアップボーナス", amount: 500 },
      ],
    }
  },

  // 管理画面用のユーザー一覧を取得
  getAdminUserList: async () => {
    // 実際のAPIでは、このデータはデータベースから取得します
    return [
      { id: "1", username: "ユーザー1", level: 3, totalPoints: 2500 },
      { id: "2", username: "ユーザー2", level: 1, totalPoints: 500 },
      { id: "3", username: "ユーザー3", level: 2, totalPoints: 1500 },
    ]
  },

  // 管理画面用の報酬履歴を取得
  getAdminRewardHistory: async () => {
    // 実際のAPIでは、このデータはデータベースから取得します
    return [
      { id: 1, userId: "1", type: "デイリーボーナス", amount: 100, date: "2023-05-01" },
      { id: 2, userId: "2", type: "レベルアップボーナス", amount: 500, date: "2023-05-02" },
      { id: 3, userId: "3", type: "紹介ボーナス", amount: 200, date: "2023-05-03" },
    ]
  },
}

