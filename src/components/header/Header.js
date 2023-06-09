import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectAuthLoadingState,
  selectUser,
} from "../../features/auth/authSlice";

import {
  Box,
  IconButton,
  Skeleton,
  Typography,
  Container,
  Paper,
  InputBase,
} from "@mui/material";
import {
  LogoutOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  selectCurrentSearchQuery,
  setQuery,
} from "../../features/search/searchSlice";
import { debounce } from "../../utils";
import { useCallback } from "react";
import { apiService } from "../../app/api/apiService";

export const Header = () => {
  const currentUser = useSelector(selectUser);
  const currentQuery = useSelector(selectCurrentSearchQuery);

  const navigate = useNavigate();
  const location = useLocation();
  const loadingState = useSelector(selectAuthLoadingState);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(apiService.util.resetApiState());
    dispatch(logout());
  };

  const searchHandler = ({ target }) => {
    dispatch(setQuery(target.value));
    if (!location.pathname.includes("search")) {
      navigate({
        pathname: "/search",
      });
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const debouncedSearchHandler = useCallback(debounce(searchHandler), []  );

  return (
    <Box
      component={"header"}
      sx={{
        backgroundColor: "#4D88ED",
        position: "sticky",
        zIndex: 5,
        top: 0,
      }}
    >
      <Container
        sx={{
          padding: "0.75rem 0",
          columnGap: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            placeholder={"Search users"}
            onClick={() => navigate({ pathname: "/search" })}
          >
            <SearchOutlined sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <InputBase
            placeholder={"Search users"}
            defaultValue={currentQuery}
            onChange={debouncedSearchHandler}
          />
        </Paper>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            flexGrow: 1,
            marginX: "auto",
          }}
        >
          <NavLink
            to={`/feed`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Hipstagram
          </NavLink>
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          rowGap={1}
          flexGrow={1}
          flexBasis={0}
        >
          <IconButton>
            {loadingState ? (
              <Skeleton variant="circular" fontSize="1.75rem" />
            ) : (
              <NavLink
                to={`/user/${currentUser?.id}` ?? ""}
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
      </Container>
    </Box>
  );
};
