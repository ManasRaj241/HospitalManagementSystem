import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'summary-comp',
  styleUrl: 'summery-comp.css',
  shadow: true,
})
export class SummaryComp {
  @State() data: Array<{ patientName: string; doctorName: string; status: string }> = [];
  @State() searchName: string = '';
  @State() filteredData: Array<{ patientName: string; doctorName: string; status: string }> = [];
  @State() doctorMap: Map<string, string> = new Map();
  @State() doctorNamesSet: Set<string> = new Set();
  serialNumber: number = 0; // Add a serial number variable

  async fetchData() {
    try {
      const response = await fetch('https://localhost:7183/api/bookings');
      if (response.ok) {
        this.data = await response.json();
        this.data.forEach(item => this.doctorNamesSet.add(item.doctorName));
        this.fetchDoctorsData();
      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  async fetchDoctorsData() {
    try {
      const response = await fetch('https://localhost:7183/api/doctors');
      if (response.ok) {
        const doctorsData = await response.json();
        doctorsData.forEach(doctor => {
          if (this.doctorNamesSet.has(doctor.name)) {
            this.doctorMap.set(doctor.name, doctor.hospitalName);
          }
        });
      } else {
        console.error('Failed to fetch doctors data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching doctors data:', error);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.filteredData = this.data.filter(item => item.patientName.toLowerCase().includes(this.searchName.toLowerCase()));
  }

  componentWillLoad() {
    this.fetchData();
  }

  render() {
    return (
      <div class="summary-container">
        <form class="search-form" onSubmit={(e: Event) => this.handleSubmit(e)}>
          <label htmlFor="searchName">Search by Name</label>
          <input type="text" id="searchName" value={this.searchName} onInput={(e: Event) => (this.searchName = (e.target as HTMLInputElement).value)} placeholder="Enter Name" />
          <button type="submit">Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Hospital Name</th>
              <th>Assigned Doctor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.filteredData.map((item, index) => (
              <tr key={item.doctorName}>
                <td>{++this.serialNumber}</td> {/* Increment serial number manually */}
                {this.doctorMap.has(item.doctorName) && (
                  <tr>
                    <td></td>
                    <td>{this.doctorMap.get(item.doctorName)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                <td>{item.doctorName}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
