import { Box, IconButton, Dialog, TextField, Button } from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadPostMutation } from "./postsApiSlice";
import { toast } from "react-toastify";

export const PostUpload = ({ onUpload, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadPost] = useUploadPostMutation();

  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", ({ target }) => {
      setIsActive(true);
      setImage(target.result);
      setImageFile(file);
    });
  }

  const postUploadHandler = ({ target }) => {
    const { files } = target;
    handleFileUpload(files[0]);
  };

  async function onSubmit(data) {
    const DTO = new FormData();
    DTO.set("title", data.title);
    DTO.set("image", imageFile);

    const r = await uploadPost(DTO);

    if (r.error) {
      toast.error(r.error.data);
    } else {
      onUpload();
    }
    setIsActive((prev) => !prev);
  }

  return (
    <Box>
      <IconButton size={"large"} component="label">
        <input
          type="file"
          hidden
          onChange={postUploadHandler}
          accept="image/*"
        />
        <CameraAltOutlined sx={{ fontSize: "2rem" }} {...props} />
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
