import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Edit, DeleteForever, Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import {
  useDeleteCommentByIdMutation,
  useEditCommentByIdMutation,
} from "./commentsApiSlice";
import { nanoid } from "@reduxjs/toolkit";

const Comment = ({ comment, onChange, onNavigate }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [deleteComment, { isLoading }] = useDeleteCommentByIdMutation();
  const [editComment] = useEditCommentByIdMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const isOwnComment = currentUser.id === comment.owner.id;

  const commentRemovalHandler = async () => {
    const r = await deleteComment(comment.id);
    if (r.error) {
      toast.error("Unable to delete comment. Try again later.");
    } else {
      onChange();
    }
  };

  const commentEditHandler = () => {
    setIsBeingEdited(true);
  };

  const updateCommentHandler = async (data) => {
    const r = await editComment(comment.id, data);

    if (r.error) {
      toast.error("Unable to edit comment. Try again later.");
    } else {
      onChange();
    }

    setIsBeingEdited(false);
  };

  const handleAvatarClick = () => {
    onNavigate();
    navigate({ pathname: `/user/${comment.owner.id}` })
  }

  const commentActions = () => {
    if (isOwnComment) {
      return (
        <Box display={"flex"} alignItems={"center"}>
          {isBeingEdited ? (
            <Box
              component={"form"}
              onSubmit={handleSubmit(updateCommentHandler)}
            >
              <Button type={"submit"}>Save</Button>
              <IconButton onClick={() => setIsBeingEdited(false)}>
                <Cancel />
              </IconButton>
            </Box>
          ) : (
            <>
              <IconButton onClick={commentEditHandler} disabled={isLoading}>
                <Edit />
              </IconButton>
              <IconButton onClick={commentRemovalHandler} disabled={isLoading}>
                <DeleteForever />
              </IconButton>
            </>
          )}
        </Box>
      );
    }
  };

  return (
    <ListItem
      alignItems="center"
      key={`${comment.id}-${comment.owner.id}`}
      secondaryAction={commentActions()}
    >
      <ListItemAvatar
        onClick={handleAvatarClick}
        sx={{ width: "50px", height: "50px", cursor: 'pointer' }}
      >
        <Avatar src={comment.owner.avatar} />
      </ListItemAvatar>
      <Box>
        <Typography fontWeight={600}>{comment.owner.login}</Typography>
        {isBeingEdited ? (
          <TextField
            {...register("text", { minLength: 1, maxLength: 20 })}
            defaultValue={comment.text}
            autoFocus
            error={!!errors?.text}
            helperText={errors?.text?.message}
            sx={{ padding: 0, maxWidth: "50ch" }}
          />
        ) : (
          <Typography>{comment.text}</Typography>
        )}
      </Box>
    </ListItem>
  );
};

export const CommentsList = ({ list, onChange, onNavigate }) => {
  return (
    <List>
      {list.map((item) => (
        <Comment comment={item} onChange={onChange} key={nanoid()} onNavigate={onNavigate} />
      ))}
    </List>
  );
};
