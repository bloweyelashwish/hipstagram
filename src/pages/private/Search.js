import { Box, ListItem, Typography, List } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useGetUsersByLoginQuery } from "../../features/users/usersApiSlice";
import errorImg from "../../assets/error.svg";

export const Search = () => {
  const location = useLocation();
  const { search } = location;
  const {
    data: searchedUsers,
    isError,
    error,
    isLoading,
  } = useGetUsersByLoginQuery(search.split("=")[1]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    throw new Error(`${error?.message}`);
  }

  if (!searchedUsers.length) {
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
          Users not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {searchedUsers.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/user/${user._id}`}>{user.login}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
