export declare class AdminDoctors {
  doctors: Doctor[];
  searchCriteria: string;
  searchOption: 'doctorName' | 'hospitalName' | 'specialization';
  editedHospitalName: string;
  sortOption: 'asc' | 'desc';
  filteredDoctors: Doctor[];
  isAddDoctorPopupVisible: boolean;
  newDoctor: NewDoctor;
  specializationOptions: Set<string>;
  hospitalOptions: Set<string>;
  componentDidLoad(): Promise<void>;
  editHospital(doctorId: number): void;
  deleteDoctor(doctorId: number): Promise<void>;
  toggleSortOrder(): void;
  sortDoctorsByPrice(doctors: Doctor[]): Doctor[];
  getFilteredDoctors(): Doctor[];
  toggleAddDoctorPopup(): void;
  handleInputChange(event: Event, field: keyof NewDoctor): void;
  addDoctor(): Promise<void>;
  updateDoctorHospitalName(doctorId: number, newHospitalName: string): Promise<void>;
  render(): any;
}
interface Doctor {
  id: number;
  name: string;
  age: number;
  specialization: string;
  hospitalName: string;
  pricePerHour: number;
  isAvailable: boolean;
}
interface NewDoctor {
  name: string;
  age: number;
  specialization: string;
  hospitalName: string;
  pricePerHour: number;
  isAvailable: boolean;
}
export {};
