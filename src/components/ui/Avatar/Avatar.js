import { Box } from "@mui/material";
import { AccountCircleRounded } from "@mui/icons-material";

export const Avatar = ({ src }) => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      {src ? <img src={src} alt={"Avatar"} /> : <AccountCircleRounded />}
    </Box>
  );
};
