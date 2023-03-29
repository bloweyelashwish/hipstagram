import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../../features/users/usersApiService";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export const AppLayout = () => {
  return (
    <Box sx={{ backgroundColor: "#F3F2F2", minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth={"lg"}
        sx={{ backgroundColor: "#FFF", height: "100vh" }}
      >
        <Container>
          <Outlet />
        </Container>
      </Container>
    </Box>
  );
};
