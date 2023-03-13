import { Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import fetchUsers from "./api";
import UsersGrid from "./UsersGrid";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setUsersCopy(fetchedUsers);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchText) {
      setUsersCopy(users);
    } else {
      const filteredUsers = users.filter((user) => {
        const jointText = (
          user.name +
          user.email +
          user.role
        ).toLocaleLowerCase();

        if (jointText.includes(searchText.toLocaleLowerCase())) {
          return user;
        }
        return null;
      });

      setUsersCopy(filteredUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Stack sx={{ margin: 2 }}>
      <TextField
        size="small"
        placeholder="Search by name, email or role"
        value={searchText}
        onChange={(e) => handleInput(e)}
      />
      <UsersGrid
        users={users}
        setUsers={setUsers}
        usersCopy={usersCopy}
        setUsersCopy={setUsersCopy}
      />
    </Stack>
  );
};

export default AdminPage;
