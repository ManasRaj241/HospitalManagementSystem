import { r as registerInstance, h } from './index-d6626b81.js';

const adminBookingCss = ".booking-table{margin:20px}table{width:100%;border-collapse:collapse;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);animation:fadeIn 0.5s ease}th,td{padding:10px;text-align:left;border-bottom:1px solid #ccc}th{background-color:#f2f2f2;font-weight:bold}tr:hover{background-color:#f5f5f5;transition:background-color 0.2s ease}select{padding:5px;border:1px solid #ccc;border-radius:5px;outline:none;transition:border-color 0.3s ease}select:hover{border-color:#007bff}@keyframes fadeIn{from{opacity:0}to{opacity:1}}";

const AdminBooking = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.bookings = [];
  }
  componentWillLoad() {
    this.fetchBookings();
  }
  async fetchBookings() {
    try {
      const response = await fetch('https://localhost:7183/api/bookings');
      if (response.ok) {
        const data = await response.json();
        this.bookings = data;
      }
      else {
        console.error('Failed to fetch booking data:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching booking data:', error);
    }
  }
  async updateStatus(booking, newStatus) {
    try {
      const updatedBooking = {
        id: booking.id,
        patientName: booking.patientName,
        doctorName: booking.doctorName,
        status: newStatus,
      };
      const response = await fetch(`https://localhost:7183/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
      if (response.ok) {
        // Update the booking status in the local state
        const updatedBookings = this.bookings.map(b => {
          if (b.id === booking.id) {
            b.status = newStatus;
          }
          return b;
        });
        this.bookings = updatedBookings;
      }
      else {
        console.error('Failed to update booking status:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while updating booking status:', error);
    }
  }
  render() {
    return (h("div", { class: "booking-table" }, h("table", null, h("thead", null, h("tr", null, h("th", null, "Booking ID"), h("th", null, "Name"), h("th", null, "Assigned Doctor"), h("th", null, "Status"), h("th", null, "Action"))), h("tbody", null, this.bookings.map(booking => (h("tr", { key: booking.id }, h("td", null, booking.id), h("td", null, booking.patientName), h("td", null, booking.doctorName), h("td", null, booking.status), h("td", null, h("select", { onChange: e => this.updateStatus(booking, e.target.value) }, h("option", { value: "Booked", selected: booking.status === 'Booked' }, "Booked"), h("option", { value: "Assigned", selected: booking.status === 'Assigned' }, "Assigned"), h("option", { value: "Consulted", selected: booking.status === 'Consulted' }, "Consulted"), h("option", { value: "Done", selected: booking.status === 'Done' }, "Done"))))))))));
  }
};
AdminBooking.style = adminBookingCss;

export { AdminBooking as admin_booking };

//# sourceMappingURL=admin-booking.entry.js.map