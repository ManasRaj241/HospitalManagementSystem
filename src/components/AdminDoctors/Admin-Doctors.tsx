import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'admin-doctors',
  styleUrl: 'Admin-Doctors.css',
  shadow: true,
})
export class AdminDoctors {
  @State() doctors: Doctor[] = [];
  @State() searchCriteria: string = '';
  @State() searchOption: 'doctorName' | 'hospitalName' | 'specialization' = 'doctorName';
  @State() editedHospitalName: string = '';
  @State() sortOption: 'asc' | 'desc' = 'asc';
  @State() filteredDoctors: Doctor[] = [];

  @State() isAddDoctorPopupVisible: boolean = false;
  @State() newDoctor: NewDoctor = {
    name: '',
    age: 0,
    specialization: '',
    hospitalName: '',
    pricePerHour: 0,
    isAvailable: false,
  };
  @State() specializationOptions: Set<string> = new Set();
  @State() hospitalOptions: Set<string> = new Set();

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
      } else {
        console.error('Failed to fetch data from the Hospitals API');
      }
      const responseDoctor = await fetch('https://localhost:7183/api/doctors');
      if (responseDoctor.ok) {
        const doctorData = await responseDoctor.json();
        this.doctors = doctorData;
      } else {
        console.error('Failed to fetch data from the Doctors API');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  editHospital(doctorId: number) {
    const newHospital = prompt('Enter the new hospital name:');
    if (newHospital !== null) {
      this.updateDoctorHospitalName(doctorId, newHospital);
      this.editedHospitalName = newHospital;
    }
  }

  async deleteDoctor(doctorId: number) {
    try {
      if (confirm('Are you sure you want to delete this doctor?')) {
        const apiUrl = `https://localhost:7183/api/doctors/${doctorId}`;

        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Doctor deleted successfully');
          this.doctors = this.doctors.filter(doctor => doctor.id !== doctorId);
        } else {
          const errorText = await response.text();
          console.error(`Error message: ${errorText}`);
          console.error('Failed to delete doctor:', response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error('An error occurred while deleting a doctor:', error);
    }
  }

  toggleSortOrder() {
    this.sortOption = this.sortOption === 'asc' ? 'desc' : 'asc';
    this.filteredDoctors = this.sortDoctorsByPrice(this.getFilteredDoctors());
  }

  sortDoctorsByPrice(doctors: Doctor[]) {
    return doctors.slice().sort((a, b) => {
      if (this.sortOption === 'asc') {
        return a.pricePerHour - b.pricePerHour;
      } else {
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
      } else if (this.searchOption === 'hospitalName') {
        return doctor.hospitalName.toLowerCase().includes(searchTerm);
      } else if (this.searchOption === 'specialization') {
        return doctor.specialization.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  }

  toggleAddDoctorPopup() {
    this.isAddDoctorPopupVisible = !this.isAddDoctorPopupVisible;
  }

  handleInputChange(event: Event, field: keyof NewDoctor) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (field === 'isAvailable') {
      const isChecked = (event.target as HTMLInputElement).checked;
      this.newDoctor = {
        ...this.newDoctor,
        [field]: isChecked,
      };
    } else if (field === 'age') {
      const parsedValue = parseInt(inputValue, 10);
      if (!isNaN(parsedValue)) {
        this.newDoctor = {
          ...this.newDoctor,
          [field]: parsedValue,
        };
      }
    } else {
      this.newDoctor = {
        ...this.newDoctor,
        [field]: inputValue,
      };
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
        const newDoctorWithID: Doctor = {
          ...newDoctorData,
          id: responseData.id,
        };
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
      } else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to add doctor:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding a doctor:', error);
    }
  }

  async updateDoctorHospitalName(doctorId: number, newHospitalName: string) {
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
            return {
              ...doctor,
              hospitalName: newHospitalName,
            };
          }
          return doctor;
        });

        this.doctors = updatedDoctors;
      } else {
        const errorText = await response.text();
        console.error(`Error message: ${errorText}`);
        console.error('Failed to update doctor:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while updating a doctor:', error);
    }
  }

  render() {
    const sortedDoctors = this.sortDoctorsByPrice(this.getFilteredDoctors());

    return (
      <div>
        <button class="addBtn" onClick={() => this.toggleAddDoctorPopup()}>
          Add Doctor
        </button>
        {this.isAddDoctorPopupVisible && (
          <div class="popup">
            <h2>Add Doctor</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.addDoctor();
              }}
            >
              <label>
                Name:
                <input
                  class="input-field"
                  type="text"
                  placeholder="Enter Name"
                  value={this.newDoctor.name}
                  onInput={e => this.handleInputChange(e, 'name')}
                  onFocus={e => (e.target as HTMLInputElement).classList.add('focus')}
                  onBlur={e => (e.target as HTMLInputElement).classList.remove('focus')}
                  name="name"
                  required
                />
              </label>
              <label>
                Age:
                <input
                  class="input-field"
                  type="number"
                  value={this.newDoctor.age}
                  onInput={e => this.handleInputChange(e, 'age')}
                  onFocus={e => (e.target as HTMLInputElement).classList.add('focus')}
                  onBlur={e => (e.target as HTMLInputElement).classList.remove('focus')}
                  name="age"
                  required
                />
              </label>
              <label>
                Specialization:
                <select
                  class="input-field"
                  onInput={e => this.handleInputChange(e, 'specialization')}
                  onFocus={e => (e.target as HTMLSelectElement).classList.add('focus')}
                  onBlur={e => (e.target as HTMLSelectElement).classList.remove('focus')}
                  name="specialization"
                  required
                >
                  <option value="" disabled selected>
                    Select Specialization
                  </option>
                  {Array.from(this.specializationOptions).map(option => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Hospital:
                <select
                  class="input-field"
                  onInput={e => this.handleInputChange(e, 'hospitalName')}
                  onFocus={e => (e.target as HTMLSelectElement).classList.add('focus')}
                  onBlur={e => (e.target as HTMLSelectElement).classList.remove('focus')}
                  name="hospital"
                  required
                >
                  <option value="" disabled selected>
                    Select Hospital
                  </option>
                  {Array.from(this.hospitalOptions).map(option => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Price:
                <input
                  class="input-field"
                  type="number"
                  value={this.newDoctor.pricePerHour}
                  onInput={e => this.handleInputChange(e, 'pricePerHour')}
                  onFocus={e => (e.target as HTMLInputElement).classList.add('focus')}
                  onBlur={e => (e.target as HTMLInputElement).classList.remove('focus')}
                  name="price"
                  required
                />
              </label>
              <label>
                Available:
                <input
                  class="input-field"
                  type="checkbox"
                  checked={this.newDoctor.isAvailable}
                  onInput={e => this.handleInputChange(e, 'isAvailable')}
                  onFocus={e => (e.target as HTMLInputElement).classList.add('focus')}
                  name="available"
                  onBlur={e => (e.target as HTMLInputElement).classList.remove('focus')}
                />
              </label>

              <button type="submit" class="formAdd">
                Add
              </button>
            </form>
            <button onClick={() => this.toggleAddDoctorPopup()} class="formCancel">
              Cancel
            </button>
          </div>
        )}
        <div class="search-options">
          <label>
            Search by:
            <select onChange={e => (this.searchOption = (e.target as HTMLSelectElement).value as 'doctorName' | 'hospitalName' | 'specialization')}>
              <option value="doctorName" selected={this.searchOption === 'doctorName'}>
                Doctor Name
              </option>
              <option value="hospitalName" selected={this.searchOption === 'hospitalName'}>
                Hospital Name
              </option>
              <option value="specialization" selected={this.searchOption === 'specialization'}>
                Specialization
              </option>
            </select>
          </label>
          <input
            type="text"
            placeholder={`Search by ${this.searchOption === 'doctorName' ? 'Doctor' : 'Hospital'} Name`}
            value={this.searchCriteria}
            onInput={e => (this.searchCriteria = (e.target as HTMLInputElement).value)}
          />
          <button onClick={() => this.toggleSortOrder()}>Sort by Price {this.sortOption === 'asc' ? 'Ascending' : 'Descending'}</button>
        </div>
        <div class="doctor-grid">
          {sortedDoctors.map(doctor => (
            <div class="doctor-card" key={doctor.id}>
              <div>
                <strong>{doctor.name}</strong>
                <br />
                ID: {doctor.id}
                <br />
                Age: {doctor.age}
                <br />
                Specialization: {doctor.specialization}
                <br />
                Hospital: <span id={`hospital-${doctor.id}`}>{doctor.hospitalName}</span>
                <br />
                Price: ${doctor.pricePerHour}
                <br />
                Available: {doctor.isAvailable ? 'Yes' : 'No'}
              </div>
              <div>
                <button onClick={() => this.editHospital(doctor.id)}>Edit</button>
                <button onClick={() => this.deleteDoctor(doctor.id)}>Delete</button> {/* Pass the doctor's id here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
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
