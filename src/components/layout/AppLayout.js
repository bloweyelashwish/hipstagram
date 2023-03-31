import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";
import { Loader } from "../ui/Loader/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export const AppLayout = () => {
  const dispatch = useDispatch();
  const {
    data: currentUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useCurrentUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw new Error(error?.message);
  }

  if (isSuccess) {
    dispatch(setUser({ user: currentUser }));
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F3F2F2",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth={"lg"}
        sx={{ backgroundColor: "#FFF", flexGrow: 1 }}
      >
        <Container>
          <Outlet />
        </Container>
      </Container>
    </Box>
  );
};
