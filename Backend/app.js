const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const security = require("./middleware/security");
const { NotFoundError } = require("./utils/errors");
const app = express();
const userRoutes = require("./routes/users")
const listingRoutes = require("./routes/listings")
const productRoutes = require("./routes/products")
const serviceRoutes = require("./routes/services")
const reviewRoutes = require("./routes/reviews")
const ratingRoutes = require("./routes/ratings")
const transactionRoutes = require("./routes/transactions")

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(morgan("tiny"));
app.use(security.extractUserFromJwt);

app.use("/user", userRoutes)
app.use("/listing", listingRoutes)
app.use("/product", productRoutes)
app.use("/service", serviceRoutes)
app.use("/review", reviewRoutes)
app.use("/rating", ratingRoutes)
app.use("/transaction", transactionRoutes)

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
