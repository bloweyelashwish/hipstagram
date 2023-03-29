import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  logout,
  selectAuthLoadingState,
} from "../../features/auth/authSlice";

import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import { LogoutOutlined, PersonOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const loadingState = useSelector(selectAuthLoadingState);
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
        position: "sticky",
        zIndex: 5,
        top: 0,
      }}
    >
      <div>search input</div>
      <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>
        Hipstagram
      </Typography>
      <Box display={"flex"} alignItems={"center"} rowGap={1}>
        <IconButton>
          {loadingState ? (
            <Skeleton variant="circular" fontSize="1.75rem" />
          ) : (
            <NavLink
              to={`/user/${currentUser?.id}`}
              style={{ display: "flex" }}
            >
              <PersonOutlined sx={{ color: "#fff", fontSize: "2rem" }} />
            </NavLink>
          )}
        </IconButton>
        <IconButton onClick={logoutHandler}>
          <LogoutOutlined sx={{ color: "#fff", fontSize: "1.75rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
