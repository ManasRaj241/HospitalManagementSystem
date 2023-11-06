import { r as registerInstance, h } from './index-d6626b81.js';

const appointmentBookingCss = ".appointment-booking{text-align:center;padding:20px;animation:fadeIn 1s ease}h2{font-size:24px;color:#333;margin-bottom:20px}.form-group{text-align:left;margin-bottom:20px}label{display:block;font-size:16px;color:#333;margin-bottom:5px}input[type=\"text\"],input[type=\"number\"],input[type=\"tel\"],select,textarea{width:100%;padding:10px;border:1px solid #ccc;border-radius:5px;font-size:16px}select{appearance:none}textarea{resize:vertical}button{background-color:#007bff;color:#fff;font-size:16px;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease}button:hover{background-color:#0056b3}@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.appointment-booking{position:relative}.popup-form{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);z-index:999}.popup-content{background-color:#fff;padding:20px;border-radius:5px;box-shadow:0 0 10px rgba(0, 0, 0, 0.3);text-align:center}.popup-content h3{font-size:1.5rem;margin-bottom:10px}.popup-content button{background-color:#007BFF;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer}.popup-content button:hover{background-color:#0056b3}";

const AppointmentBooking = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.showSuccessPopup = false;
    this.selectedDoctor = '';
    this.selectedHospital = '';
    this.selectedReason = '';
    this.diseaseCategories = [];
    this.reasons = [];
    this.hospitals = [];
    this.doctors = [];
  }
  async componentDidLoad() {
    await this.fetchData();
  }
  handleDoctorChange(event) {
    const selectedDoctor = event.target.value;
    this.selectedDoctor = selectedDoctor;
    this.formData.doctor = selectedDoctor;
  }
  async handleHospitalChange(event) {
    const selectedHospital = event.target.value;
    this.selectedHospital = selectedHospital;
    try {
      const doctorsResponse = await fetch(`https://localhost:7183/api/doctors`);
      if (doctorsResponse.ok) {
        const allDoctors = await doctorsResponse.json();
        console.log(allDoctors);
        this.doctors = allDoctors.filter((doctor) => doctor.hospitalName === selectedHospital && doctor.specialization === this.formData.diseaseCategory);
        console.log(this.doctors);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching doctors:', error);
    }
  }
  async handleReasonChange(event) {
    const selectedReason = event.target.value;
    this.selectedReason = selectedReason;
    try {
      const hospitalsResponse = await fetch(`https://localhost:7183/api/Hospitals`);
      if (hospitalsResponse.ok) {
        const hospitalData = await hospitalsResponse.json();
        const filteredHospitals = hospitalData.filter((hospital) => hospital.hospitalServices
          .split(',')
          .map(service => service.trim())
          .includes(selectedReason));
        this.hospitals = filteredHospitals.map((hospital) => hospital.hospitalName);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching hospitals:', error);
    }
  }
  handleInputChange(event, field) {
    this.formData[field] = event.target.value;
  }
  async fetchData() {
    try {
      // Fetch data for disease categories and reasons
      const hospitalDataResponse = await fetch('https://localhost:7183/api/Hospitals');
      if (hospitalDataResponse.ok) {
        const hospitalData = await hospitalDataResponse.json();
        const services = hospitalData.map((hospital) => hospital.hospitalServices).join(',');
        this.diseaseCategories = Array.from(new Set(services.split(',')));
        this.reasons = Array.from(new Set(services.split(',')));
      }
      // Fetch data for hospitals
      const hospitalsResponse = await fetch('https://localhost:7183/api/Hospitals');
      if (hospitalsResponse.ok) {
        const hospitalData = await hospitalsResponse.json();
        this.hospitals = hospitalData.filter((hospital) => hospital.hospitalServices.includes(this.formData.diseaseCategory)).map((hospital) => hospital.name);
      }
      // Fetch data for doctors
      const doctorsResponse = await fetch('https://localhost:7183/api/doctors');
      if (doctorsResponse.ok) {
        this.doctors = await doctorsResponse.json();
      }
    }
    catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
  handleDiseaseCategoryChange(_newValue) {
    this.hospitals = [];
    this.formData.hospital = '';
    this.fetchData();
  }
  handleSubmit(event) {
    event.preventDefault();
    const bookingData = {
      patientName: this.formData.name,
      doctorName: this.formData.doctor,
      status: 'Booked',
    };
    this.postBookingData(bookingData);
  }
  async postBookingData(bookingData) {
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
      }
      else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to book appointment:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while booking an appointment:', error);
    }
  }
  closePopup() {
    this.showSuccessPopup = false;
  }
  render() {
    return (h("div", { class: "appointment-booking" }, h("h2", null, "Book an Appointment"), h("form", { onSubmit: e => this.handleSubmit(e) }, h("div", { class: "form-group" }, h("label", { htmlFor: "name" }, "Enter Name"), h("input", { type: "text", id: "name", value: this.formData.name, onInput: e => this.handleInputChange(e, 'name'), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "age" }, "Enter Age"), h("input", { type: "number", id: "age", value: this.formData.age, onInput: e => this.handleInputChange(e, 'age'), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "gender" }, "Enter Gender"), h("input", { type: "text", id: "gender", value: this.formData.gender, onInput: e => this.handleInputChange(e, 'gender'), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "phoneNumber" }, "Phone Number"), h("input", { type: "tel", id: "phoneNumber", value: this.formData.phoneNumber, onInput: e => this.handleInputChange(e, 'phoneNumber'), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "diseaseCategory" }, "Select Disease Category"), h("select", { id: "diseaseCategory", onInput: (e) => this.handleInputChange(e, 'diseaseCategory'), required: true }, h("option", { value: "" }, "Select"), this.diseaseCategories.map(category => (h("option", { value: category, key: category }, category))))), h("div", { class: "form-group" }, h("label", { htmlFor: "reason" }, "Select Reason"), h("select", { id: "reason", onInput: (e) => this.handleReasonChange(e), required: true }, h("option", { value: "" }, "Select"), this.reasons.map(reason => (h("option", { value: reason, key: reason }, reason))))), h("div", { class: "form-group" }, h("label", { htmlFor: "hospital" }, "Select Hospital"), h("select", { id: "hospital", onInput: (e) => this.handleHospitalChange(e), required: true }, h("option", { value: "" }, "Select"), this.hospitals.map(hospital => (h("option", { value: hospital, key: hospital }, hospital))))), h("div", { class: "form-group" }, h("label", { htmlFor: "doctor" }, "Select Doctor"), h("select", { id: "doctor", onInput: (e) => this.handleDoctorChange(e), required: true }, h("option", { value: "" }, "Select"), this.doctors
      .filter(doctor => doctor.specialization === this.formData.diseaseCategory && doctor.hospitalName === this.selectedHospital)
      .map(doctor => (h("option", { value: doctor.name, key: doctor.id }, doctor.name, " - Charges ", doctor.pricePerHour, "$ per Hour."))))), h("div", { class: "form-group" }, h("label", { htmlFor: "problemDescription" }, "Elaborate the Problem"), h("textarea", { id: "problemDescription", value: this.formData.problemDescription, onInput: e => this.handleInputChange(e, 'problemDescription'), rows: 4 })), h("button", { type: "submit" }, "Book Appointment")), this.showSuccessPopup && (h("div", { class: "popup-form" }, h("div", { class: "popup-content" }, h("h3", null, "Appointment booked successfully"), h("p", null, "Your appointment has been successfully booked."), h("button", { onClick: () => this.closePopup() }, "Close"))))));
  }
  static get watchers() { return {
    "formData.diseaseCategory": ["handleDiseaseCategoryChange"]
  }; }
};
AppointmentBooking.style = appointmentBookingCss;

export { AppointmentBooking as appointment_booking };

//# sourceMappingURL=appointment-booking.entry.js.map