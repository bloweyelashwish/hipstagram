import { useForm } from "react-hook-form";
import { Container, Avatar, Button, TextField, Box } from "@mui/material";
import { EditUserForm } from "../../components/forms/EditUserForm";
import { useCurrentUserQuery } from "../../features/users/usersApiSlice";

export const ProfileSettings = () => {
  return (
    <Container sx={{ paddingBlock: "80px" }} maxWidth={"xl"}>
      <Box sx={{ paddingBlock: "0 50px", borderBottom: "1px solid #D9D9D9" }}>
        <EditUserForm />
      </Box>
      <Box>
        <Box
          sx={{ paddingBlock: "50px 0" }}
          component={"form"}
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"32px"}
        >
          <TextField fullWidth />
          <TextField fullWidth />
        </Box>
      </Box>
    </Container>
  );
};
