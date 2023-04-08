import { Box, ListItem, Typography, List } from "@mui/material";
import { useGetUsersByLoginQuery } from "../../features/users/usersApiSlice";
import errorImg from "../../assets/error.svg";
import { Loader } from "../../components/ui/Loader/Loader";
import { MinifiedUser } from "../../features/users/MinifiedUser";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { selectCurrentSearchQuery } from "../../features/search/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const currentQuery = useSelector(selectCurrentSearchQuery);

  const {
    data: searchedUsers,
    isError,
    error,
    isLoading,
  } = useGetUsersByLoginQuery(currentQuery.trim().toLowerCase());

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error(error.message);
    if (error.originalStatus.toString().startsWith("4")) {
      dispatch(logout());
    }
    return null;
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
            <MinifiedUser {...user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
