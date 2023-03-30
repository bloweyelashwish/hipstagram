import { Box } from "@mui/system";
import { useGetFeedQuery } from "../../features/posts/postsApiSlice";

export const Feed = () => {
  const { data: feedData, isError, isLoading, error } = useGetFeedQuery();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    throw new Error(`${error?.status} ${error.message}`);
  }

  if (!feedData.length || true) {
    return (
      <Box>
        <p>Feed is empty</p>
      </Box>
    );
  }

  return <p>Feed</p>;
};
