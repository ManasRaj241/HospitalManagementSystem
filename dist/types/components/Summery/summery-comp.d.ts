export declare class SummaryComp {
  data: Array<{
    patientName: string;
    doctorName: string;
    status: string;
  }>;
  searchName: string;
  filteredData: Array<{
    patientName: string;
    doctorName: string;
    status: string;
  }>;
  doctorMap: Map<string, string>;
  doctorNamesSet: Set<string>;
  serialNumber: number;
  fetchData(): Promise<void>;
  fetchDoctorsData(): Promise<void>;
  handleSubmit(event: Event): void;
  componentWillLoad(): void;
  render(): any;
}
