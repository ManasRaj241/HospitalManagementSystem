export declare class AppointmentBooking {
  formData: {
    name: string;
    age: string;
    gender: string;
    phoneNumber: string;
    diseaseCategory: string;
    reason: string;
    hospital: string;
    doctor: string;
    problemDescription: string;
  };
  showSuccessPopup: boolean;
  selectedDoctor: string;
  selectedHospital: string;
  selectedReason: string;
  diseaseCategories: string[];
  reasons: string[];
  hospitals: string[];
  doctors: {
    id: string;
    name: string;
    pricePerHour: number;
    specialization: string;
    hospitalName: string;
  }[];
  componentDidLoad(): Promise<void>;
  handleDoctorChange(event: Event): void;
  handleHospitalChange(event: Event): Promise<void>;
  handleReasonChange(event: Event): Promise<void>;
  handleInputChange(event: Event, field: string): void;
  fetchData(): Promise<void>;
  handleDiseaseCategoryChange(_newValue: string): void;
  handleSubmit(event: Event): void;
  postBookingData(bookingData: any): Promise<void>;
  closePopup(): void;
  render(): any;
}
