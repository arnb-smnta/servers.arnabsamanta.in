import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import logger from "../loggers/winston.logger.js";
import { removeUnusedMulterImageFilesOnError } from "../utils/helpers.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  //Check if the error is the instance of an Api error class which extends native error class

  if (!error instanceof ApiError) {
    //if not
    //create a new ApiError instance to keep the consistency

    //assign an appropriate status code

    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    //set a message from native Error instance or a custom one

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  //Now we are sure that 'error' variable will be an instance of API error class

  const response = {
    ...error,
    message: error.message,
    ...ApiError(
      process.env.NODE_ENV === "developement" ? { stack: error.stack } : {}
    ), //This is to ensure that in developement stack traces are visible for debugging
  };
  logger.error(`${error.message}`);

  removeUnusedMulterImageFilesOnError(req);

  //Send error response

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
