import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  logout,
  selectAuthLoadingState,
} from "../../features/auth/authSlice";

import { Box, IconButton, Typography } from "@mui/material";
import { LogoutOutlined, PersonOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { selectActiveRouteTitle } from "../../features/route/routeSlice";

export const Header = () => {
  const loadingState = useSelector(selectAuthLoadingState);
  const currentUser = useSelector(selectUser);
  const activeRoute = useSelector(selectActiveRouteTitle);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (loadingState) {
    return null;
  }

  console.log(currentUser);

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
      <Typography>{activeRoute}</Typography>
      <Box display={"flex"} alignItems={"center"} rowGap={1}>
        <IconButton>
          <NavLink
            to={`/user/${currentUser?.login}`}
            style={{ display: "flex" }}
          >
            <PersonOutlined sx={{ color: "#fff", fontSize: "2rem" }} />
          </NavLink>
        </IconButton>
        <IconButton onClick={logoutHandler}>
          <LogoutOutlined sx={{ color: "#fff", fontSize: "1.75rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
