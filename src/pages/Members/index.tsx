import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Layout } from "../../components";
import MembersList from "./MembersList";
import { useState } from "react";
import { AddNew } from "./components";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@mui/icons-material";

export const Members = () => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Layout
      headerTitle="Members"
      HeaderEndNode={
        <Button
          title="Add new"
          onClick={() => setShowAddNew(true)}
          variant="contained"
        >
          Add new
        </Button>
      }
    >
      <div className={styles.members_content_container}>
        <OutlinedInput
          placeholder="Search"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="searchIcon" edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <MembersList searchValue={searchValue} />
        {showAddNew &&
          createPortal(
            <AddNew onClose={() => setShowAddNew(false)} />,
            document.body
          )}
      </div>
    </Layout>
  );
};
