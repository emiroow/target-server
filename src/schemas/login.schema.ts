import Joi from "joi";

export const loginSchema = Joi.object({
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
});
