import { Container, Box, Typography, Paper } from "@mui/material";
import authBg from "../../assets/bg.svg";
import logo from "../../assets/logo.png";

export const AuthLayout = ({ children }) => {
  return (
    <Container
      component={"main"}
      maxWidth={false}
      sx={{ minHeight: "100vh", padding: 0 }}
    >
      <Box display={"flex"}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            left: 0,
            top: 0,
            maxWidth: "550px",
            transform: "translateX(-20%)",
          }}
        >
          <img
            src={authBg}
            alt="Hipstagram"
            style={{
              display: "block",
              maxWidth: "100%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box flexShrink={0} paddingY={"5rem"} paddingX={"2rem"} flexGrow={1}>
          <Box minHeight={"100%"} display={"flex"} flexDirection={"column"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              columnGap={"10px"}
            >
              <img
                src={logo}
                alt="Logo"
                display={"block"}
                style={{ height: "100px", width: "100px" }}
              />
              <Typography
                component={"h1"}
                variant="h1"
                sx={{
                  display: "flex",
                  alignItem: "center",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Hipstagram
              </Typography>
            </Box>
            <Box
              marginTop={"2rem"}
              maxWidth={"400px"}
              width={"100%"}
              alignSelf={"center"}
              flexGrow={1}
              display={"flex"}
              flexDirection={"column"}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
