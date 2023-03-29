import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetFeedQuery } from "../../features/posts/postsApiSlice";

export const Feed = () => {
  const { data, isError, isLoading, error } = useGetFeedQuery();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    throw new Error(`${error?.status} ${error.message}`);
  }

  console.log(data);

  return <p>Feed</p>;
};
