import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'admin-hospital',
  styleUrl: 'admin-hospital.css',
  shadow: true,
})
export class ManageHospital {
  @State() data = [];
  @State() editingItemIndex: number | null = null;
  @State() editedDescription = '';
  @State() isAddHospitalPopupVisible = false;
  @State() newHospitalName = '';
  @State() newHospitalDescription = '';

  async componentDidLoad() {
    try {
      const response = await fetch('https://localhost:7183/api/Hospitals');
      if (response.ok) {
        const data = await response.json();
        this.data = data;
        console.log(this.data);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  async handleUpdate(index: number, updatedItem: any) {
    try {
      const response = await fetch(`https://localhost:7183/api/Hospitals/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedData = [...this.data];
        updatedData[index] = updatedItem;
        this.data = updatedData;
        this.editingItemIndex = null;
      } else {
        console.error('Failed to update data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while updating data:', error);
    }
  }

  async handleDelete(index: number) {
    const itemToDelete = this.data[index];
    const itemId = itemToDelete.id;

    try {
      const response = await fetch(`https://localhost:7183/api/Hospitals/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = [...this.data];
        updatedData.splice(index, 1);
        this.data = updatedData;
      } else {
        console.error('Failed to delete data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting data:', error);
    }
  }

  handleEdit(index: number) {
    this.editingItemIndex = index;
    this.editedDescription = this.data[index].hospitalServices;
  }
  toggleAddHospitalPopup() {
    this.isAddHospitalPopupVisible = !this.isAddHospitalPopupVisible;
  }

  async addHospital() {
    const newHospital = {
      hospitalName: this.newHospitalName,
      hospitalServices: this.newHospitalDescription,
    };

    try {
      const response = await fetch('https://localhost:7183/api/Hospitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHospital),
      });

      if (response.ok) {
        const createdHospital = await response.json();
        this.data = [...this.data, createdHospital];
        this.toggleAddHospitalPopup();
      } else {
        console.error('Failed to add hospital:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding hospital:', error);
    }

    this.newHospitalName = '';
    this.newHospitalDescription = '';
  }

  render() {
    return (
      <div>
        <h1>Manage Hospitals</h1>
        <button class="addBtn" onClick={() => this.toggleAddHospitalPopup()}>
          Add Hospital
        </button>
        {this.isAddHospitalPopupVisible && (
          <div class="popup">
            <h2>Add Hospital</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.addHospital();
              }}
            >
              <label>
                Name:
                <input type="text" value={this.newHospitalName} onInput={e => (this.newHospitalName = (e.target as HTMLInputElement).value)} required />
              </label>
              <label>
                Description:
                <input type="text" value={this.newHospitalDescription} onInput={e => (this.newHospitalDescription = (e.target as HTMLInputElement).value)} required />
              </label>
              <button type="submit" class="formAdd">
                Add
              </button>
            </form>
            <button onClick={() => this.toggleAddHospitalPopup()} class="formCancel">
              Cancel
            </button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Serial Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.data.map((item, index) => (
              <tr key={index}>
                <td>{item.hospitalName}</td>
                <td>
                  {this.editingItemIndex === index ? (
                    <input type="text" style={{ width: `460px` }} value={this.editedDescription} onInput={e => (this.editedDescription = (e.target as HTMLInputElement).value)} />
                  ) : (
                    <span class="description-label">{item.hospitalServices}</span>
                  )}
                </td>
                <td>{item.id}</td>
                <td>
                  {this.editingItemIndex === index ? (
                    <button
                      class="saveBtn"
                      onClick={() =>
                        this.handleUpdate(index, {
                          ...item,
                          hospitalServices: this.editedDescription,
                        })
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <div>
                      <button onClick={() => this.handleEdit(index)} class="editBtn">
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(index)} class="dltBtn">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
