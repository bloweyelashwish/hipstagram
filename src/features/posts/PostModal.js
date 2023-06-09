import {
  useGetUserByIdQuery,
} from "../users/usersApiSlice";
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from "../comments/commentsApiSlice";
import { useForm } from "react-hook-form";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import { CommentsList } from "../comments/CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { Loader } from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import {
  Box,
  Avatar,
  Button,
  Typography,
  IconButton,
  InputBase,
  CircularProgress,
} from "@mui/material";
import { logout } from "../auth/authSlice";

export const PostModal = ({ post, onLike, onNavigate }) => {
  const dispatch = useDispatch();
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
  const currentUser = useSelector(selectUser);

  const [createComment, { isLoading: newCommentLoading }] =
    useCreateCommentMutation();
  const { register, handleSubmit, reset } = useForm();

  if (userLoading || commentsLoading) {
    return <Loader />;
  }

  if (userHasError) {
    toast.error(userError?.message);
    if (userError.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }

    return null;
  }

  if (commentsHaveError) {
    toast.error(commentsError?.message);
    if (commentsError?.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }

    return null;
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
                paddingInline: "0 15px",
                color: "#000",
                fontWeight: 300,
              }}
            >
              {post.title}
            </Typography>
          </Typography>
        </Box>
        <Box
          flexGrow={1}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column-reverse",
            maxHeight: "370px",
          }}
        >
          {commentsData.length ? (
            <CommentsList
              list={commentsData}
              onChange={() => refetchComments()}
              onNavigate={onNavigate}
            />
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
            {newCommentLoading ? (
              <Box padding={1}>
                <CircularProgress size={"1rem"} sx={{ color: "#1976d2" }} />
              </Box>
            ) : (
              <Button sx={{ fontWeight: 700 }} type={"submit"}>
                Send
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
