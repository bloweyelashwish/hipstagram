import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useFollowUserMutation,
  useGetFollowersAndFollowingsQuery,
  useGetUserByIdQuery,
} from "../../features/users/usersApiSlice";
import { logout } from "../../features/auth/authSlice";

import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
  SvgIcon,
} from "@mui/material";
import {
  SettingsOutlined,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import { PostUpload } from "../../features/posts/PostUpload";
import { Post } from "../../features/posts/Post";
import { selectUser } from "../../features/auth/authSlice";
import { useState } from "react";

export const User = () => {
  const dispatch = useDispatch();
  const [errorPage, setErrorPage] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, error } = useGetUserByIdQuery(
    params.id,
    { refetchOnMountOrArgChange: true }
  );
  const [follow] = useFollowUserMutation();
  const currentUser = useSelector(selectUser);
  const {
    data: followersAndFollowings,
    isError: followersHaveError,
    error: followersError,
    isLoading: followersAreLoading,
    refetch: refetchFollowers,
  } = useGetFollowersAndFollowingsQuery(params.id);

  if (isLoading || followersAreLoading) {
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

  if (isError) {
    if (error.data?.status?.toString().startsWith("4")) {
      dispatch(logout());
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: "1rem",
          }}
          paddingX={10}
          paddingY={15}
        >
          <SvgIcon sx={{ fontSize: "3rem" }}>
            <SentimentDissatisfiedOutlined />
          </SvgIcon>
          <Typography variant="h3" component={"h1"}>
            User was not found.
          </Typography>
          <Button
            component={"a"}
            onClick={() => navigate({ pathname: "/feed" })}
          >
            Return to feed
          </Button>
        </Box>
      );
    }

    return;
  }

  if (followersHaveError) {
    if (followersError.data?.status?.toString().startsWith("4")) {
      dispatch(logout());
    }
  }

  const { posts, followersCount, followingsCount, login, id, avatar } = data;
  const { followers: userFollowers = [] } = followersAndFollowings;

  const isOwnPage = currentUser.id === params.id;
  const isFollowed =
    userFollowers.length > 0
      ? !!userFollowers.find((follower) => {
          return follower.id === currentUser.id;
        })
      : false;

  async function handleFollowButtonClick() {
    const r = await follow(id);
    if (r.error) {
      toast.error(r.error.data);
    } else {
      refetch();
      refetchFollowers();
    }
  }

  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #D9D9D9" }} padding={"38px 0"}>
        <Box
          display={"flex"}
          columnGap={10}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Avatar
            sx={{ height: "150px", width: "150px", flexShrink: 0 }}
            src={avatar}
          />
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-evenly"}
            padding={"10px"}
            flexGrow={1}
          >
            <Box width={"100%"} display="flex" alignItems="center">
              <Typography variant="h4" component="h1" mr={"1.5rem"}>
                {login}
              </Typography>
              {isOwnPage && (
                <>
                  <IconButton onClick={() => navigate(`/user/settings`)}>
                    <SettingsOutlined
                      sx={{
                        fontSize: "1.8rem",
                      }}
                    />
                  </IconButton>
                  <PostUpload sx={{ fontSize: "1.8rem" }} onUpload={refetch} />
                </>
              )}
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              width={"100%"}
              sx={{ marginTop: 2, columnGap: { xs: "1rem", md: "4rem" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "18px", md: "24px " },
                  lineHeight: { xs: "21px", md: "28px " },
                }}
              >
                {posts.length ?? 0} posts
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "18px", md: "24px " },
                  lineHeight: { xs: "21px", md: "28px " },
                }}
              >
                {followersCount} followers
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "18px", md: "24px " },
                  lineHeight: { xs: "21px", md: "28px " },
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
                    backgroundColor: isFollowed ? "grey" : "#4D88ED",
                    color: "white",
                    borderRadius: "5px",
                    "&:hover": {
                      opacity: "0.7",
                      backgroundColor: isFollowed ? "grey" : "#4D88ED",
                    },
                  }}
                  onClick={handleFollowButtonClick}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
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
            <Typography mb={"20px"} variant="subtitle1" textAlign={"center"}>
              Upload your first post here
            </Typography>
            <PostUpload onUpload={refetch} />
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
        {posts.length > 0 && (
          <Grid container spacing={2} columns={{ xs: 12 }}>
            {posts.map((post) => {
              return (
                <Grid item xs={6} key={post._id}>
                  <Post {...post} isOwnPost={isOwnPage} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
