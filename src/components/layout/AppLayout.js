import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};
