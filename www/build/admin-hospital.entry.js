import { r as registerInstance, h } from './index-d6626b81.js';

const adminHospitalCss = ":host{display:block}h1{font-size:24px;margin-bottom:20px}table{width:100%;border-collapse:collapse;border-radius:5px;overflow:hidden;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}thead{background-color:#f8f8f8}thead th,tbody td{padding:10px;text-align:left}thead th{text-transform:uppercase}tbody tr{transition:background-color 0.3s}tbody tr:hover{background-color:#f0f0f0}input[type=\"text\"]{width:calc(100% - 16px);padding:8px;border:1px solid #ccc;border-radius:3px}button{padding:8px 16px;margin:0 4px;border:none;border-radius:3px;cursor:pointer}button.edit-btn{background-color:#007bff;color:#fff}button.delete-btn{background-color:#dc3545;color:#fff}button.save-btn{background-color:#28a745;color:#fff}button.cancel-btn{background-color:#6c757d;color:#fff}button:disabled{background-color:#ccc;cursor:not-allowed}.editBtn{color:green}.dltBtn{color:red}.saveBtn{color:#28a745}.addBtn{background-color:#28a745;color:white;align-items:end;margin-bottom:20px;margin-left:800px}.addBtn:hover{background-color:green}.formAdd{background-color:rgb(190, 245, 190);margin-top:10px;color:black}.formCancel{background-color:#dc3545;margin-top:10px;color:white;margin-bottom:10px}";

const ManageHospital = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = [];
    this.editingItemIndex = null;
    this.editedDescription = '';
    this.isAddHospitalPopupVisible = false;
    this.newHospitalName = '';
    this.newHospitalDescription = '';
  }
  async componentDidLoad() {
    try {
      const response = await fetch('https://localhost:7183/api/Hospitals');
      if (response.ok) {
        const data = await response.json();
        this.data = data;
        console.log(this.data);
      }
      else {
        console.error('Failed to fetch data from the API');
      }
    }
    catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
  async handleUpdate(index, updatedItem) {
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
      }
      else {
        console.error('Failed to update data:', response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while updating data:', error);
    }
  }
  async handleDelete(index) {
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
      }
      else {
        console.error('Failed to delete data:', response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while deleting data:', error);
    }
  }
  handleEdit(index) {
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
      }
      else {
        console.error('Failed to add hospital:', response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while adding hospital:', error);
    }
    this.newHospitalName = '';
    this.newHospitalDescription = '';
  }
  render() {
    return (h("div", null, h("h1", null, "Manage Hospitals"), h("button", { class: "addBtn", onClick: () => this.toggleAddHospitalPopup() }, "Add Hospital"), this.isAddHospitalPopupVisible && (h("div", { class: "popup" }, h("h2", null, "Add Hospital"), h("form", { onSubmit: e => {
        e.preventDefault();
        this.addHospital();
      } }, h("label", null, "Name:", h("input", { type: "text", value: this.newHospitalName, onInput: e => (this.newHospitalName = e.target.value), required: true })), h("label", null, "Description:", h("input", { type: "text", value: this.newHospitalDescription, onInput: e => (this.newHospitalDescription = e.target.value), required: true })), h("button", { type: "submit", class: "formAdd" }, "Add")), h("button", { onClick: () => this.toggleAddHospitalPopup(), class: "formCancel" }, "Cancel"))), h("table", null, h("thead", null, h("tr", null, h("th", null, "Name"), h("th", null, "Description"), h("th", null, "Serial Number"), h("th", null, "Actions"))), h("tbody", null, this.data.map((item, index) => (h("tr", { key: index }, h("td", null, item.hospitalName), h("td", null, this.editingItemIndex === index ? (h("input", { type: "text", style: { width: `460px` }, value: this.editedDescription, onInput: e => (this.editedDescription = e.target.value) })) : (h("span", { class: "description-label" }, item.hospitalServices))), h("td", null, item.id), h("td", null, this.editingItemIndex === index ? (h("button", { class: "saveBtn", onClick: () => this.handleUpdate(index, Object.assign(Object.assign({}, item), { hospitalServices: this.editedDescription })) }, "Save")) : (h("div", null, h("button", { onClick: () => this.handleEdit(index), class: "editBtn" }, "Edit"), h("button", { onClick: () => this.handleDelete(index), class: "dltBtn" }, "Delete")))))))))));
  }
};
ManageHospital.style = adminHospitalCss;

export { ManageHospital as admin_hospital };

//# sourceMappingURL=admin-hospital.entry.js.map