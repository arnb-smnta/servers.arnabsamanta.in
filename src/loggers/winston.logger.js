import winston from "winston";
//Defining the severity levels of errors

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/*This method set the current severity based on the
current NODE_ENV:show all the log levels
if the server was run in dev mode ;otherwise
if it was run in production show only warn and error message*/

const level = () => {
  const env = process.env.NODE_ENV || "developement";
  const isDevelopement = env === "development";
  return isDevelopement ? "debug" : "warn";
};

//Define diffrent colors for each level
//Colors make the log message more visible
//adding the ability to focus or ignore messages

const colors = {
  error: "red",
  warn: "yallow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

//Tell winston that you want to link the colors
//defined above to severity levels

winston.addColors(colors);

//choose the aspect of your log customizing the log format.

const format = winston.format.combine(
  //Add the message timestamp with the preffered format
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
  //Telling winston that logs must be colored
  winston.format.colorize({ all: true }),
  //Define the format of the message showing the timestamp ,the level and the message
  winston.format.printf(
    (info) => `[${info.timestamp} ${info.level}: ${info.message}]`
  )
);

//Define which transports the logger must use to print out messages
//Here we are using only one transport console.log

const transports = [new winston.transports.Console()];

//Creating the looger instance used to log the messages

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
