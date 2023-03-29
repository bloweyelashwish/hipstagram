import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { setActiveRouteTitle } from "../../features/route/routeSlice";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { getUserByIdQuery } from "../../features/users/usersApiService";

export const User = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isOwnPage = useSelector(selectUser)?.id === params.id;
//  const user = getUserByIdQuery(params.username);

  useEffect(() => {
    dispatch(setActiveRouteTitle(params.username));
  }, [params, dispatch]);

  return (
    <Box>
      <Box display={"flex"}>
        <Avatar />
        <Box display={"flex"} flexDirection="column" alignItems={"center"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
