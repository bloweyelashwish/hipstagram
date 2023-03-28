import { Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApiService";
import { selectToken, setToken } from "../../features/auth/authSlice";
import { store } from "../../app/store";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loginHook, meta] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, error } = meta;

  async function onSubmit(data) {
    const user = await loginHook(data);
    if (user.data?.access_token) {
      console.log(user.data?.access_token);
      dispatch(setToken({ accessToken: user.data?.access_token }));
      console.log(store.getState());
    }
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
          {...register("login", {
            required: "Login is required",
            minLength: {
              value: 2,
              message: "Username must contain at least 2 characters",
            },
            maxLength: {
              value: 30,
              message: "Username is too long",
            },
          })}
          label={"Your username"}
          error={!!errors?.email?.login}
          helperText={errors?.email?.login}
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
        <Button type={"submit"}>Login</Button>
      </Box>
      <div>
        <p>
          Not signed up yet? <Link to="/signup">Sign up</Link>
        </p>
        {isSuccess && <Navigate to={"/feed"} replace />}
      </div>
    </div>
  );
};
