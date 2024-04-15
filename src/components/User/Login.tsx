import React, { useState } from "react";
import InputForm from "../Auctions/Forms/InputForm";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerSuccess } from "../../features/services/userSlice";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { handleSubmit, handleChange, values, touched, errors } =
    useFormik<LoginFormValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username is too short")
          .max(100, "Username is too long"),
        password: Yup.string()
          .required("Password is required")
          .min(3, "Password is too short"),
      }),
      onSubmit: () => {
        try {
          const localUserData = localStorage.getItem("user");
          if (localUserData) {
            const { id, username, firstname, password } =
              JSON.parse(localUserData);
            const userData = JSON.parse(localUserData);
            if (username === values.username && password === values.password) {
              dispatch(registerSuccess(userData));
              setError(false);
              setErrorMessage("");
              navigate("/");
            } else {
              setError(true);
              setErrorMessage("Invalid Email/Password");
            }
          }
        } catch (error) {
          console.log("Something went wrong");
        }
      },
    });

  return (
    <div>
      <h1>Login</h1>
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
            {error ? (
              <span style={{ color: "red" }}>{errorMessage}</span>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
