import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().min(5).max(20).required().messages({
    "any.required": "fullName is required felid",
    "string.base": "fullName most be string",
    "string.empty": "fullName cannot be an empty field",
    "string.min": "fullName should have a minimum length of 5",
    "string.max": "fullName should have a minimum length of 20",
  }),
  email: Joi.string().email().min(5).max(30).required().messages({
    "any.required": "email is required felid",
    "string.base": "email most be string",
    "string.empty": "email cannot be an empty field",
    "string.min": "email should have a minimum length of 5",
    "string.max": "email should have a minimum length of 30",
    "email.base": "email most be email",
    "email.empty": "email cannot be an empty field",
  }),
  user: Joi.string().min(4).required().messages({
    "any.required": "user is required felid",
    "string.base": "user most be string",
    "string.empty": "user cannot be an empty field",
    "string.min": "user should have a minimum length of 4",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "any.required": "password is required felid",
      "string.pattern.base":
        "password must contain at least one letter and one number",
      "string.base": "password most be string",
      "string.empty": "password cannot be an empty field",
      "string.min": "password should have a minimum length of 8",
      "string.max": "password should have a minimum length of 30",
    }),
  isActive: Joi.number(),
});
