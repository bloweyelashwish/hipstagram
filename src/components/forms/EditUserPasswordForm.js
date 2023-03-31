import { TextField, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../../features/auth/authApiService";

export const EditUserPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [updatePassword] = useUpdatePasswordMutation();

  async function onSubmit(data) {
    const r = await updatePassword(data);
    if (r.error) {
      toast.error(r.error.message);
    } else {
      toast.success("Password is updated now.");
      reset();
    }
  }

  return (
    <Box
      component={"form"}
      display={"flex"}
      onSubmit={handleSubmit(onSubmit)}
      flexDirection={"column"}
      rowGap={"45px"}
    >
      <Box
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        columnGap={"2rem"}
      >
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
          fullWidth
          type={"password"}
        />
        <TextField
          {...register("confirmPassword", {
            required: true,
            validate: (value) => {
              if (watch("password") !== value) {
                return "Password do not match";
              }
              return true;
            },
          })}
          label={"Confirm your password"}
          error={!!errors?.confirmPassword?.message}
          helperText={errors?.confirmPassword?.message}
          fullWidth
          type={"password"}
        />
      </Box>
      <Button
        type={"submit"}
        variant={"contained"}
        sx={{ alignSelf: "flex-end", backgroundColor: "#4D88ED" }}
      >
        Update password
      </Button>
    </Box>
  );
};
