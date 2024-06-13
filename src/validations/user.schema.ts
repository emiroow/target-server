import * as yup from "yup";

export const userSchema = yup.object().shape({
  fullName: yup.string().required("full Name is required"),
  mobileNumber: yup.number().required("phone Number is required"),
  isActive: yup.number().required("is Active is required"),
});
