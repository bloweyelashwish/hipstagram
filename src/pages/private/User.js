import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useUploadPostMutation } from "../../features/posts/postsApiSlice";
import { useGetUserByIdQuery } from "../../features/users/usersApiService";

import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import {
  SettingsOutlined,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import { PostUpload } from "../../features/posts/PostUpload";
import { Post } from "../../features/posts/Post";

export const User = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isOwnPage = useSelector(selectUser)?.id === params.id;
  const { data, isLoading, isError, isSuccess } = useGetUserByIdQuery(
    params.id
  );
  const [uploadPost, result] = useUploadPostMutation();

  if (isLoading) {
    return (
      <Stack spacing={2} padding={"2rem"}>
        <Box display={"flex"} alignItems={"center"} columnGap={3}>
          <Skeleton variant="circular" width={150} height={150} />
          <Skeleton height={150} width={500} />
        </Box>
        <Skeleton height={700} />
      </Stack>
    );
  }

  const { posts, followersCount, followingsCount, login } = data;

  const newPostHandler = (postDTO) => {
    uploadPost(postDTO);
  };
  console.log(posts);

  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #D9D9D9" }} padding={"38px 0"}>
        <Box display={"flex"} columnGap={10}>
          <Avatar sx={{ height: "150px", width: "150px", flexShrink: 0 }} />
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-evenly"}
            padding={"10px"}
            flexGrow={1}
          >
            <Box
              width={"100%"}
              display="flex"
              alignItems="center"
              columnGap={3}
            >
              <Typography variant="h4" component="h1">
                {login}
              </Typography>
              {isOwnPage && (
                <IconButton
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  <SettingsOutlined />
                </IconButton>
              )}
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              columnGap={10}
              width={"100%"}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "28px",
                }}
              >
                {posts.length ?? 0} posts
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "28px",
                }}
              >
                {followersCount} followers
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "28px",
                }}
              >
                {followingsCount} followings
              </Typography>
            </Box>
            {!isOwnPage && (
              <Box width={"100%"} mt={"30px"}>
                <Button
                  sx={{
                    fontSize: "24px",
                    width: "100%",
                    backgroundColor: "#4D88ED",
                    color: "white",
                    borderRadius: "5px",
                    "&:hover": {
                      opacity: "0.7",
                      backgroundColor: "#4D88EE",
                    },
                  }}
                >
                  Follow
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box padding={"38px 0"}>
        {isOwnPage && !posts.length && (
          <Box height={"100%"}>
            <Typography variant="h4" component="h2" textAlign={"center"}>
              No posts yet?
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              Upload your first post here
            </Typography>
            <PostUpload onAddedPost={newPostHandler} />
          </Box>
        )}
        {!isOwnPage && !posts.length && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h4" component="h2" textAlign={"center"}>
              No posts
            </Typography>
            <SentimentDissatisfiedOutlined sx={{ fontSize: "3rem" }} />
          </Box>
        )}
        {!!posts.length && (
          <Grid container spacing={2} columns={{ xs: 12 }}>
            {posts.map((post) => {
              console.log(post);
              return (
                <Grid item xs={6}>
                  <Post {...post} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
