import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "عنوان نباید خالی باشد",
    "any.required": "عنوان الزامی است",
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
