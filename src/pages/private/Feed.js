import { Box, Grid, Paper, Typography } from "@mui/material";
import { useGetFeedQuery } from "../../features/posts/postsApiSlice";
import errorImg from "../../assets/error.svg";
import { Stack } from "@mui/system";
import { Post } from "../../features/posts/Post";

export const Feed = () => {
  const { data: feedData, isError, isLoading, error } = useGetFeedQuery();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    throw new Error(`${error?.status} ${error.message}`);
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
    <Grid container spacing={5} paddingY={5} justifyContent={"center"}>
      {feedData.map((feedPost) => (
        <Grid
          item
          key={feedPost._id}
          maxWidth={"700px"}
          maxHeight={"500px"}
          overflow={"hidden"}
        >
          <Post {...feedPost} />
        </Grid>
      ))}
    </Grid>
  );
};
