import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { setActiveRouteTitle } from "../../features/route/routeSlice";

import { Box } from "@mui/material";

export const User = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isOwnPage = useSelector(selectUser)?.login === params.username;

  useEffect(() => {
    dispatch(setActiveRouteTitle(params.username));
  }, [params, dispatch]);

  return (
    <Box>
      <p>{isOwnPage.toString()}</p>
    </Box>
  );
};
