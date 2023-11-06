import { r as registerInstance, h } from './index-d6626b81.js';

const adminDoctorsCss = ".doctor-grid{display:flex;flex-wrap:wrap;gap:20px;justify-content:flex-start}.doctor-card{flex:0 1 calc(33.33% - 20px);border:1px solid #ccc;padding:10px;border-radius:5px;box-sizing:border-box}.search-options{display:flex;align-items:center;gap:10px;margin-bottom:20px}select{background-color:#f5f5f5;padding:10px;border:none;border-radius:5px;outline:none;cursor:pointer;transition:background-color 0.3s}select:hover{background-color:#e0e0e0}input[type=\"text\"]{flex-grow:1;padding:10px;border:1px solid black;border-radius:5px;outline:none;transition:background-color 0.3s, color 0.3s}input[type=\"text\"]:focus{background-color:#e0e0e0;color:#333}input[type=\"number\"]{flex-grow:1;padding:10px;border:1px solid black;border-radius:5px;outline:none;transition:background-color 0.3s, color 0.3s}input[type=\"number\"]:focus{background-color:#e0e0e0;color:#333}.addBtn{background-color:rgb(124, 235, 124);color:#0a0000;width:200px;padding:10px;margin-top:20px;margin-left:750px;margin-bottom:10px}.input-field{border:1px solid #ccc;padding:5px;transition:border-color 0.2s ease;margin-right:20px}.input-field.focus{border-color:#007bff}.input-field.blur{border-color:#ccc}.formCancel{background-color:red;color:white;padding:10px;margin-top:10px;margin-bottom:20px;width:100px;align-items:center}.formAdd{background-color:rgb(241, 122, 66);color:black;width:100px;padding:10px}";

const AdminDoctors = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.doctors = [];
    this.searchCriteria = '';
    this.searchOption = 'doctorName';
    this.editedHospitalName = '';
    this.sortOption = 'asc';
    this.filteredDoctors = [];
    this.isAddDoctorPopupVisible = false;
    this.newDoctor = {
      name: '',
      age: 0,
      specialization: '',
      hospitalName: '',
      pricePerHour: 0,
      isAvailable: false,
    };
    this.specializationOptions = new Set();
    this.hospitalOptions = new Set();
  }
  async componentDidLoad() {
    try {
      const response = await fetch('https://localhost:7183/api/Hospitals');
      if (response.ok) {
        const data = await response.json();
        data.forEach(hospital => {
          console.log(hospital);
          const specializationValues = hospital.hospitalServices.split(',');
          specializationValues.forEach(value => this.specializationOptions.add(value.trim()));
          this.hospitalOptions.add(hospital.hospitalName);
        });
      }
      else {
        console.error('Failed to fetch data from the Hospitals API');
      }
      const responseDoctor = await fetch('https://localhost:7183/api/doctors');
      if (responseDoctor.ok) {
        const doctorData = await responseDoctor.json();
        this.doctors = doctorData;
      }
      else {
        console.error('Failed to fetch data from the Doctors API');
      }
    }
    catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
  editHospital(doctorId) {
    const newHospital = prompt('Enter the new hospital name:');
    if (newHospital !== null) {
      this.updateDoctorHospitalName(doctorId, newHospital);
      this.editedHospitalName = newHospital;
    }
  }
  async deleteDoctor(doctorId) {
    try {
      if (confirm('Are you sure you want to delete this doctor?')) {
        const apiUrl = `https://localhost:7183/api/doctors/${doctorId}`;
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Doctor deleted successfully');
          this.doctors = this.doctors.filter(doctor => doctor.id !== doctorId);
        }
        else {
          const errorText = await response.text();
          console.error(`Error message: ${errorText}`);
          console.error('Failed to delete doctor:', response.status, response.statusText);
        }
      }
    }
    catch (error) {
      console.error('An error occurred while deleting a doctor:', error);
    }
  }
  toggleSortOrder() {
    this.sortOption = this.sortOption === 'asc' ? 'desc' : 'asc';
    this.filteredDoctors = this.sortDoctorsByPrice(this.getFilteredDoctors());
  }
  sortDoctorsByPrice(doctors) {
    return doctors.slice().sort((a, b) => {
      if (this.sortOption === 'asc') {
        return a.pricePerHour - b.pricePerHour;
      }
      else {
        return b.pricePerHour - a.pricePerHour;
      }
    });
  }
  getFilteredDoctors() {
    if (!this.searchCriteria) {
      return this.doctors;
    }
    const searchTerm = this.searchCriteria.toLowerCase();
    return this.doctors.filter(doctor => {
      if (this.searchOption === 'doctorName') {
        return doctor.name.toLowerCase().includes(searchTerm);
      }
      else if (this.searchOption === 'hospitalName') {
        return doctor.hospitalName.toLowerCase().includes(searchTerm);
      }
      else if (this.searchOption === 'specialization') {
        return doctor.specialization.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  }
  toggleAddDoctorPopup() {
    this.isAddDoctorPopupVisible = !this.isAddDoctorPopupVisible;
  }
  handleInputChange(event, field) {
    const inputValue = event.target.value;
    if (field === 'isAvailable') {
      const isChecked = event.target.checked;
      this.newDoctor = Object.assign(Object.assign({}, this.newDoctor), { [field]: isChecked });
    }
    else if (field === 'age') {
      const parsedValue = parseInt(inputValue, 10);
      if (!isNaN(parsedValue)) {
        this.newDoctor = Object.assign(Object.assign({}, this.newDoctor), { [field]: parsedValue });
      }
    }
    else {
      this.newDoctor = Object.assign(Object.assign({}, this.newDoctor), { [field]: inputValue });
    }
  }
  async addDoctor() {
    try {
      const apiUrl = 'https://localhost:7183/api/doctors';
      const newDoctorData = {
        name: this.newDoctor.name,
        age: this.newDoctor.age,
        hospitalName: this.newDoctor.hospitalName,
        pricePerHour: this.newDoctor.pricePerHour,
        specialization: this.newDoctor.specialization,
        isAvailable: this.newDoctor.isAvailable,
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctorData),
      });
      if (response.ok) {
        console.log('Doctor added successfully');
        const responseData = await response.json();
        const newDoctorWithID = Object.assign(Object.assign({}, newDoctorData), { id: responseData.id });
        this.doctors = [...this.doctors, newDoctorWithID];
        this.toggleAddDoctorPopup();
        this.newDoctor = {
          name: '',
          age: 0,
          specialization: '',
          hospitalName: '',
          pricePerHour: 0,
          isAvailable: false,
        };
      }
      else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to add doctor:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while adding a doctor:', error);
    }
  }
  async updateDoctorHospitalName(doctorId, newHospitalName) {
    try {
      const existingDoctor = this.doctors.find(doctor => doctor.id === doctorId);
      if (!existingDoctor) {
        console.error('Doctor not found');
        return;
      }
      const apiUrl = `https://localhost:7183/api/doctors/${doctorId}`;
      const updatedData = {
        id: existingDoctor.id,
        name: existingDoctor.name,
        age: existingDoctor.age,
        hospitalName: newHospitalName,
        pricePerHour: existingDoctor.pricePerHour,
        isAvailable: existingDoctor.isAvailable,
        specialization: existingDoctor.specialization,
      };
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log('Doctor updated successfully');
        const updatedDoctors = this.doctors.map(doctor => {
          if (doctor.id === doctorId) {
            return Object.assign(Object.assign({}, doctor), { hospitalName: newHospitalName });
          }
          return doctor;
        });
        this.doctors = updatedDoctors;
      }
      else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to update doctor:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while updating a doctor:', error);
    }
  }
  render() {
    const sortedDoctors = this.sortDoctorsByPrice(this.getFilteredDoctors());
    return (h("div", null, h("button", { class: "addBtn", onClick: () => this.toggleAddDoctorPopup() }, "Add Doctor"), this.isAddDoctorPopupVisible && (h("div", { class: "popup" }, h("h2", null, "Add Doctor"), h("form", { onSubmit: e => {
        e.preventDefault();
        this.addDoctor();
      } }, h("label", null, "Name:", h("input", { class: "input-field", type: "text", placeholder: "Enter Name", value: this.newDoctor.name, onInput: e => this.handleInputChange(e, 'name'), onFocus: e => e.target.classList.add('focus'), onBlur: e => e.target.classList.remove('focus'), name: "name", required: true })), h("label", null, "Age:", h("input", { class: "input-field", type: "number", value: this.newDoctor.age, onInput: e => this.handleInputChange(e, 'age'), onFocus: e => e.target.classList.add('focus'), onBlur: e => e.target.classList.remove('focus'), name: "age", required: true })), h("label", null, "Specialization:", h("select", { class: "input-field", onInput: e => this.handleInputChange(e, 'specialization'), onFocus: e => e.target.classList.add('focus'), onBlur: e => e.target.classList.remove('focus'), name: "specialization", required: true }, h("option", { value: "", disabled: true, selected: true }, "Select Specialization"), Array.from(this.specializationOptions).map(option => (h("option", { value: option, key: option }, option))))), h("label", null, "Hospital:", h("select", { class: "input-field", onInput: e => this.handleInputChange(e, 'hospitalName'), onFocus: e => e.target.classList.add('focus'), onBlur: e => e.target.classList.remove('focus'), name: "hospital", required: true }, h("option", { value: "", disabled: true, selected: true }, "Select Hospital"), Array.from(this.hospitalOptions).map(option => (h("option", { value: option, key: option }, option))))), h("label", null, "Price:", h("input", { class: "input-field", type: "number", value: this.newDoctor.pricePerHour, onInput: e => this.handleInputChange(e, 'pricePerHour'), onFocus: e => e.target.classList.add('focus'), onBlur: e => e.target.classList.remove('focus'), name: "price", required: true })), h("label", null, "Available:", h("input", { class: "input-field", type: "checkbox", checked: this.newDoctor.isAvailable, onInput: e => this.handleInputChange(e, 'isAvailable'), onFocus: e => e.target.classList.add('focus'), name: "available", onBlur: e => e.target.classList.remove('focus') })), h("button", { type: "submit", class: "formAdd" }, "Add")), h("button", { onClick: () => this.toggleAddDoctorPopup(), class: "formCancel" }, "Cancel"))), h("div", { class: "search-options" }, h("label", null, "Search by:", h("select", { onChange: e => (this.searchOption = e.target.value) }, h("option", { value: "doctorName", selected: this.searchOption === 'doctorName' }, "Doctor Name"), h("option", { value: "hospitalName", selected: this.searchOption === 'hospitalName' }, "Hospital Name"), h("option", { value: "specialization", selected: this.searchOption === 'specialization' }, "Specialization"))), h("input", { type: "text", placeholder: `Search by ${this.searchOption === 'doctorName' ? 'Doctor' : 'Hospital'} Name`, value: this.searchCriteria, onInput: e => (this.searchCriteria = e.target.value) }), h("button", { onClick: () => this.toggleSortOrder() }, "Sort by Price ", this.sortOption === 'asc' ? 'Ascending' : 'Descending')), h("div", { class: "doctor-grid" }, sortedDoctors.map(doctor => (h("div", { class: "doctor-card", key: doctor.id }, h("div", null, h("strong", null, doctor.name), h("br", null), "ID: ", doctor.id, h("br", null), "Age: ", doctor.age, h("br", null), "Specialization: ", doctor.specialization, h("br", null), "Hospital: ", h("span", { id: `hospital-${doctor.id}` }, doctor.hospitalName), h("br", null), "Price: $", doctor.pricePerHour, h("br", null), "Available: ", doctor.isAvailable ? 'Yes' : 'No'), h("div", null, h("button", { onClick: () => this.editHospital(doctor.id) }, "Edit"), h("button", { onClick: () => this.deleteDoctor(doctor.id) }, "Delete"), " ")))))));
  }
};
AdminDoctors.style = adminDoctorsCss;

export { AdminDoctors as admin_doctors };

//# sourceMappingURL=admin-doctors.entry.js.map