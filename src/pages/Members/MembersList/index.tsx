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
import { useUser } from '../../../contexts/Users';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type Headers = {
  id: 'name' | 'mobile_num' | 'gender' | 'age' | 'membership_type';
  label: string;
}[];

type Rows = {
  name: string;
  mobile_num: string;
  gender: 'Male' | 'Female' | 'Others';
  age: string;
  membership_type: string;
}[];

const HEADERS_DATA: Headers = [
  { id: 'name', label: 'Name' },
  { id: 'mobile_num', label: 'Mobile number' },
  { id: 'gender', label: 'Gender' },
  { id: 'age', label: 'Age' },
  { id: 'membership_type', label: 'Membership Type' },
];

const MembersList = () => {
  const users = useUser();
  const [searchValue, setSearchValue] = useState('');
  const ROWS: Rows = users.map(
    ({ firstName, lastName, phoneNumber, gender, age, membershipType }) => ({
      name: firstName + ' ' + lastName,
      mobile_num: phoneNumber,
      gender,
      age: age?.toString(),
      membership_type: membershipType.join(' '),
    })
  );
  const [rows, setRows] = useState<Rows>(ROWS);

  const [timeCtx, setTimeCtx] = useState<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      if (timeCtx) clearTimeout(timeCtx);
      setTimeCtx(
        setTimeout(
          () =>
            setRows(
              ROWS.filter((row) =>
                row.name
                  .toLowerCase()
                  .includes(searchValue.trim().toLowerCase())
              ) || []
            ),
          500
        )
      );
    }
  }, [searchValue]);

  useEffect(() => {
    setRows(ROWS);
    console.log('hit');
  }, [users]);

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
            {rows.map((row, index) => (
              <TableRow
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`${row.mobile_num}`)}
                className={index % 2 ? styles.row_white : styles.row_dark}
                key={row.mobile_num}
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
