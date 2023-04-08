import { useState } from "react";
import { useGetPostByIdQuery, useLikePostMutation } from "./postsApiSlice";

import { Box, Dialog, Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { PostModal } from "./PostModal";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

export const Post = ({ _id }) => {
  const dispatch = useDispatch();
  const [postOpen, setPostOpen] = useState(false);
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch: refetchPost,
  } = useGetPostByIdQuery(_id);
  const [likePost] = useLikePostMutation();

  if (isError) {
    toast.error("Could not load post. Try again later!");
    if (error?.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }

    return null;
  }

  const postClickHandler = () => {
    setPostOpen(true);
  };

  const postLikeHandler = async () => {
    await likePost(_id);
    refetchPost();
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          aspectRatio: "4/3",
          cursor: "pointer",
          transition: "all 150ms ease",
          "&:hover": { filter: "blur(2px)", cursor: "zoom-in" },
          position: "relative",
          overflow: "hidden",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          {isLoading && (
            <Skeleton animation={"wave"} height={"100%"} width={"100%"} />
          )}
          {isSuccess && !isLoading && (
            <img
              src={data?.imgUrl}
              alt={data?.title}
              onClick={postClickHandler}
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          )}
        </Box>
        <Dialog
          open={postOpen}
          onClose={() => setPostOpen(false)}
          maxWidth={"lg"}
          fullWidth={true}
        >
          <PostModal post={{ ...data }} onLike={postLikeHandler} />
        </Dialog>
      </Box>
    </Box>
  );
};
