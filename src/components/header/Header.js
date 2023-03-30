import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout, selectAuthLoadingState } from "../../features/auth/authSlice";

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
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";
import { Loader } from "../ui/Loader/Loader";

export const Header = () => {
  const {
    data: currentUser,
    isLoading,
    isError,
    error,
  } = useCurrentUserQuery();
  const location = useLocation();
  const [currentQuery, setCurrentQuery] = useState("");
  const navigate = useNavigate();
  const loadingState = useSelector(selectAuthLoadingState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.includes("search")) {
      setCurrentQuery(location.search.split("=")[1]);
    }
  }, [location]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <Loader />;
  }

  function handleSearchSubmit() {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        users: currentQuery.toLowerCase(),
      }).toString(),
    });
  }

  const searchHandler = ({ target }) => {
    setCurrentQuery(target.value);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

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
            onClick={handleSearchSubmit}
          >
            <SearchOutlined sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <InputBase
            placeholder={"Search users"}
            value={currentQuery}
            onChange={searchHandler}
            onKeyDown={keyDownHandler}
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
