const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const app = new Express();

app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use("/files", Express.static("storage"));

const port = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB || "mongodb://127.0.0.1:27017/passport-demo";

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(console.log(`MongoDB Connected ${MONGO_URI}`))
  .catch((err) => console.log(err));
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

require("./src/utils/passport/setup");

const routes = require("./src/routes/auth");
const secureRoute = require("./src/routes/secure-routes");

app.use("/", routes);
app.use("/api", passport.authenticate("jwt", { session: false }), secureRoute);

app.use(function (err, req, res, next) {
  console.log({ err });
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
