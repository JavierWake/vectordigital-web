export interface DatatableDataTypes {
    headings: DataTableHeading[];
    rows: Array<Dic>;
    personal: boolean;
}
  
export interface DataTableHeading {
    key: string;
    value: string;
    color?: boolean;
}

interface Dic {
    [key: string]: Object;
}
  
  