import pkg from 'express';
const {NextFunction} = pkg;
import { check, validationResult } from 'express-validator'

export const validation = [
  check("username")
  .exists()
  .matches(/^[A-Za-z$#%0-9\s]+$/)
  .withMessage("Name must be alphabetic.")
  .isLength({ min: 3, max: 128 })
  .withMessage("Username must be minimum 4 characters long"),
check("email", "email is not valid").isEmail().normalizeEmail(),
check(
  "password",
  "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
)
  .trim()
  .notEmpty()
  .withMessage("Password required")
  .isLength({ min: 8 })
  .withMessage("password must be minimum 8 length")
  .matches(/(?=.*?[a-z])/)
  .withMessage("At least one Lowercase")
  .matches(/(?=.*?[0-9])/)
  .withMessage("At least one Number")
  .matches(/(?=.*?[#!@$%^&*-])/)
  .withMessage("At least one special character")
  .not()
  .matches(/^$|\s+/)
  .withMessage("White space not allowed"),
  (req, res, next)=>{
    const errors = validationResult(req);
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push({ [err.param]: err.msg }));
    if (!errors.isEmpty()) {
      return res.send({ error: extractedErrors });
    }
    next();
  }
]