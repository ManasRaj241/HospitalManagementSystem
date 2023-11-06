import { r as registerInstance, h } from './index-d6626b81.js';

const adminFormCss = ".admin-form{max-width:400px;margin:0 auto;margin-bottom:20px;margin-top:20px;padding:20px;border:2px solid #3498db;border-radius:10px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);background-color:#f2f2f2}h2{color:#db344a;margin-bottom:30px;text-align:center}.form-group{display:flex;flex-direction:column;margin-bottom:15px}label{font-weight:bold;margin-bottom:5px}input{padding:12px;border:1px solid #ccc;border-radius:5px;outline:none;transition:border-color 0.3s;width:300px}input:focus{border-color:#3498db}button{background-color:#3498db;color:white;border:none;border-radius:5px;padding:12px 20px;cursor:pointer;transition:background-color 0.3s;width:100%}button:hover{background-color:#2980b9}";

const AdminForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleSubmit = async () => {
      const data = {
        name: this.name,
        password: this.password,
        email: this.email,
        phoneNumber: this.phoneNumber,
        role: 'Admin',
      };
      try {
        const response = await fetch('https://localhost:7183/api/UserDetailsOfHMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Post request successful');
        }
        else {
          console.error('Error making post request');
        }
      }
      catch (error) {
        console.error('Error making post request', error);
      }
    };
    this.name = '';
    this.password = '';
    this.email = '';
    this.phoneNumber = '';
  }
  render() {
    return (h("div", { class: "admin-form" }, h("h2", null, "Add New Admin"), h("form", { onSubmit: this.handleSubmit }, h("div", { class: "form-group" }, h("label", { htmlFor: "name" }, "Name"), h("input", { type: "text", id: "name", value: this.name, onInput: e => (this.name = e.target.value), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "password" }, "Password"), h("input", { type: "password", id: "password", value: this.password, onInput: e => (this.password = e.target.value), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "email" }, "Email"), h("input", { type: "email", id: "email", value: this.email, onInput: e => (this.email = e.target.value), required: true })), h("div", { class: "form-group" }, h("label", { htmlFor: "phoneNumber" }, "Phone Number"), h("input", { type: "tel", id: "phoneNumber", value: this.phoneNumber, onInput: e => (this.phoneNumber = e.target.value), required: true })), h("button", { type: "submit" }, "Submit"))));
  }
};
AdminForm.style = adminFormCss;

export { AdminForm as admin_form };

//# sourceMappingURL=admin-form.entry.js.map