const mongoose = require("mongoose");

// mongo connect
module.exports = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("DB connected");
  });
};
