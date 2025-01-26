import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "./auth"

export async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Authentication required" })
  }

  const userId = await verifyToken(token)
  if (!userId) {
    return res.status(401).json({ message: "Invalid token" })
  }

  req.userId = userId
  next()
}

