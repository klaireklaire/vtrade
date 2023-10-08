const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/users");
const security = require("./middleware/security");
const { NotFoundError } = require("./utils/errors");
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(morgan("tiny"));
app.use(security.extractUserFromJwt);

app.use("/user", userRoutes);

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
