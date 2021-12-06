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
  handleRowSelection: (selectionID: number) => void;
}
const TableComponent: React.FC<TableComponentProps> = ({
  heading,
  body,
  handleRowSelection
}) => {
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
            <TableCell align="center" onClick={() => handleRowSelection(id)}>
              {" "}
              {id}
            </TableCell>
            {items.map((item: any, index: number) => (
              <TableCell
                key={`${id}-${index}`}
                align="center"
                onClick={() => handleRowSelection(id)}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="simple table" className="table">
        <TblHead />
        <TblBody />
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
