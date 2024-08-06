import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .minSymbols(1)
    .min(6),
});
