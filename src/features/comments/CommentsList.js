import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import { useDeleteCommentByIdMutation } from "./commentsApiSlice";
import { Link } from "react-router-dom";

const Comment = ({ comment, onChange }) => {
  const currentUser = useSelector(selectUser);
  const isOwnComment = currentUser.id === comment.owner.id;
  const [deleteComment] = useDeleteCommentByIdMutation();

  const commentRemovalHandler = async () => {
    const r = await deleteComment(comment.id);
    if (r.error) {
      toast.error("Unable to delete comment. Try again later.");
    } else {
      onChange();
    }
  };

  const commentActions = () => {
    if (isOwnComment) {
      return (
        <Box display={"flex"} alignItems={"center"}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={commentRemovalHandler}>
            <DeleteForever />
          </IconButton>
        </Box>
      );
    } else {
      return (
        <IconButton onClick={commentRemovalHandler}>
          <DeleteForever />
        </IconButton>
      );
    }
  };

  return (
    <ListItem
      alignItems="flex-start"
      key={`${comment.id}-${comment.owner.id}`}
      secondaryAction={commentActions()}
    >
      <Link to={`/user/${comment.owner.id}`}>
        <ListItemAvatar>
          <Avatar
            src={comment.owner.avatar}
            sx={{ width: "40px", height: "40px" }}
          />
        </ListItemAvatar>
      </Link>

      <ListItemText primary={comment.owner.login} secondary={comment.text} />
    </ListItem>
  );
};

export const CommentsList = ({ list, onChange }) => {
  return (
    <List>
      {list.map((item) => (
        <Comment comment={item} onChange={onChange} />
      ))}
    </List>
  );
};
