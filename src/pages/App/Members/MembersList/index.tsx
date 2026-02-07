import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import styles from './styels.module.scss';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllMembers } from '../api';
import { useAsync } from 'react-use';
import getAge from '~/utils/getAge';

type Headers = {
  id: 'name' | 'phoneNumber' | 'gender' | 'age' | 'membershipType';
  label: string;
}[];

type Rows = {
  id: string;
  name: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Others';
  age: number;
  membershipType: string;
}[];

const HEADERS_DATA: Headers = [
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Mobile number' },
  { id: 'gender', label: 'Gender' },
  { id: 'age', label: 'Age' },
  { id: 'membershipType', label: 'Membership Type' },
];

const MembersList = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const { value, error, loading } = useAsync(getAllMembers);

  const ROWS: Rows | undefined = value?.map(
    ({
      id,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      membershipType,
    }) => ({
      id,
      name: firstName + ' ' + lastName,
      phoneNumber,
      gender,
      age: getAge(dateOfBirth),
      membershipType,
    })
  );
  const [rows, setRows] = useState<Rows | undefined>(ROWS);

  const [timeCtx, setTimeCtx] = useState<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeCtx) clearTimeout(timeCtx);
    if (searchValue !== undefined)
      setTimeCtx(
        setTimeout(
          () =>
            setRows(
              !!searchValue
                ? ROWS?.filter((row) =>
                    row.name
                      .toLowerCase()
                      .includes(searchValue.trim().toLowerCase())
                  ) || []
                : ROWS
            ),
          500
        )
      );
  }, [searchValue]);

  useEffect(() => {
    setRows(ROWS);
  }, [value]);

  return (
    <div className={styles.members_content_container}>
      <OutlinedInput
        placeholder='Search'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton aria-label='searchIcon' edge='end'>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <TableContainer className={styles.table_header}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {HEADERS_DATA.map(({ id, label }) => (
                <TableCell key={id}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`${row.id}`)}
                className={index % 2 ? styles.row_white : styles.row_dark}
                key={row.id}
              >
                {HEADERS_DATA.map(({ id }) => (
                  <TableCell key={id}>{row[id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MembersList;
