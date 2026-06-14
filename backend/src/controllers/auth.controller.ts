import { Request, Response } from "express"

const register = async (req : Request, res: Response) => {

    console.log("registerted");
}

const login = async (req: Request, res: Response) => {

    console.log("login success");
}

export {login, register}