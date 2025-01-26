import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "./auth"
import { logger } from "./logger"

const prisma = new PrismaClient()

export async function adminAuthMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Admin authentication required" })
  }

  const userId = await verifyToken(token)
  if (!userId) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  })

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" })
  }

  req.adminId = userId
  next()
}

export async function logAdminAction(adminId: string, action: string, details: any) {
  try {
    await prisma.adminActionLog.create({
      data: {
        adminId,
        action,
        details: JSON.stringify(details),
      },
    })
    logger.info(`Admin action logged: ${action}`, { adminId, details })
  } catch (error) {
    logger.error("Failed to log admin action", error)
  }
}

