import { Button } from "@mui/material";
import { Layout } from "../../components";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AddNew } from "./components";
import { Outlet, useParams } from "react-router-dom";
import MembersDetails from "./MembersDetails";
import MembersList from "./MembersList";

export const Members = () => {
  const [showAddNew, setShowAddNew] = useState(false);
  const { id } = useParams();

  console.log(id);

  return (
    <Layout
      headerTitles={["Members", id]}
      {...(!id && {
        HeaderEndNode: (
          <Button
            title="Add new"
            onClick={() => setShowAddNew(true)}
            variant="contained"
          >
            Add new
          </Button>
        ),
      })}
    >
      <Outlet />
      {showAddNew &&
        createPortal(
          <AddNew onClose={() => setShowAddNew(false)} />,
          document.body
        )}
    </Layout>
  );
};

export { MembersDetails, MembersList };
