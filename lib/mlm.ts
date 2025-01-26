import { User } from './models/user';
import { NFT, defaultNFTs } from './models/nft';

export function calculateTotalRewards(user: User): number {
  return user.nfts.reduce((total, userNft) => {
    const nft = defaultNFTs.find(n => n.id === userNft.nftId);
    if (nft) {
      return total + userNft.totalRewards;
    }
    return total;
  }, 0);
}

export function getTotalTeamInvestment(user: User): number {
  // This is a placeholder implementation. In a real system, you would
  // recursively calculate the total investment of the user's team.
  return user.investment + user.additionalInvestment;
}

export function calculateDailyRewards(user: User): number {
  return user.nfts.reduce((total, userNft) => {
    const nft = defaultNFTs.find(n => n.id === userNft.nftId);
    if (nft) {
      return total + (nft.price * nft.dailyRate);
    }
    return total;
  }, 0);
}

export function updateUserRewards(user: User): User {
  const updatedNfts = user.nfts.map(userNft => {
    const nft = defaultNFTs.find(n => n.id === userNft.nftId);
    if (nft) {
      const dailyReward = nft.price * nft.dailyRate;
      return {
        ...userNft,
        totalRewards: userNft.totalRewards + dailyReward
      };
    }
    return userNft;
  });

  return {
    ...user,
    nfts: updatedNfts
  };
}

export function checkRewardLimit(user: User): boolean {
  const totalInvestment = user.investment + user.additionalInvestment;
  const totalRewards = user.nfts.reduce((total, nft) => total + nft.totalRewards, 0);
  return totalRewards < totalInvestment * 3;
}

