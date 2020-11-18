if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./config/dev.env" });
else require("dotenv").config({ path: "./config/prod.env" });

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./services/setupProxy.js");
require("./services/passport.js");

// Mongo Connect
const dbConnect = require("./config/dbConfig.js");
dbConnect();

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auth routes
const authRoutes = require("./routes/authRoutes.js");
authRoutes(app);

// app listen
console.clear();
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
