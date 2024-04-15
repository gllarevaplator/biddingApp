import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputForm from "../Auctions/Forms/InputForm";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../features/services/userSlice";

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, touched, errors, handleSubmit, handleChange } =
    useFormik<RegisterFormValues>({
      initialValues: {
        username: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
      },
      validationSchema: Yup.object().shape({
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username is too short")
          .max(100, "Username is too long"),
        password: Yup.string()
          .required("Password is required")
          .min(3, "Password is too short"),
        confirmPassword: Yup.string()
          .required("Confirm Password is required")
          .min(3, "Confirm Password is too short")
          .oneOf([Yup.ref("password")], "Passwords must match"),
        firstname: Yup.string()
          .required("First Name is required")
          .min(3, "First Name is too short")
          .max(100, "First Name is too long"),
        lastname: Yup.string()
          .required("Last Name is required")
          .min(3, "Last Name is too short")
          .max(100, "Last Name is too long"),
      }),
      onSubmit: (
        { username, password, firstname, lastname }: RegisterFormValues,
        { resetForm }: FormikHelpers<RegisterFormValues>
      ) => {
        const user = {
          id: 1,
          username,
          firstname,
          lastname,
          password,
        };
        dispatch(registerSuccess(user));
        navigate("/login");
        resetForm();
      },
    });

  return (
    <div>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "30%",
            }}
          >
            <InputForm
              id="username"
              name="username"
              type="text"
              label="Username"
              value={values.username}
              handleChange={handleChange}
              touched={touched.username}
              errors={errors.username}
            />
            <InputForm
              id="password"
              name="password"
              type="password"
              label="Password"
              value={values.password}
              handleChange={handleChange}
              touched={touched.password}
              errors={errors.password}
            />
            <InputForm
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={values.confirmPassword}
              handleChange={handleChange}
              touched={touched.confirmPassword}
              errors={errors.confirmPassword}
            />
            <InputForm
              id="firstname"
              name="firstname"
              type="text"
              label="First Name"
              value={values.firstname}
              handleChange={handleChange}
              touched={touched.firstname}
              errors={errors.firstname}
            />
            <InputForm
              id="lastname"
              name="lastname"
              type="text"
              label="Last Name"
              value={values.lastname}
              handleChange={handleChange}
              touched={touched.lastname}
              errors={errors.lastname}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Register;
