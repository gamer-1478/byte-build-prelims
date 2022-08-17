import pkg from 'express';
const {NextFunction} = pkg;
import { check, validationResult } from 'express-validator'

export const validation = [
check("email", "email is not valid").isEmail().normalizeEmail(),
check(
  "password",
  "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
)
  .trim()
  .notEmpty()
  .withMessage("Password required")
  .isLength({ min: 6 })
  .withMessage("password must be minimum 6 length"),
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