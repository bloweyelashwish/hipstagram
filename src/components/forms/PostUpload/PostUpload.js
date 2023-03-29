import { Box, IconButton, Dialog, TextField, Button } from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const PostUpload = () => {
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");

  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", ({ target }) => {
      setIsActive(true);
      setImage(target.result);
    });
  }

  const postUploadHandler = ({ target }) => {
    const { files } = target;
    handleFileUpload(files[0]);
  };

  function onSubmit(data) {
    const { image: imageList, title } = data;
    const parsedData = {
      image: imageList[0],
      title,
    };
  }

  return (
    <Box mt={"20px"}>
      <IconButton size="large" component="label">
        <input
          {...register("image")}
          type="file"
          hidden
          onChange={postUploadHandler}
          accept="image/*"
        />
        <CameraAltOutlined sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Dialog open={isActive} onClose={() => setIsActive(false)}>
        <Box
          padding={"30px"}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box flexShrink={0}>
            <img
              src={image}
              alt="new post"
              style={{ objectFit: "cover", height: "450px", width: "450px" }}
            />
          </Box>
          <Box
            flexGrow={1}
            component="form"
            mt={2}
            width={"100%"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("title", { required: true })}
              label={"Add title to your post"}
              multiline
              fullWidth
            />
            <Button type={"submit"}>Create post</Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};
