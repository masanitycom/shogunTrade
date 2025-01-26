import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as HttpServer } from "http"
import { initSocket } from "../../lib/socket"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io")
    const httpServer: HttpServer = res.socket.server as any
    res.socket.server.io = initSocket(httpServer)
  } else {
    console.log("socket.io already running")
  }
  res.end()
}

