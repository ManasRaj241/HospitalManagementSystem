import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'admin-booking',
  styleUrl: 'admin-booking.css',
  shadow: true,
})
export class AdminBooking {
  @State() bookings: Booking[] = [];

  componentWillLoad() {
    this.fetchBookings();
  }

  async fetchBookings() {
    try {
      const response = await fetch('https://localhost:7183/api/bookings');
      if (response.ok) {
        const data = await response.json();
        this.bookings = data;
      } else {
        console.error('Failed to fetch booking data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching booking data:', error);
    }
  }

  async updateStatus(booking: Booking, newStatus: string) {
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
        const updatedBookings = this.bookings.map(b => {
          if (b.id === booking.id) {
            b.status = newStatus;
          }
          return b;
        });
        this.bookings = updatedBookings;
      } else {
        console.error('Failed to update booking status:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while updating booking status:', error);
    }
  }

  render() {
    return (
      <div class="booking-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Assigned Doctor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.patientName}</td>
                <td>{booking.doctorName}</td>
                <td>{booking.status}</td>
                <td>
                  <select onChange={e => this.updateStatus(booking, (e.target as HTMLSelectElement).value)}>
                    <option value="Booked" selected={booking.status === 'Booked'}>
                      Booked
                    </option>
                    <option value="Assigned" selected={booking.status === 'Assigned'}>
                      Assigned
                    </option>
                    <option value="Consulted" selected={booking.status === 'Consulted'}>
                      Consulted
                    </option>
                    <option value="Done" selected={booking.status === 'Done'}>
                      Done
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

interface Booking {
  id: number;
  patientName: string;
  doctorName: string;
  status: string;
}
