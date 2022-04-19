export interface SimpleTableDataTypes {
    headings: SimpleTableHeading[];
    rows: Array<Dic>;
  }
  
  interface Dic {
    [key: string]: Object;
  }
  
  export interface SimpleTableHeading {
    key: string;
    value: string;
    fontWeight?: string;
  }