import Joi from "joi";

export const loginSchema = Joi.object({
  user: Joi.string().min(4).required().messages({
    "any.required": "نام کاربری فیلد اجباری می باشد",
    "string.empty": "نام کاربری فیلد اجباری می باشد",
    "string.min": "نام کابری باید بیشتر از 4 کارکتر باشد",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "any.required": "رمز عبور فیلد اجباری می باشد",
      "string.pattern.base": "رمز عبور باید حداقل یک حرف و یک عدد داشته باشد",
      "string.empty": "رمز عبور فیلد اجباری می باشد",
      "string.min": "رمز عبور باید بیشتر از 8 کارکتر باشد",
      "string.max": "رمز عبور باید کمتر از 30 کارکتر باشد",
    }),
});
