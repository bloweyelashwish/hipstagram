import { Outlet } from "react-router-dom";
import { Container, Box, TextField, Button, Grid } from "@mui/material";
import authBg from "../../../assets/bg.svg";

export const AuthenticationLayout = ({ children }) => {
  return (
    <Container component={"main"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundSize: "100%",
            transform: "translateX(-60%)",
            backgroundImage: `url(${authBg})`,
          }}
        ></Box>
        <Box flexGrow={1} flexShrink={0}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};
