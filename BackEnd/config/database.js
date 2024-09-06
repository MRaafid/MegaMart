const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {}).then((con) => {
    console.log(
      `Mongo DB Database Connected with Host: ${con.connection.host}`
    );
  });
};

module.exports = connectDatabase;
