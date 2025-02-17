import {Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"


export default function GenericTable({columns,data}:{columns:{field:string,label:string}[],data:{id:string,[key:string]:string}[]}): JSX.Element {
  
  return (
    <TableContainer component={Paper}>
    <Table size="small">
      <TableHead sx={{backgroundColor: "var(--color-primary-main)"}}>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{color:"white"}} key={column.field}>{column.label}</TableCell>
            ))}
          </TableRow>
      </TableHead>
        <TableBody>
            {data.map((row,index) => (
                <TableRow key={index} >
                {columns.map((column) => (
                    <TableCell key={row[column.field]+index}>{row[column.field]}</TableCell>
                ))}
                </TableRow>
            ))}
        </TableBody>

    </Table>
    </TableContainer>
  )
}
