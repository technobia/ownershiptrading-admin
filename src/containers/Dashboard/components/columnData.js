import { textFilter } from "react-bootstrap-table2-filter";

export default [
  {
    text: "Domain",
    dataField: "domain",
    filter: textFilter(),
    sort: true
  },
  {
    text: "Imps",
    dataField: "imps",
    formatter: (cell) => cell.toLocaleString(),
    sort: true
  },
];
