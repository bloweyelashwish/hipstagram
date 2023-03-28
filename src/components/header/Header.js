import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/auth/authSlice";

import { Box, IconButton } from "@mui/material";
import { LogoutOutlined, PersonOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Header = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box
      component={"header"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"0.75rem"}
      sx={{
        backgroundColor: "#4D88ED",
      }}
    >
      <div>search input</div>
      <Box display={"flex"} alignItems={"center"} rowGap={1}>
        <Link to={"/profile"}>
          <IconButton>
            <PersonOutlined sx={{ color: "#fff", fontSize: "2rem" }} />
          </IconButton>
        </Link>
        <IconButton onClick={logoutHandler}>
          <LogoutOutlined sx={{ color: "#fff", fontSize: "1.75rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
