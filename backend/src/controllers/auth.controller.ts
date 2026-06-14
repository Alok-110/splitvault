import { Request, Response } from "express";
import { registerSchema } from "../utils/validator.js";
import { register as registerService } from "../services/auth.service.js";

const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ errors: result.error.flatten() });

  const { name, email, password } = result.data;

  try {
    const { token, user } = await registerService(name, email, password);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "user created successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { register };
