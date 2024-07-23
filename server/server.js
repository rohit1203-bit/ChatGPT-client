const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

//routes path
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser());

const PORT = process.env.PORT || 8082;

app.get('/', (req, res) => {
  res.send('API is running');
})

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", messageRoutes);
// app.use("/api/v1/openai", require("./routes/openaiRoutes"));

//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
      .white
  );
});