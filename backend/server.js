const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const cors = require("cors");
const connectDB = require("../backend/config/db");
const userroutes = require("./routes/userroutes");
const noteRoutes = require("./routes/noteRoutes");
const { errorHandler, notFound } = require("./middleware/errormiddleware");
const path = require("path");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userroutes);
app.use("/api/notes", noteRoutes);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
