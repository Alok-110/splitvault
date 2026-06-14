import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  if (!token) 
    return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, email: string }
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export { tokenValidator }