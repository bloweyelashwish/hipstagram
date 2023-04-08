import { Avatar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components/ui/Loader/Loader";
import { useFollowUserMutation, useCurrentUserQuery } from "./usersApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

export const MinifiedUser = ({ _id, login, avatar }) => {
  const dispatch = useDispatch();
  const {
    data: currentUser,
    isLoading,
    isError,
    error,
    refetch,
  } = useCurrentUserQuery();
  const [follow] = useFollowUserMutation();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    toast.error(error.message);
    if (error.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }
    return;
  }

  const { following } = currentUser;
  const isFollowed = !!following.find((user) => user.id === _id);

  const followHandler = async () => {
    const r = await follow(_id);
    if (r.error) {
      toast.error(r.error.data);
    } else {
      refetch();
    }
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        padding: "10px 20px",
        border: "1px solid #C0BFBF",
        borderRadius: "10px",
      }}
    >
      <Link
        to={`/user/${_id}`}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Avatar src={avatar ?? ""} sx={{ width: "50px", height: "50px" }} />
        <Typography
          sx={{
            marginLeft: "31px",
            fontSize: "24px",
            lineHeight: "28px",
            color: "#000",
          }}
        >
          {login ?? "Unable to load user"}
        </Typography>
      </Link>
      {_id !== currentUser.id && (
        <Button sx={{ marginLeft: "auto" }} onClick={followHandler}>
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Box>
  );
};
