import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export const AppLayout = () => {
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
