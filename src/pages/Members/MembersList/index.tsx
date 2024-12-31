import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./styels.module.scss";
import { useUser } from "../../../contexts/Users";

type Headers = {
  id: "name" | "mobile_num" | "gender" | "age" | "membership_type";
  label: string;
}[];

type Rows = {
  name: string;
  mobile_num: string;
  gender: "Male" | "Female" | "Others";
  age: string;
  membership_type: string;
}[];

const HEADERS_DATA: Headers = [
  { id: "name", label: "Name" },
  { id: "mobile_num", label: "Mobile number" },
  { id: "gender", label: "Gender" },
  { id: "age", label: "Age" },
  { id: "membership_type", label: "Membership Type" },
];

const MembersList = () => {
  const users = useUser();
  const ROWS: Rows = users.map(
    ({ firstName, lastName, phoneNumber, gender, age, membershipType }) => ({
      name: firstName + lastName,
      mobile_num: phoneNumber,
      gender,
      age: age?.toString(),
      membership_type: membershipType.join(" "),
    })
  );
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
  );
};

export default MembersList;
