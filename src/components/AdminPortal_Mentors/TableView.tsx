import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export interface TableComponentProps {
  heading: any[];
  body: any[];
}
const TableComponent: React.FC<TableComponentProps> = ({ heading, body }) => {
  const TblHead = () => {
    return (
      <TableHead>
        <TableRow>
          {heading.map((element, index: number) => (
            <TableCell key={index} align="center">
              {" "}
              {element}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TblBody = () => {
    return (
      <TableBody>
        {body.map(({ id, items }) => (
          <TableRow key={id}>
            <TableCell align="center" onClick={() => handleClick(id)}>
              {" "}
              {id}
            </TableCell>
            {items.map((item: any, index: number) => (
              <TableCell
                key={`${id}-${index}`}
                align="center"
                onClick={() => handleClick(id)}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const handleClick = (e: number) => {
    //routeTo(Paths.adminViewMenteeProfileGoals);
  };

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table" className="table">
        <TblHead />
        <TblBody />
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
