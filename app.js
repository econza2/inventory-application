const express = require("express");
const app = express();

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const categoryRouter = require("./routes/categoryRouter");

app.use("/", categoryRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
