import React from "react";
import { Workbook } from 'exceljs';

export const handleExport = ( tableData, columnsToExport, fileName ) => {
    // Create a new workbook
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add table headers
    const headers = columnsToExport.map((column) => column.toUpperCase());
    worksheet.addRow(headers);

    // Add table data
    tableData.forEach((rowData) => {
      const dataToExport = columnsToExport.map((column) => rowData[column]);
      worksheet.addRow(dataToExport);
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };