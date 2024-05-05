import { Row } from "@tanstack/react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "sample", // export file name (without .csv)
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// export function
// Note: change _ in Row<_>[] with your Typescript type.
export const exportExcel = (rows: Row<any>[]) => {
  const rowData = rows.map((row) => row.original);
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};
