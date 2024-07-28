import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().min(5).max(20).required().messages({
    "any.required": "fullName is required felid",
    "string.base": "fullName most be string",
    "string.empty": "fullName cannot be an empty field",
    "string.min": "should have a minimum length of 5",
    "string.max": "should have a minimum length of 20",
  }),
  email: Joi.string().email().min(5).max(30).required().messages({
    "any.required": "email is required felid",
    "string.base": "email most be string",
    "string.empty": "email cannot be an empty field",
    "string.min": "should have a minimum length of 5",
    "string.max": "should have a minimum length of 30",
    "email.base": "email most be email",
    "email.empty": "email cannot be an empty field",
  }),
  user: Joi.string().min(4).required().messages({
    "any.required": "user is required felid",
    "string.base": "user most be string",
    "string.empty": "user cannot be an empty field",
    "string.min": "should have a minimum length of 4",
  }),
  isActive: Joi.number(),
});
