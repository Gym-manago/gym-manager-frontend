import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./styels.module.scss";

type Headers = {
  id: "name" | "mobile_num" | "gender" | "age" | "membership_type";
  label: string;
}[];

type Rows = {
  name: string;
  mobile_num: string;
  gender: string;
  age: string;
  membership_type: "Gym" | "Swimming Pool";
}[];

const HEADERS_DATA: Headers = [
  { id: "name", label: "Name" },
  { id: "mobile_num", label: "Mobile number" },
  { id: "gender", label: "Gender" },
  { id: "age", label: "Age" },
  { id: "membership_type", label: "Membership Type" },
];

const ROWS: Rows = [
  {
    name: "Sameer",
    mobile_num: "123123123123",
    gender: "Male",
    age: "21",
    membership_type: "Gym",
  },
  {
    name: "Sameer",
    mobile_num: "123123123123",
    gender: "Male",
    age: "21",
    membership_type: "Gym",
  },
  {
    name: "Sameer",
    mobile_num: "123123123123",
    gender: "Male",
    age: "21",
    membership_type: "Gym",
  },
];

const MembersList = () => {
  return (
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
          {ROWS.map((row, index) => (
            <TableRow
              className={index % 2 ? styles.row_white : styles.row_dark}
            >
              {HEADERS_DATA.map(({ id }) => (
                <TableCell key={id}>{row[id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MembersList;
