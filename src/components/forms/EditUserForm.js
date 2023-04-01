import { Box, TextField, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../features/auth/authSlice";
import { useUpdateCurrentUserMutation } from "../../features/users/usersApiSlice";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";
import { convertToBase64 } from "../../utils/convertToBase64";

export const EditUserForm = () => {
  const [stateAvatar, setStateAvatar] = useState();
  const dispatch = useDispatch();

  const {
    data: user,
    isError,
    error,
    refetch: refetchUser,
    isSuccess,
  } = useCurrentUserQuery();
  const [updateUser] = useUpdateCurrentUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setStateAvatar(user.avatar);
    }
  }, [user, isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isError) {
    toast.error(error.message);
  }

  const { login, email, firstName, lastName } = user;

  async function updateApiUser(data) {
    const r = await updateUser(data);

    if (r.error) {
      toast.error(r.error.data);
    } else {
      toast.success("Your profile was successfully updated");
      const { data: newUser } = await refetchUser();
      dispatch(setUser({ user: newUser }));
    }
  }

  async function handleAvatarChange({ target }) {
    let newAvatar = "";
    try {
      newAvatar = await convertToBase64(target.files[0]);
      setStateAvatar(newAvatar);
    } catch (e) {
      toast.error(e.message);
    }

    setStateAvatar(newAvatar);
  }

  const submitHandler = async (data) => {
    try {
      await updateApiUser({ ...data, avatar: stateAvatar });
    } catch (e) {
      toast.error(e.message);
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
            <Avatar
              src={stateAvatar}
              sx={{ width: "140px", height: "140px" }}
            />
            <Button
              component="label"
              variant="contained"
              sx={{ marginTop: "10px", backgroundColor: "#4D88ED" }}
            >
              <input
                type={"file"}
                hidden
                {...register("avatar")}
                onChange={handleAvatarChange}
              />
              Change photo
            </Button>
          </Box>
          <TextField
            {...register("login", {
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
            label={"Login"}
            error={!!errors?.email?.login}
            helperText={errors?.email?.login}
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
            {...register("firstName", {
              minLength: 1,
              pattern: {
                value: /^[A-Za-z0-9]*$/,
                message: "Name must consist only of letters and numbers",
              },
            })}
            label={"First name"}
            defaultValue={firstName}
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message}
          />
          <TextField
            {...register("lastName", {
              minLength: 1,
              pattern: {
                value: /^[A-Za-z0-9]*$/,
                message: "Login must consist only of letters and numbers",
              },
            })}
            label={"Last name"}
            defaultValue={lastName}
            error={!!errors?.lastName?.message}
            helperText={errors?.lastName?.message}
          />
          <TextField
            {...register("email", {
              minLength: 8,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            label={"Email"}
            defaultValue={email}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
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
