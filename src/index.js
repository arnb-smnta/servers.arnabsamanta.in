import connectDB from "./db/index.js";
import { httpServer } from "./app.js";

const majorNodeVersion = +process.env.NODE_VERSION?.split(".")[0] || 0;

const startServer = () => {
  httpServer.listen(process.env.PORT || 8080, () => {
    console.log("@ Server is running at " + process.env.PORT);
  });
};

if (majorNodeVersion >= 14) {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("Mongo db connect error: ", err);
  }
} else {
  connectDB()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      console.log("Mongo db connect error: ", err);
    });
}
