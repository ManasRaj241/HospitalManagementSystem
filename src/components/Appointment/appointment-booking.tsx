import { Component, h, State, Watch } from '@stencil/core';

@Component({
  tag: 'appointment-booking',
  styleUrl: 'appointment-booking.css',
  shadow: true,
})
export class AppointmentBooking {
  @State() formData = {
    name: '',
    age: '',
    gender: '',
    phoneNumber: '',
    diseaseCategory: '',
    reason: '',
    hospital: '',
    doctor: '',
    problemDescription: '',
  };

  @State() showSuccessPopup: boolean = false;
  @State() selectedDoctor: string = '';
  @State() selectedHospital: string = '';
  @State() selectedReason: string = '';
  @State() diseaseCategories: string[] = [];
  @State() reasons: string[] = [];
  @State() hospitals: string[] = [];
  @State() doctors: { id: string; name: string; pricePerHour: number; specialization: string; hospitalName: string }[] = [];

  async componentDidLoad() {
    await this.fetchData();
  }

  handleDoctorChange(event: Event) {
    const selectedDoctor = (event.target as HTMLSelectElement).value;
    this.selectedDoctor = selectedDoctor;
    this.formData.doctor = selectedDoctor;
  }

  async handleHospitalChange(event: Event) {
    const selectedHospital = (event.target as HTMLSelectElement).value;
    this.selectedHospital = selectedHospital;

    try {
      const doctorsResponse = await fetch(`https://localhost:7183/api/doctors`);
      if (doctorsResponse.ok) {
        const allDoctors = await doctorsResponse.json();
        console.log(allDoctors);
        this.doctors = allDoctors.filter((doctor: any) => doctor.hospitalName === selectedHospital && doctor.specialization === this.formData.diseaseCategory);
        console.log(this.doctors);
      }
    } catch (error) {
      console.error('An error occurred while fetching doctors:', error);
    }
  }

  async handleReasonChange(event: Event) {
    const selectedReason = (event.target as HTMLSelectElement).value;
    this.selectedReason = selectedReason;

    try {
      const hospitalsResponse = await fetch(`https://localhost:7183/api/Hospitals`);
      if (hospitalsResponse.ok) {
        const hospitalData = await hospitalsResponse.json();
        const filteredHospitals = hospitalData.filter((hospital: any) =>
          hospital.hospitalServices
            .split(',')
            .map(service => service.trim())
            .includes(selectedReason),
        );
        this.hospitals = filteredHospitals.map((hospital: any) => hospital.hospitalName);
      }
    } catch (error) {
      console.error('An error occurred while fetching hospitals:', error);
    }
  }

  handleInputChange(event: Event, field: string) {
    this.formData[field] = (event.target as HTMLInputElement).value;
  }

  async fetchData() {
    try {
      // Fetch data for disease categories and reasons
      const hospitalDataResponse = await fetch('https://localhost:7183/api/Hospitals');
      if (hospitalDataResponse.ok) {
        const hospitalData = await hospitalDataResponse.json();
        const services = hospitalData.map((hospital: any) => hospital.hospitalServices).join(',');
        this.diseaseCategories = Array.from(new Set(services.split(',')));
        this.reasons = Array.from(new Set(services.split(',')));
      }

      // Fetch data for hospitals
      const hospitalsResponse = await fetch('https://localhost:7183/api/Hospitals');
      if (hospitalsResponse.ok) {
        const hospitalData = await hospitalsResponse.json();
        this.hospitals = hospitalData.filter((hospital: any) => hospital.hospitalServices.includes(this.formData.diseaseCategory)).map((hospital: any) => hospital.name);
      }

      // Fetch data for doctors
      const doctorsResponse = await fetch('https://localhost:7183/api/doctors');
      if (doctorsResponse.ok) {
        this.doctors = await doctorsResponse.json();
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  @Watch('formData.diseaseCategory')
  handleDiseaseCategoryChange(_newValue: string) {
    this.hospitals = [];
    this.formData.hospital = '';
    this.fetchData();
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const bookingData = {
      patientName: this.formData.name,
      doctorName: this.formData.doctor,
      status: 'Booked',
    };
    this.postBookingData(bookingData);
  }

  async postBookingData(bookingData: any) {
    try {
      const apiUrl = 'https://localhost:7183/api/bookings';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      this.showSuccessPopup = true;
      if (response.ok) {
        console.log('Appointment booked successfully');
        this.formData = {
          name: '',
          age: '',
          gender: '',
          phoneNumber: '',
          diseaseCategory: '',
          reason: '',
          hospital: '',
          doctor: '',
          problemDescription: '',
        };
        this.selectedDoctor = '';
        this.selectedHospital = '';
        this.selectedReason = '';
      } else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to book appointment:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while booking an appointment:', error);
    }
  }

  closePopup() {
    this.showSuccessPopup = false;
  }

  render() {
    return (
      <div class="appointment-booking">
        <h2>Book an Appointment</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div class="form-group">
            <label htmlFor="name">Enter Name</label>
            <input type="text" id="name" value={this.formData.name} onInput={e => this.handleInputChange(e, 'name')} required />
          </div>
          <div class="form-group">
            <label htmlFor="age">Enter Age</label>
            <input type="number" id="age" value={this.formData.age} onInput={e => this.handleInputChange(e, 'age')} required />
          </div>
          <div class="form-group">
            <label htmlFor="gender">Enter Gender</label>
            <input type="text" id="gender" value={this.formData.gender} onInput={e => this.handleInputChange(e, 'gender')} required />
          </div>
          <div class="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" value={this.formData.phoneNumber} onInput={e => this.handleInputChange(e, 'phoneNumber')} required />
          </div>
          <div class="form-group">
            <label htmlFor="diseaseCategory">Select Disease Category</label>
            <select id="diseaseCategory" onInput={(e: Event) => this.handleInputChange(e, 'diseaseCategory')} required>
              <option value="">Select</option>
              {this.diseaseCategories.map(category => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="reason">Select Reason</label>
            <select id="reason" onInput={(e: Event) => this.handleReasonChange(e)} required>
              <option value="">Select</option>
              {this.reasons.map(reason => (
                <option value={reason} key={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="hospital">Select Hospital</label>
            <select id="hospital" onInput={(e: Event) => this.handleHospitalChange(e)} required>
              <option value="">Select</option>
              {this.hospitals.map(hospital => (
                <option value={hospital} key={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="doctor">Select Doctor</label>
            <select id="doctor" onInput={(e: Event) => this.handleDoctorChange(e)} required>
              <option value="">Select</option>
              {this.doctors
                .filter(doctor => doctor.specialization === this.formData.diseaseCategory && doctor.hospitalName === this.selectedHospital)
                .map(doctor => (
                  <option value={doctor.name} key={doctor.id}>
                    {doctor.name} - Charges {doctor.pricePerHour}$ per Hour.
                  </option>
                ))}
            </select>
          </div>

          <div class="form-group">
            <label htmlFor="problemDescription">Elaborate the Problem</label>
            <textarea id="problemDescription" value={this.formData.problemDescription} onInput={e => this.handleInputChange(e, 'problemDescription')} rows={4}></textarea>
          </div>
          <button type="submit">Book Appointment</button>
        </form>
        {this.showSuccessPopup && (
          <div class="popup-form">
            <div class="popup-content">
              <h3>Appointment booked successfully</h3>
              <p>Your appointment has been successfully booked.</p>
              <button onClick={() => this.closePopup()}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
