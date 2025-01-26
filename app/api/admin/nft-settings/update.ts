import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { adminAuthMiddleware, logAdminAction } from "../../../../lib/adminAuth"
import { getSocketIO } from "../../../../lib/socket"
import { logger } from "../../../../lib/logger"

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { nftSettings } = req.body

    // Update NFT settings in the database
    await prisma.nftSettings.updateMany({
      data: nftSettings,
    })

    // Log the admin action
    await logAdminAction(req.adminId, "update_nft_settings", nftSettings)

    // Emit real-time update to connected clients
    const io = getSocketIO(res)
    io.emit("nft_settings_updated", nftSettings)

    logger.info("NFT settings updated successfully")
    res.status(200).json({ message: "NFT settings updated successfully" })
  } catch (error) {
    logger.error("Failed to update NFT settings", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export default adminAuthMiddleware(handler)

