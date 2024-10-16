import { Button } from "@mui/material";
import { Layout } from "../../components";
import MembersList from "./MembersList";
import { useState } from "react";
import { AddNew } from "./components";
import { createPortal } from "react-dom";

export const Members = () => {
  const [showAddNew, setShowAddNew] = useState(false);

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
      <MembersList />
      {showAddNew &&
        createPortal(
          <AddNew onClose={() => setShowAddNew(false)} />,
          document.body
        )}
    </Layout>
  );
};
