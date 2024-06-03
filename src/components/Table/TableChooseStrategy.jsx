import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableRow, TableCell, TableHeader } from './TableComponents';
import MyCheckbox from '../Checkbox/MyCheckbox';
import VideoModal from '../VideoModal';

class basicTable {

    constructor(columns, rows, onCheckboxChange) {
        this.columns = columns;
        this.rows = rows;
        this.onCheckboxChange = onCheckboxChange;
    }

    showRow(row, column) {
        switch (column.key) {
            case 'checked':
                return (
                    <MyCheckbox
                        id={row['strategy']}
                        checked={row[column.key]}
                        onCheckboxChange={this.onCheckboxChange}
                    />
                );
            case 'url':
                return (
                    <a href={row[column.key]} target="_blank" rel="noopener noreferrer">
                        article
                    </a>
                );
            case 'video':
                return (
                    <VideoModal videoId={row[column.key]} title={'watch video'} />
                );
            default:
                return (row[column.key]);
        }
    }

    Run() {
        // use react-table to display columns and rows
        return (
            <div>
                <h1>Strategies</h1>
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

TableChooseStrategies.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    onCheckboxChange: PropTypes.func
}

TableChooseStrategies.defaultProps = {
    onCheckboxChange: () => {}
}

export default function TableChooseStrategies({columns, rows, onCheckboxChange}) {
    const news = new basicTable(columns, rows, onCheckboxChange);
    return <> { news.Run() } </>;
}
                