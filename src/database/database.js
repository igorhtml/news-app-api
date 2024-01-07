import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connection to database");
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("mongoDB Atlas connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
