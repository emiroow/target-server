import Joi from "joi";
import { DIFFICULTY_STATUS, TARGET_STATUS } from "../../interface/enums";

const difficultyValues = Object.values(DIFFICULTY_STATUS);
const targetValues = Object.values(TARGET_STATUS);

export const targetSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "عنوان نباید خالی باشد",
    "any.required": "عنوان الزامی است",
  }),
  subTitle: Joi.string().required().messages({
    "string.empty": "زیر عنوان نباید خالی باشد",
    "any.required": "زیر عنوان الزامی است",
  }),
  description: Joi.string().required().messages({
    "string.empty": "توضیحات نباید خالی باشد",
    "any.required": "توضیحات الزامی است",
  }),
  icon: Joi.string().required().messages({
    "string.empty": "آیکون نباید خالی باشد",
    "any.required": "آیکون الزامی است",
  }),
  difficulty: Joi.string()
    .valid(...difficultyValues)
    .required()
    .messages({
      "any.only": `سطح سختی باید یکی از مقادیر ${difficultyValues.join(
        ", "
      )} باشد`,

      "any.required": "سطح سختی الزامی است",
    }),
});
