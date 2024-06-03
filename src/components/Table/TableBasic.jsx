import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableRow, TableCell, TableHeader } from './TableComponents';

class basicTable {

    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
    }

    showRow(row, column) {
        if (column.key === 'url')
            return (
                <a href={row[column.key]} target="_blank" rel="noopener noreferrer">
                    article
                </a>
            );
        else 
            return (row[column.key])
    }

    Run() {
        // use react-table to display columns and rows
        return (
            <div>
                <h1>News</h1>
                <TableContainer>
                    <Table>
                    <thead>
                        <TableRow>
                            { this.columns.map((column) => (
                                <TableHeader key={column.key}>{column.name}</TableHeader>
                            ))}
                        </TableRow>
                    </thead>
                    <tbody>
                        {this.rows.map((row) => (
                        <TableRow key={row.news_on}>
                            {this.columns.map((column) => (
                            <TableCell key={column.key}>
                                { this.showRow(row, column) }
                            </TableCell>
                            ))}
                        </TableRow>
                        ))}
                    </tbody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

TableBasic.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
}

export default function TableBasic({columns, rows}) {
    const news = new basicTable(columns, rows);
    return <> { news.Run() } </>;
}
                