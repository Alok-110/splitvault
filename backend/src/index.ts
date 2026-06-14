import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: 200, message: "health in check" })
})

// app.post("/auth", async (req, res) => {
//   res.json({ message: "direct route works" })
// })

app.use("/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log(`app is listening at ${PORT || 5000}`)
})