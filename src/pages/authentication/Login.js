import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApiService";
import { setToken } from "../../features/auth/authSlice";
import { STORAGE_PREFIX } from "../../globals";

export const Login = () => {
  const [success, setIsSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loginHook] = useLoginMutation();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    const user = await loginHook(data);

    if (user.error) {
      toast.error(user.error.data ?? "Unable to login.");
    }

    if (user.data && user.data.access_token) {
      dispatch(setToken({ accessToken: user.data.access_token }));
      setIsSuccess(true);
    }
  }

  return (
    <Box flexGrow={1} display={"flex"} flexDirection={"column"}>
      <Typography variant="h4" component="h2">
        Sign in
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
          {...register("login", {
            required: "Login is required",
            minLength: {
              value: 2,
              message: "Username must contain at least 2 characters.",
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
          label={"Your username"}
          error={!!errors?.login?.message}
          helperText={errors?.login?.message}
          fullWidth
        />
        <TextField
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
            maxLength: {
              value: 16,
              message: "Password must contain a maximum of 16 characters",
            },
            pattern: {
              value: /^[A-Za-z0-9]*$/,
              message: "Login must consist only of letters and numbers",
            },
          })}
          label={"Your password"}
          error={!!errors?.password?.message}
          helperText={errors?.password?.message}
          fullWidth
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
          Login
        </Button>
      </Box>
      <Box marginTop={"1rem"}>
        <Typography sx={{ fontSize: "18px" }}>
          Not signed up yet?{" "}
          <Link
            to="/signup"
            style={{ color: " #4D88ED", textDecoration: "none" }}
          >
            Sign up
          </Link>
        </Typography>
        {success && <Navigate to={"/feed"} replace />}
      </Box>
    </Box>
  );
};
