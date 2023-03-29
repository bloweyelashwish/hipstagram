import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { setActiveRouteTitle } from "../../features/route/routeSlice";

import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { useGetUserByIdQuery } from "../../features/users/usersApiService";
import { PostUpload } from "../../components/forms/PostUpload/PostUpload";

export const User = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isOwnPage = useSelector(selectUser)?.id === params.id;
  const { data, isLoading, isError, isSuccess } = useGetUserByIdQuery(
    params.id
  );

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

  if (isSuccess) {
    dispatch(setActiveRouteTitle(data.login));
  }

  const { posts, followersCount, followingsCount } = data;

  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #D9D9D9" }} padding={"38px 0"}>
        <Box display={"flex"} columnGap={10}>
          <Avatar sx={{ height: "150px", width: "150px" }} flexShrink={0} />

          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexGrow={1}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
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
            {isOwnPage && (
              <Box width={"100%"} mt={"30px"}>
                <Button
                  sx={{
                    fontSize: "24px",
                    display: "flex",
                    alignItem: "center",
                    columnGap: "5px",
                    width: "100%",
                    backgroundColor: "grey",
                    color: "white",
                    borderRadius: "5px",
                    "&:hover": {
                      opacity: "0.7",
                      backgroundColor: "grey",
                    },
                  }}
                >
                  Go to settings <SettingsOutlined />
                </Button>
              </Box>
            )}
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
              No posts yes ?
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              Upload your first post here
            </Typography>
            <PostUpload />
          </Box>
        )}
      </Box>
    </Box>
  );
};
