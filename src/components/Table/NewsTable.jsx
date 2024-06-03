import React from 'react';
import PropTypes from 'prop-types';
import TableBasic from './TableBasic';
import * as Sentry from "@sentry/react";

class newsDisplay {

  constructor(result) {
      this.columns = this.getColumns();
      this.rows = this.cleanup(result);
  }

  cleanup(result) {
    const rows = result.data.data;
    const results = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const row of rows) {
        try {
            const item = {
                news_on: row.attributes.created_at,
                symbols: row.attributes.symbols.toString(),
                summary: row.attributes.headline + ' - ' + row.attributes.summary,
                sentiment: row.attributes.sentiment === undefined ? 0 : row.attributes.sentiment,
                url: row.attributes.url,
            };
            results.push(item);
        } catch (e) {
          Sentry.captureException(e);
          console.log('error: ', e, '  ', row);
        }
    }
    return results;
  }
  
  getColumns() {
    const columns = [
        { key: 'news_on', name: 'Time' },
        { key: 'symbols', name: 'Symbols' },
        { key: 'summary', name: 'News' },
        { key: 'sentiment', name: 'Sentiment' },
        { key: 'url', name: 'Article' }
        ];
    return columns;
  }

  Run() {
    return <TableBasic columns={this.columns} rows={this.rows} />;
    // use react-table to display columns and rows
    // return (
    //   <div>
    //     <h1>News</h1>
    //     <TableContainer>
    //       <Table>
    //         <thead>
    //           <TableRow>
    //             {this.columns.map((column) => (
    //               <TableHeader key={column.key}>{column.name}</TableHeader>
    //             ))}
    //           </TableRow>
    //         </thead>
    //         <tbody>
    //           {this.rows.map((row) => (
    //             <TableRow key={row.news_on}>
    //               {this.columns.map((column) => (
    //                 <TableCell key={column.key}>
    //                   {column.key === 'url' ? (
    //                     <a href={row[column
    //                       .key]} target="_blank" rel="noopener noreferrer">
    //                       article
    //                     </a>
    //                   ) : (
    //                     row[column.key]
    //                   )}
    //                 </TableCell>
    //               ))}
    //             </TableRow>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </TableContainer>
    //   </div>
    // );
  }

}

NewsTable.propTypes = {
  result: PropTypes.object.isRequired,
}

export default function NewsTable({result}) {
  const news = new newsDisplay(result);
  return <> { news.Run() } </>;
}
