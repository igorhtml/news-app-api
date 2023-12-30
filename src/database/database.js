const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Wait connection to database");
  mongoose
    .connect(
      "mongodb+srv://igorcesarhtml:zrkIrudi5dqcNATA@cluster0.vq127bo.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("mongoDB Atlas connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
