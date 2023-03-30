import { useState } from "react";
import { useGetPostByIdQuery } from "./postsApiSlice";
import { useGetUserByIdQuery } from "../users/usersApiSlice";
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from "../comments/commentsApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Dialog,
  InputBase,
  Skeleton,
  Typography,
} from "@mui/material";
import { Avatar } from "../../components/ui/Avatar/Avatar";

const PostModal = ({ post }) => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    isError: userHasError,
  } = useGetUserByIdQuery(post.ownerId);
  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
    isError: commentsHaveError,
    refetch: refetchComments,
  } = useGetCommentsByPostIdQuery(post._id);
  //  not working
  const [createComment, result] = useCreateCommentMutation();
  const { register, handleSubmit } = useForm();

  const currentUser = useSelector(selectUser);

  if (userLoading || commentsLoading) {
    return <p>is loading</p>;
  }

  if (userHasError) {
    throw new Error(`${userError?.message}`);
  }

  if (commentsHaveError) {
    throw new Error(`${commentsError?.message}`);
  }

  const newCommentHandler = async (data) => {
    await createComment({ text: data.text, postId: post._id }).then(() =>
      refetchComments()
    );
  };

  const { login, avatar } = userData;
  console.log(commentsData);

  return (
    <Box display={"flex"}>
      <Box flexBasis={"60%"} height={"550px"} sx={{ backgroundColor: "#000" }}>
        <img
          src={post.imgUrl}
          alt={post.title}
          style={{
            display: "block",
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box display={"flex"} flexDirection={"column"} flexBasis={"40%"}>
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
        <Box
          flexGrow={1}
          maxHeight={"100% - 85px"}
          sx={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <p>Comment</p>
          <p>Comment</p>
          <p>Comment</p>
          <p>Comment</p>
        </Box>
        <Box
          position={"relative"}
          bottom={0}
          padding={"10px"}
          component={"form"}
          display={"flex"}
          alignItems={"center"}
          onSubmit={handleSubmit(newCommentHandler)}
          sx={{ borderTop: "1px solid #D5D5D5" }}
        >
          <InputBase
            {...register("text", { minLength: 1 })}
            multiline
            placeholder={"Add comment..."}
            fullWidth
            variant="standard"
          />
          <Button sx={{ fontWeight: 700 }} type={"submit"}>
            Send
          </Button>
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
        <Dialog
          open={postOpen}
          onClose={() => setPostOpen(false)}
          maxWidth={"lg"}
          fullWidth={true}
        >
          <PostModal post={{ ...data }} />
        </Dialog>
      </Box>
    </Box>
  );
};
