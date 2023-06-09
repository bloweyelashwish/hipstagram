import { Container, Box } from "@mui/material";
import { EditUserPasswordForm } from "../../components/forms";
import { EditUserForm } from "../../components/forms/EditUserForm";

export const ProfileSettings = () => {
  return (
    <Container sx={{ paddingBlock: "80px" }} maxWidth={"xl"}>
      <Box sx={{ paddingBlock: "0 50px", borderBottom: "1px solid #D9D9D9" }}>
        <EditUserForm />
      </Box>
      <Box>
        <Box sx={{ paddingBlock: "50px 0" }}>
          <EditUserPasswordForm />
        </Box>
      </Box>
    </Container>
  );
};
