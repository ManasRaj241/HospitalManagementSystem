export declare class AdminBooking {
  bookings: Booking[];
  componentWillLoad(): void;
  fetchBookings(): Promise<void>;
  updateStatus(booking: Booking, newStatus: string): Promise<void>;
  render(): any;
}
interface Booking {
  id: number;
  patientName: string;
  doctorName: string;
  status: string;
}
export {};
