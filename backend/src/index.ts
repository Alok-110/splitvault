import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {

    return res.json({
        status : 200,
        message: "health in check"
    })
})


app.use("/auth", authRouter);


const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
    console.log(`app is listening at ${PORT}`);
});
