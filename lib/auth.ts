import type { User } from "./models/user"
import { logger } from "./logger"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    return user
  } catch (error) {
    logger.error("Error in getCurrentUser:", error)
    throw new Error("Failed to fetch user data")
  }
}

export async function login(email: string, password: string): Promise<{ user: User; token: string } | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })
    return { user, token }
  } catch (error) {
    logger.error("Error in login:", error)
    throw new Error("Login failed")
  }
}

export async function logout(token: string): Promise<void> {
  // In a real implementation, you might want to invalidate the token
  // For now, we'll just log the logout action
  logger.info("User logged out", { token })
}

export async function register(userData: Omit<User, "id">): Promise<{ user: User; token: string } | null> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })
    return { user, token }
  } catch (error) {
    logger.error("Error in register:", error)
    throw new Error("Registration failed")
  }
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch (error) {
    logger.error("Error verifying token:", error)
    return null
  }
}

