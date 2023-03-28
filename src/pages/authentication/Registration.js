import { TextField, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useRegistrationMutation } from "../../features/auth/authApiService";

export const Registration = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [registrationHook, meta] = useRegistrationMutation();
  const { isError, error, isSuccess } = meta;

  console.log(meta);
  async function onSubmit(data) {
    const { confirmationPassword, ...requiredData } = data;
    await registrationHook(requiredData);
  }

  return (
    <div>
      <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        rowGap={2}
        onSubmit={handleSubmit(onSubmit)}
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
          label={"Confirm your password"}
          error={!!errors?.confirmationPassword?.message}
          helperText={errors?.confirmationPassword?.message}
        />
        <Button type={"submit"}>Sign up</Button>
        <p>
          Already signed in? <Link to="/login">Login</Link>
        </p>
        {isError && (
          <p>
            Error while submitting request: {error.data ?? "Invalid request"}
          </p>
        )}
        {isSuccess && <Navigate to={"/login"} replace />}
      </Box>
    </div>
  );
};
