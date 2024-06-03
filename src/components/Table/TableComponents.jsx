import styled from 'styled-components';

const TableContainer = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ffffff;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  background-color: #666666;
  color: #ffffff;
`;

export { TableContainer, Table, TableRow, TableCell, TableHeader }
