import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connectionURL = `${connection?.connection?.host}:${connection?.connection?.port}`;
    console.log(`MongoDB connected at: ${connectionURL}`);
  } catch (error) {
    console.log(error?.message);
    process.exit(1);
  }
};

export default connectDB;
