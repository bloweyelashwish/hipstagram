import { Box, TextField, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateCurrentUserMutation } from "../../features/users/usersApiSlice";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";
import { convertToBase64 } from "../../utils/convertToBase64";

export const EditUserForm = () => {
  const [stateAvatar, setStateAvatar] = useState();

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

  const { avatar: usrAvatar, login, email, firstName, lastName } = user;

  async function updateApiUser(data) {
    const r = await updateUser(data);

    if (r.error) {
      toast.error(r.error.data);
    } else {
      refetchUser();
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
