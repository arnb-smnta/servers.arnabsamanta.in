import cookieParser from "cookie-parser";

import cors from "cors";

import express from "express";

import { rateLimit } from "express-rate-limit";

import session from "express-session";

import fs from "fs";

import { createServer } from "http";

import passport from "passport";

import path from "path";

import requestIp from "request-ip";

import { Server } from "socket.io";
import morganMiddleware from "./loggers/morgan.logger";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io); //using set method to mount the io instance of the app to avoid usage of 'global'

//global middlewares

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN?.split(","), //For multiple cors origin in Production
    credentials: true,
  })
);

app.use(requestIp.mw()); //getting the ip of requests to made to limit the api calls

//Rate limiter to avoid misuse of the service and avoid cost spikes in production

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 2000, //Limit each ip to 200 requests per 'window ' per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.clientIp; //IP adress from requestIp.mw(),as oppsosed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests .You are only allowed ${
        options.limit
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

app.use(limiter); //injecting as a middleware for every request
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

//required for passport
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); //Session Secret

app.use(passport.initialize());
app.use(passport.session()); //Persistent login sessions
app.use(morganMiddleware);

export { httpServer };
