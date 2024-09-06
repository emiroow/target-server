import Joi from "joi";

export const boardSchema = Joi.object({
  backgroundImageUrl: Joi.string().required().messages({
    "any.required": "عکس بکگراند فیلد اجباری می باشد",
    "string.empty": "عکس بکگراند فیلد اجباری می باشد",
  }),
  emoji: Joi.string().required().messages({
    "any.required": "اموجی فیلد اجباری می باشد",
    "string.empty": "اموجی فیلد اجباری می باشد",
  }),
  name: Joi.string().required().messages({
    "any.required": "نام بورد فیلد اجباری می باشد",
    "string.empty": "نام بورد فیلد اجباری می باشد",
  }),
  date: Joi.date(),
});
