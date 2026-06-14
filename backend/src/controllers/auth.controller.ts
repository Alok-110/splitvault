import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validator.js";
import { register as registerService, login as loginService } from "../services/auth.service.js";

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

const login = async (req : Request, res : Response) => {

    const result = loginSchema.safeParse(req.body);
    if(!result.success)
      return res.status(400).json({ errors: result.error.flatten() });

    const {email, password} = result.data;

    try{
      const { token, user } = await loginService(email, password);
      res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user });
    }catch(error: any){
      res.status(400).json({ message: error.message });
    }
};

export { register, login };
