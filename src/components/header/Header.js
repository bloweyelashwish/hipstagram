import { useCurrentUserQuery } from "../../features/auth/authApiService";

export const Header = () => {
  const currentUser = useCurrentUserQuery();
  console.log(currentUser);
};
