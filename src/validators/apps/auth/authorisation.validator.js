import { body } from "express-validator";
import { AvailableUserRoles } from "../../../constants";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("mobile")
      .optional()
      .isNumeric()
      .withMessage("Mobile number msut be all numbers")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number cannot be more or less than 10 numbers"), //Problem might occur in numeric and length
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid User Role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is Inavlid "),
    body("username").optional(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};
