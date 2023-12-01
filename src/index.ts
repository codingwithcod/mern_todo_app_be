import express from "express";
import { DB_URL, HOST_NAME, PORT } from "./config";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import connectDb from "./utils/connectDb";
import cors from "cors";
import deserializeUser from "./middlewares/deserializeUser";

const app = express();

/** ---> registering middlewares */
app.use(express.json());
app.use(cors());
app.use(deserializeUser); // deserializing user

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello i am live" });
});

/** ---> handling all routes */
app.use("/api", router);

/** ---> handling 404 routes */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/** ---> handling errors */
app.use(errorHandler);

app.listen(Number(PORT), HOST_NAME ? HOST_NAME : "127.0.0.1", () => {
  console.log(`server is running at : http://${HOST_NAME}:${PORT}`);
  connectDb(DB_URL!);
});
