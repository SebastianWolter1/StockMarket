import express from "express";
import portfinder from "portfinder";
import "./db-connect.js";
import cors from "cors";
// import { logRoutesData } from "./routes-data-logs.js";
import userRouter from "./routes/userRoute.js";
import stockRouter from "./routes/stockRoute.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(cookieParser());
app.use("/stockuniverse/user", userRouter);
app.use("/stockuniverse/stock", stockRouter);

// portfinder.getPort((err, port) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port, () => {
//       logRoutesData(port, app);
//     });
//   }
// });

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
} )
