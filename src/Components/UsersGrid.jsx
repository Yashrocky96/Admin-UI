import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";

import { useState, useEffect } from "react";
import { UserRecord } from "./UserRecord";

const UsersGrid = ({ users, setUsers, usersCopy, setUsersCopy }) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  let recordsPerPage = 10;

  const sliceRecordsForPage = (arr) => {
    return arr.slice((page - 1) * recordsPerPage, page * recordsPerPage);
  };

  useEffect(() => {
    setUsersCopy(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    setPageCount(Math.ceil(usersCopy.length / recordsPerPage));
    setCurrentPageRecords(sliceRecordsForPage(usersCopy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersCopy]);

  useEffect(() => {
    setCurrentPageRecords(sliceRecordsForPage(usersCopy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = (ids) => {
    const remainingUsers = users.filter((user) => !ids.includes(user.id));

    setUsers(remainingUsers);
  };

  const handleChange = (e, value) => {
    setPage(value);
  };

  const handleCheckbox = (e, userId) => {
    if (e.target.checked && userId === "ALL") {
      const currentPageIds = currentPageRecords.map((user) => user.id);

      setSelectedUsers(() => [...selectedUsers, ...currentPageIds, userId]);
    } else if (!e.target.checked && userId === "ALL") {
      setSelectedUsers(() => []);
    } else if (e.target.checked) {
      setSelectedUsers(() => [...selectedUsers, userId]);
    } else {
      setSelectedUsers(() => selectedUsers.filter((user) => user !== userId));
    }
  };

  const handleUpdate = (e, user, setIsEditing) => {
    e.preventDefault();

    const updatedUsers = users.map((existing) =>
      existing.id === user.id ? user : existing
    );

    setUsers(updatedUsers);
    setIsEditing(false);
  };

  return (
    <>
      <Grid sx={{ margin: 0.5 }} container spacing={2}>
        <Grid item xs={1}>
          <Checkbox
            checked={selectedUsers.includes("ALL")}
            onChange={(e) => handleCheckbox(e, "ALL")}
          />
        </Grid>
        <Grid item xs={3} fontWeight="700">
          Name
        </Grid>
        <Grid item xs={4} fontWeight="700">
          Email
        </Grid>
        <Grid item xs={2} fontWeight="700">
          Role
        </Grid>
        <Grid item xs={2} fontWeight="700">
          Actions
        </Grid>
        <Divider sx={{ width: "100%" }} />

        {currentPageRecords?.length > 0
          ? currentPageRecords.map((user) => {
              return (
                <UserRecord
                  key={user.id}
                  user={user}
                  selectedUsers={selectedUsers}
                  handleCheckbox={handleCheckbox}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              );
            })
          : "No Users Found"}
      </Grid>

      <Stack sx={{ margin: 1 }} direction="row" alignItems="center">
        <Button
          variant="contained"
          onClick={() => {
            handleDelete(selectedUsers);
            setSelectedUsers([]);
          }}
        >
          Delete Selected
        </Button>
        <Pagination
          sx={{ marginLeft: 25 }}
          count={pageCount}
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default UsersGrid;
