export declare class ManageHospital {
  data: any[];
  editingItemIndex: number | null;
  editedDescription: string;
  isAddHospitalPopupVisible: boolean;
  newHospitalName: string;
  newHospitalDescription: string;
  componentDidLoad(): Promise<void>;
  handleUpdate(index: number, updatedItem: any): Promise<void>;
  handleDelete(index: number): Promise<void>;
  handleEdit(index: number): void;
  toggleAddHospitalPopup(): void;
  addHospital(): Promise<void>;
  render(): any;
}
