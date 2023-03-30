import { Box, TextField, Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useUpdateCurrentUserMutation } from "../../features/users/usersApiSlice";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";
import { convertToBase64 } from "../../utils/convertToBase64";
import { useState } from "react";

export const EditUserForm = () => {
  const {
    data: user,
    isSuccess,
    isError,
    error,
    refetch: refetchUser,
  } = useCurrentUserQuery();
  const [updateUser] = useUpdateCurrentUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isError) {
    throw new Error(error?.message);
  }

  const { avatar, login, email, firstName, lastName } = user;

  const submitHandler = async (data) => {
    let avatarString = "";
    try {
      avatarString = await convertToBase64(data.avatar[0]);
    } catch (e) {
      console.log(e);
    } finally {
      updateUser({ ...data, avatar: avatarString }).then(() => updateUser());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Box columnGap={"35px"} display={"flex"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          rowGap={"32px"}
          flexBasis={"50%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf={"flex-start"}
          >
            <Avatar src={avatar} sx={{ width: "140px", height: "140px" }} />
            <Button
              component="label"
              variant="contained"
              sx={{ marginTop: "10px", backgroundColor: "#4D88ED" }}
            >
              <input type={"file"} hidden {...register("avatar")} />
              Change photo
            </Button>
          </Box>
          <TextField
            {...register("login", { value: login, minLength: 6 })}
            label={"Login"}
            defaultValue={login}
            fullWidth
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          flexBasis={"50%"}
        >
          <TextField
            {...register("firstName", { minLength: 1 })}
            label={"First name"}
            defaultValue={firstName}
          />
          <TextField
            {...register("lastName", { minLength: 1 })}
            label={"Last name"}
            defaultValue={lastName}
          />
          <TextField
            {...register("email", { minLength: 8 })}
            label={"Email"}
            defaultValue={email}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          marginTop: "22px",
          marginLeft: "auto",
          display: "block",
          backgroundColor: "#4D88ED",
        }}
        type={"submit"}
      >
        Save Profile
      </Button>
    </Box>
  );
};
