class Table {
  constructor(id, data, rowBuilder) {
    this.id = id;
    this.data = data || [];
    this.rowBuilder = rowBuilder || this.defaultRowBuilder;
  }

  defaultRowBuilder(cellData, rowIndex, columnIndex) {
    const cell = document.createElement('div');
    cell.textContent = cellData;
    return cell;
  }

  build() {
    const table = document.createElement('table');

    if (this.id) {
      table.id = this.id;
    }

    table.classList.add('table-element');

    // Create the table header
    const headerRow = document.createElement('tr');
    this.data[0].forEach((headerData) => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerData;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Create table rows and cells using the rowBuilder function
    this.data.slice(1).forEach((rowData, rowIndex) => {
      const row = document.createElement('tr');
      rowData.forEach((cellData, columnIndex) => {
        const cell = document.createElement('td');
        // Use the rowBuilder to populate the cell content with row and column indices
        cell.appendChild(this.rowBuilder(cellData, rowIndex, columnIndex));
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    return table;
  }
}