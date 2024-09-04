import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().required().min(5).max(20).messages({
    "any.required": "نام و نام خانوادگی فیلد اجباری می باشد",
    "string.empty": "نام و نام خانوادگی فیلد اجباری می باشد",
    "string.min": " نام و نام خانوادگی باید بیشتر از 5 کارکتر باشد",
    "string.max": " نام و نام خانوادگی باید کمتر از 20 کارکتر باشد",
  }),
  email: Joi.string().required().min(5).max(30).messages({
    "any.required": "ایمیل فیلد اجباری می باشد",
    "string.empty": "ایمیل فیلد اجباری می باشد",
    "string.min": " ایمیل باید بیشتر از 5 کارکتر باشد",
    "string.max": " ایمیل باید کمتر از 30 کارکتر باشد",
  }),
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
  confirmPassword: Joi.any()
    .required()
    .equal(Joi.ref("password"))
    .messages({ "any.only": "پسورد تکرار شده صحیح نمیباشد" }),
});
