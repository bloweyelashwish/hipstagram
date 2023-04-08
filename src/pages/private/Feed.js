import { Box, Grid, Typography } from "@mui/material";
import { useGetFeedQuery } from "../../features/posts/postsApiSlice";
import errorImg from "../../assets/error.svg";
import { Post } from "../../features/posts/Post";
import { Loader } from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export const Feed = () => {
  const dispatch = useDispatch();
  const { data: feedData, isError, isLoading, error } = useGetFeedQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error(error?.message);
    if (error.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }

    return null;
  }

  if (!feedData.length) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"10rem"}
        flexDirection="column"
        rowGap={2}
      >
        <Box
          sx={{ maxWidth: 300, maxHeight: 300, width: "100%", height: "100%" }}
        >
          <img
            src={errorImg}
            alt="Users not found"
            style={{
              display: "block",
              maxWidth: "100%",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{ fontWeight: 700, color: "#2DB6F0", fontSize: "48px" }}
        >
          Feed is currently empty
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={5}
      paddingY={5}
      paddingX={8}
      justifyContent={"center"}
    >
      {feedData.map((feedPost) => (
        <Grid item key={feedPost._id} xs={12}>
          <Post {...feedPost} />
        </Grid>
      ))}
    </Grid>
  );
};
