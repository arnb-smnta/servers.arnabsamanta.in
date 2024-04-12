/*When you run the Express.js application, Morgan will automatically 
log details about each incoming HTTP request to the console.
 This can be invaluable for monitoring and debugging your 
 server's behavior, especially in production environments. */

import morgan from "morgan";
import logger from "./winston.logger";
const stream = {
  //use the http severity
  write: (message) => logger.http(message.trim()),
};
//morgan skips checking in case of developement environment it will used in production
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "developement";
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
