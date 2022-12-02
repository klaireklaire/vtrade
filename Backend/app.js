const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const offerRoutes = require("./routes/offers")
const wantRoutes = require("./routes/wants")


//Routes declared here




const { NotFoundError } = require("./utils/errors");
const app = express();

app.use(cors());


app.use(express.json());

app.use(morgan("tiny"));

app.use("/offer", offerRoutes);
app.use("/want", wantRoutes)
//app.use(security.extractUserFromJwt);



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