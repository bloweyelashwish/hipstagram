import { useState } from "react";
import { useGetPostByIdQuery } from "./postsApiSlice";
import { useGetUserByIdQuery } from "../users/usersApiService";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { Avatar } from "../../components/ui/Avatar/Avatar";

const PostModal = ({ post }) => {
  const { data, isLoading, error, isError } = useGetUserByIdQuery(post.ownerId);
  const currentUser = useSelector(selectUser);

  if (isLoading) {
    return <p>is loading</p>;
  }

  if (isError) {
    throw new Error(`${error.message}`);
  }

  const { login, avatar } = data;

  return (
    <Box display={"flex"} height={"480px"} width={"700px"}>
      <Box maxHeight={"300"} maxWidth={"300"}>
        <img
          src={post.imgUrl}
          alt={post.title}
          style={{ display: "block", maxWidth: "100%", objectFit: "contain" }}
        />
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          padding={"15px"}
          sx={{ borderBottom: "1px solid #D5D5D5" }}
        >
          <Avatar
            src={avatar}
            sx={{ height: "50px", width: "50px" }}
            mr={"15px"}
          />
          <Typography sx={{ fontSize: "14px", paddingInline: "5px" }}>
            {login}
          </Typography>
          {currentUser.id !== post.ownerId && (
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "capitalize",
                marginLeft: "auto",
              }}
            >
              Follow
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const Post = ({ _id }) => {
  const [postOpen, setPostOpen] = useState(false);
  const { data, isLoading, isError, isSuccess } = useGetPostByIdQuery(_id);

  const postClickHandler = () => {
    setPostOpen(true);
  };

  if (isError) {
    throw new Error("Error while loading post");
  }

  return (
    <Box>
      <Box
        sx={{
          aspectRatio: "1",
          cursor: "pointer",
          transition: "all 150ms ease",
          "&:hover": { filter: "blur(2px)", cursor: "zoom-in" },
        }}
      >
        {isLoading && <Skeleton animation={"wave"} />}
        {isSuccess && !isLoading && (
          <img
            src={data?.imgUrl}
            alt={data?.title}
            onClick={postClickHandler}
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
        <Dialog open={postOpen} onClose={() => setPostOpen(false)}>
          <PostModal post={{ ...data }} />
        </Dialog>
      </Box>
    </Box>
  );
};
