import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveRouteTitle } from "../../features/route/routeSlice";

export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveRouteTitle("Feed"));
  });
};
