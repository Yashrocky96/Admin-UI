import React from "react";
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  MenuItem, Select, TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

export const UserRecord = ({
  user, selectedUsers, handleCheckbox, handleDelete, handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const { id, name, email, role } = user;

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  return (
    <>
      <Grid item xs={1}>
        <Checkbox
          checked={selectedUsers.includes(id)}
          onChange={(e) => handleCheckbox(e, id)} />
      </Grid>
      {isEditing ? (
        <>
          <Grid item xs={3}>
            <form onSubmit={(e) => handleUpdate(e, editingUser, setIsEditing)}>
              <TextField
                name="name"
                value={editingUser.name}
                onChange={handleEditInput} />
            </form>
          </Grid>
          <Grid item xs={4}>
            <form onSubmit={(e) => handleUpdate(e, editingUser, setIsEditing)}>
              <TextField
                name="email"
                value={editingUser.email}
                onChange={handleEditInput} />
            </form>
          </Grid>
          <Grid item xs={2}>
            <form onSubmit={(e) => handleUpdate(e, editingUser, setIsEditing)}>
              <Select
                name="role"
                value={editingUser.role}
                label="Authority"
                onChange={handleEditInput}
              >
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </form>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={3}>
            {name}
          </Grid>
          <Grid item xs={4}>
            {email}
          </Grid>
          <Grid item xs={2}>
            {role}
          </Grid>
        </>
      )}
      <Grid item xs={2}>
        <IconButton aria-label="edit">
          {isEditing ? (
            <SaveIcon
              onClick={(e) => {
                handleUpdate(e, editingUser, setIsEditing);
              }} />
          ) : (
            <EditIcon onClick={() => setIsEditing(true)} />
          )}
        </IconButton>

        <IconButton aria-label="delete" onClick={() => handleDelete([id])}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Divider sx={{ width: "100%" }} />
    </>
  );
};
