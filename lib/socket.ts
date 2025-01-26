import type { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import type { NextApiResponse } from "next"

export const initSocket = (server: HttpServer) => {
  const io = new SocketIOServer(server)

  io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })

  return io
}

export const getSocketIO = (res: NextApiResponse) => {
  const io = (res.socket as any).server.io
  if (!io) {
    throw new Error("Socket.IO not initialized")
  }
  return io
}

