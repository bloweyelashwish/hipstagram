import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useCurrentUserQuery } from "../../features/auth/authApiService";
import { setUser } from "../../features/auth/authSlice";
import { Header } from "../header/Header";

export const AppLayout = () => {
  return (
    <Box>
      <Container maxWidth={"lg"}>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </Container>
    </Box>
  );
};
