import { TextField, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegistrationMutation } from "../../features/auth/authApiService";

export const Registration = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [registrationHook] = useRegistrationMutation();

  async function onSubmit(data) {
    const { confirmationPassword, ...requiredData } = data;
    const r = await registrationHook(requiredData);
    if (r.error) {
      toast.error(r.error.data ?? "Unable to register");
    } else {
      setIsSuccess(true);
    }
  }

  return (
    <Box flexGrow={1} display={"flex"} flexDirection={"column"}>
      <Typography variant="h4" component="h2">
        Sign up
      </Typography>
      <Box
        marginTop={"30px"}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        rowGap={2}
        flexGrow={1}
      >
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder={"example@mail.com"}
          label={"Your email"}
          error={!!errors?.email?.message}
          helperText={errors?.email?.message}
        />
        <TextField
          {...register("login", {
            required: true,
            minLength: {
              value: 2,
              message: "Username must contain at least 2 characters",
            },
            maxLength: {
              value: 30,
              message: "Username is too long",
            },
            pattern: {
              value: /^[A-Za-z0-9]*$/,
              message: "Login must consist only of letters and numbers",
            },
          })}
          placeholder={"username"}
          label={"Your username"}
          error={!!errors?.username?.message}
          helperText={errors?.username?.message}
        />
        <TextField
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
          })}
          type={"password"}
          label={"Your password"}
          error={!!errors?.password?.message}
          helperText={errors?.password?.message}
        />
        <TextField
          {...register("confirmationPassword", {
            required: true,
            validate: (value) => {
              if (watch("password") !== value) {
                return "Password do not match";
              }
              return true;
            },
          })}
          type={"password"}
          label={"Confirm your password"}
          error={!!errors?.confirmationPassword?.message}
          helperText={errors?.confirmationPassword?.message}
        />
        <Button
          display={"block"}
          type={"submit"}
          variant="contained"
          sx={{
            backgroundColor: "#4D88ED",
            fontSize: "24px",
            marginTop: "50px",
          }}
          fullWidth
        >
          Sign up
        </Button>
        <Box marginTop={"1rem"}>
          <Typography sx={{ fontSize: "18px" }}>
            Already signed in?{" "}
            <Link
              to="/login"
              style={{ color: " #4D88ED", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </Typography>
          {isSuccess && <Navigate to={"/login"} replace />}
        </Box>
      </Box>
    </Box>
  );
};
