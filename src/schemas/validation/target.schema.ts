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
  emoji: Joi.string().required().messages({
    "string.empty": "اموجی نباید خالی باشد",
    "any.required": "اموجی الزامی است",
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
})
  .unknown(false)
  .error((errors) => {
    errors.forEach((err) => {
      const errorDetail = err as any;
      if (errorDetail.code === "object.unknown") {
        errorDetail.message = `فیلد اضافی "${errorDetail.local?.label}" مجاز نیست`;
      }
    });
    return errors;
  });
