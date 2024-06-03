import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableRow, TableCell, TableHeader } from './TableComponents';
import PopupDialog from '../PopupDialog';
import StatusFlag from '../StatusFlag';

const TablePagination = ({ columns, rows, toggleToEditModeFunc, CheckBoxChangeFunc }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const indexOfLastRow = (currentPage + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const [selectedItem, setSelectedItem] = useState(null);

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(rows.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to first page when rows per page changes
    };

    const removeColumns = (columns, rows, removeKeys) => {
        // Filter out the columns that are not in the removeKeys array
        const filteredColumns = columns.filter(column => !removeKeys.includes(column.key));
    
        // Remove the specified keys from each row
        const filteredRows = rows.map(row => {
            let newRow = {};
            for (let key in row) {
                if (!removeKeys.includes(key)) {
                    newRow[key] = row[key];
                }
            }
            return newRow;
        });
    
        return { filteredColumns, filteredRows };
    }

    const { filteredColumns, filteredRows } = removeColumns(columns, currentRows, ["passcode", "publishedAt", "createdAt"]);

    const ColumnName = (input) => {
        // Split the string by underscore or hyphen, then map each word
        return input
            .split(/[_-]/)
            .map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    const namedColumns = filteredColumns.map(column => {
        return {
            ...column,
            name: column.key === column.name ? ColumnName(column.key) : column.name
        }
    });
    
    const isColumnBoolean = (value) => {
        return value.startsWith("is_") || value.startsWith("has_");
    };
    
    const showRow = (row, column) => {
        if (isColumnBoolean(column.key)) {
            return (
                CheckBoxChangeFunc
                    ? <input type="checkbox" checked={row[column.key]} onChange={() => CheckBoxChangeFunc(row)} />
                    : <input type="checkbox" checked={row[column.key]} readOnly />
                );
            }
        switch (column.key) {
            case 'id':
                return row[column.key].toString();
            case 'created_at':
            case 'updated_at':
                return new Date(row[column.key]).toLocaleString();
            case 'description':
                return row[column.key].substring(0, 50) + '...';
            case 'address':
                return (
                    <a href="#" onClick={(e) => {e.preventDefault(); toggleToEditModeFunc(row['id']); }}>
                        {row[column.key]}
                    </a>
                );
            case 'transcript':
                return (
                    <a href="#" onClick={(e) => {e.preventDefault(); toggleToEditModeFunc(row['id']); }}>
                        transcript
                    </a>
                );
            case 'data': {
                const value = row[column.key];
                if (typeof value === 'object' && value !== null) {
                    return (
                        <div>
                            <button className="btn" onClick={() => setSelectedItem(row)}>data</button>
                            {selectedItem && selectedItem.id === row.id && (
                                <PopupDialog 
                                    show={true} 
                                    onClose={() => setSelectedItem(null)} 
                                    text={JSON.stringify(selectedItem[column.key], null, 4)}
                                />
                            )}
                        </div>
                    );
                }
                return JSON.stringify(row[column.key]);
            }
            case 'report_url':
                return (
                    <a href={row[column.key]} target="_blank" rel="noreferrer" >
                        {row[column.key]}
                    </a>
                );
            case 'color':
                return (
                    <StatusFlag color={row[column.key]} />
                );
            default:
                return row[column.key];
        }
    };

    const showColumn = (column) => {
        switch(column.key) {
            case 'created_at':
                return "Created";
            case 'updated_at':
                return "Updated";
            default:
                return column.name;
        }
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            {namedColumns.map((column) => (
                                <TableHeader key={column.key}>{showColumn(column)}</TableHeader>
                            ))}
                        </TableRow>
                    </thead>
                    <tbody>
                        {filteredRows.map((row) => (
                            <TableRow key={row.id}>
                                {namedColumns.map((column) => (
                                    <TableCell key={column.key}>
                                        {showRow(row, column)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
            <div style={{ margin: '10px' }}>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

TablePagination.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    toggleToEditModeFunc: PropTypes.func.isRequired,
    CheckBoxChangeFunc: PropTypes.func
};

TablePagination.defaultProps = {
    toggleToEditModeFunc: null,
    CheckBoxChangeFunc: null
}

export default TablePagination;
