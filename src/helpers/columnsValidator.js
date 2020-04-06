module.exports = columns =>
  columns
    ? columns.every(
        column => column.title !== undefined && column.order !== undefined
      )
    : null;
