import { body, param } from "express-validator";

/**
 *
 * @param {string} idName
 * @description A common validator responsible to validate mongodb ids passed in the url's path variable
 */

export const mongoIdPathVariableValidatorFunction = (idName) => {
  return [param(idName).notEmpty().isMongoId().withMessage(`invalid${idName}`)];
};

/**
 *
 * @param {string} idName
 * @description A common validator responsible to validate mongodb ids passed in the request body
 */

export const mongoIdRequestBodyValidatorFunction = (idName) => {
  return [body(idName).notEmpty().isMongoId().withMessage(`invalid${idName}`)];
};
