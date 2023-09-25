const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRoute } = require("./routes/userRoute");
const { employeeRoute } = require("./routes/employeeRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/employee", employeeRoute);

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to Backend");
})

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server is live")
    } catch (error) {
        console.log(error)
    }
})