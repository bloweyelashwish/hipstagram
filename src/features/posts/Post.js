import { useState } from "react";
import { useGetPostByIdQuery, useLikePostMutation } from "./postsApiSlice";
import {
  useGetFollowersAndFollowingsQuery,
  useGetUserByIdQuery,
} from "../users/usersApiSlice";
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from "../comments/commentsApiSlice";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputBase,
  Skeleton,
  Typography,
  Avatar,
} from "@mui/material";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import { CommentsList } from "../comments/CommentsList";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import { Loader } from "../../components/ui/Loader/Loader";

const PostModal = ({ post, onLike }) => {
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
  const {
    data: followersData,
    isLoading: followersLoading,
    error: followersError,
    isError: followersHaveError,
  } = useGetFollowersAndFollowingsQuery(post.ownerId);
  const currentUser = useSelector(selectUser);

  const [createComment] = useCreateCommentMutation();
  const { register, handleSubmit, reset } = useForm();

  if (userLoading || commentsLoading || followersLoading) {
    return <Loader />;
  }

  if (userHasError) {
    throw new Error(userError?.message);
  }

  if (commentsHaveError) {
    throw new Error(commentsError?.message);
  }

  if (followersHaveError) {
    throw new Error(followersError?.message);
  }

  const newCommentHandler = async (data) => {
    const r = await createComment({ text: data.text, postId: post._id });
    if (r.error) {
      toast.error(r.error.data);
    } else {
      refetchComments();
    }

    reset();
  };

  const { login, avatar } = userData;
  const { followers } = followersData;
  const isFollowed = followers.find(
    (follower) => follower.id === currentUser.id
  );

  const { likes } = post;
  const isLiked = !!likes.find((like) => like._id === currentUser.id);

  function getLikesString() {
    if (likes.length >= 3) {
      return `Liked by ${likes[0].login}, ${likes[1].login}, and ${
        likes.length - 2
      } others...`;
    }

    if (likes.length === 2) {
      return `Liked by ${likes[0].login} and ${likes[1].login}`;
    }

    return `Liked by ${likes[0].login}`;
  }

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
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              paddingInline: "15px",
              color: "#000",
            }}
            display={"flex"}
            flexDirection={"column"}
          >
            {login}
            <Typography
              component={"span"}
              sx={{
                fontSize: "1rem",
                paddingInline: "15px",
                color: "#000",
                fontWeight: 300,
              }}
            >
              {post.title}
            </Typography>
          </Typography>

          {currentUser.id !== post.ownerId && !isFollowed && (
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
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column-reverse",
            maxHeight: '370px',
          }}
        >
          {commentsData.length ? (
            <CommentsList list={commentsData} />
          ) : (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "0.45rem",
                color: "gray",
              }}
            >
              Be the first to comment
            </Typography>
          )}
        </Box>
        <Box position={"relative"} bottom={0}>
          <Box
            sx={{
              borderTop: "1px solid #D5D5D5",
              display: "flex",
              alignItems: "center",
            }}
            padding={"5px 10px"}
          >
            <IconButton onClick={() => onLike()}>
              {isLiked ? (
                <FavoriteRounded sx={{ fontSize: "1.5rem", color: "#000" }} />
              ) : (
                <FavoriteBorderOutlined
                  sx={{ fontSize: "1.5rem", color: "#000" }}
                />
              )}
            </IconButton>
            <span
              style={{ color: "#000", fontSize: "12px", lineHeight: "14px" }}
            >
              {!likes.length && ""}
              {!!likes.length && getLikesString()}
            </span>
          </Box>
          <Box
            component={"form"}
            display={"flex"}
            alignItems={"center"}
            onSubmit={handleSubmit(newCommentHandler)}
            sx={{ borderTop: "1px solid #D5D5D5" }}
            padding={"5px 10px"}
          >
            <InputBase
              {...register("text", { minLength: 1, maxLength: 60 })}
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
    </Box>
  );
};

export const Post = ({ _id }) => {
  const [postOpen, setPostOpen] = useState(false);
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchPost,
  } = useGetPostByIdQuery(_id);
  const [likePost] = useLikePostMutation();

  if (isError) {
    toast.error("Could not load post. Try again later!");
    return;
  }

  const postClickHandler = () => {
    setPostOpen(true);
  };

  const postLikeHandler = async () => {
    await likePost(_id);
    refetchPost();
  };

  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <Box
        sx={{
          aspectRatio: "4/3",
          cursor: "pointer",
          transition: "all 150ms ease",
          "&:hover": { filter: "blur(2px)", cursor: "zoom-in" },
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1rem'
        }}
      >
        <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
          {isLoading && <Skeleton animation={"wave"} height={'100%'} width={'100%'} />}
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
                objectFit: 'cover'
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
