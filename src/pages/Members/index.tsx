import { Button } from '@mui/material';
import { Layout } from '../../components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AddNew } from './components';
import { Outlet, useParams } from 'react-router-dom';
import MembersDetails from './MembersDetails';
import MembersList from './MembersList';

export const Members = () => {
  const [showAddNew, setShowAddNew] = useState(false);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch('http://localhost:8000/health_check', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0Mjk0NzIwNn0.n3Ff6VP76_orL4Xe13kyDER3yYg6TWA-ciDHWKIQJA8`,
      },
    }).then((data) => console.log(data));
  }, []);

  return (
    <Layout
      headerTitles={['Members', id]}
      {...(!id && {
        HeaderEndNode: (
          <Button
            title='Add new'
            onClick={() => setShowAddNew(true)}
            variant='contained'
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
