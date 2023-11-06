import { r as registerInstance, h } from './index-d6626b81.js';

const summeryCompCss = ":host{display:block;font-family:Arial, sans-serif}.summary-container{max-width:800px;margin:100px auto;padding:100px;border:1px solid #ccc;border-radius:8px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);background-color:#ffffff}table{width:100%;border-collapse:collapse}th,td{padding:12px;text-align:left;border-bottom:1px solid #ddd}th{background-color:#f2f2f2;font-weight:bold}tr:hover{background-color:#f5f5f5;transition:background-color 0.3s}.summary-container{font-family:Arial, sans-serif;padding:20px;display:flex;flex-direction:column;align-items:center;text-align:center}.search-form{margin-bottom:20px;display:flex;flex-direction:column;max-width:300px}label{font-weight:bold}input[type=\"text\"]{padding:5px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px}button[type=\"submit\"]{background-color:#007BFF;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer}button[type=\"submit\"]:hover{background-color:#0056b3}.summary-table{width:100%;border-collapse:collapse;max-width:600px;}.summary-table th,.summary-table td{border:1px solid #ccc;padding:8px;text-align:left}.summary-table th{background-color:#f2f2f2;font-weight:bold}";

const SummaryComp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.serialNumber = 0; // Add a serial number variable
    this.data = [];
    this.searchName = '';
    this.filteredData = [];
    this.doctorMap = new Map();
    this.doctorNamesSet = new Set();
  }
  async fetchData() {
    try {
      const response = await fetch('https://localhost:7183/api/bookings');
      if (response.ok) {
        this.data = await response.json();
        this.data.forEach(item => this.doctorNamesSet.add(item.doctorName));
        this.fetchDoctorsData();
      }
      else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    }
    catch (error) {
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
      }
      else {
        console.error('Failed to fetch doctors data:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching doctors data:', error);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.filteredData = this.data.filter(item => item.patientName.toLowerCase().includes(this.searchName.toLowerCase()));
  }
  componentWillLoad() {
    this.fetchData();
  }
  render() {
    return (h("div", { class: "summary-container" }, h("form", { class: "search-form", onSubmit: (e) => this.handleSubmit(e) }, h("label", { htmlFor: "searchName" }, "Search by Name"), h("input", { type: "text", id: "searchName", value: this.searchName, onInput: (e) => (this.searchName = e.target.value), placeholder: "Enter Name" }), h("button", { type: "submit" }, "Submit")), h("table", null, h("thead", null, h("tr", null, h("th", null, "Sl No"), h("th", null, "Hospital Name"), h("th", null, "Assigned Doctor"), h("th", null, "Status"))), h("tbody", null, this.filteredData.map((item, index) => (h("tr", { key: item.doctorName }, h("td", null, ++this.serialNumber), " ", this.doctorMap.has(item.doctorName) && (h("tr", null, h("td", null), h("td", null, this.doctorMap.get(item.doctorName)), h("td", null), h("td", null))), h("td", null, item.doctorName), h("td", null, item.status))))))));
  }
};
SummaryComp.style = summeryCompCss;

export { SummaryComp as summary_comp };

//# sourceMappingURL=summary-comp.entry.js.map