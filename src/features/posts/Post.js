import { useState } from "react";
import { useGetPostByIdQuery } from "./postsApiSlice";

import { Box, Dialog } from "@mui/material";

export const Post = ({ _id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetPostByIdQuery(_id);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const { imgUrl, title } = data;

  return (
    <Box>
      <Box
        sx={{
          aspectRatio: "1",
          cursor: "pointer",
          transition: "all 150ms ease",
          "&:hover": { filter: "blur(2px)", cursor: "zoom-in" },
        }}
      >
        <img
          src={imgUrl}
          alt={title}
          style={{
            maxWidth: "100%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
};
