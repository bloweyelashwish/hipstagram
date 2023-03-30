import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

export const CommentsList = ({ list }) => {
  return (
    <List>
      {list.map((item) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              src={item.owner.avatar}
              sx={{ width: "40px", height: "40px" }}
            />
          </ListItemAvatar>
          <ListItemText primary={item.owner.login} secondary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};
