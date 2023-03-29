import { Box } from "@mui/material";
import { AccountCircleRounded } from "@mui/icons-material";

export const Avatar = ({ src, ...props }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      {...props}
    >
      {!!src ? (
        <img src={src} alt={"Avatar"} />
      ) : (
        <AccountCircleRounded sx={{ height: "100%", width: "100%" }} />
      )}
    </Box>
  );
};
