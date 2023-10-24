require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const list = require("./routes/list");
const user = require("./routes/user");
const authlist = require("./routes/authlist");
app.use("/movielist", list);
app.use("/user", user);
app.use("/authlist", authlist);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started at ${port}`));
