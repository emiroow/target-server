import Joi from "joi";

export const uploadSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": " نام فیلد اجباری می باشد",
    "string.empty": " نام فیلد اجباری می باشد",
  }),
  image: Joi.string().required().messages({
    "any.required": " عکس اجباری می باشد",
    "string.empty": " عکس اجباری می باشد",
  }),
});
