import { r as registerInstance, h } from './index-d6626b81.js';

const loginCompCss = "body{display:flex;flex-direction:column;margin:0;justify-content:space-between;min-height:100vh}.login-register{display:flex;flex-direction:column;align-items:center;padding:20px;background-color:#f0f0f0;border-radius:10px;box-shadow:0 0 10px rgba(0, 0, 0, 0.2);width:300px;margin:125px auto;text-align:center;flex-grow:1}.form-actions{display:flex;flex-direction:column;align-items:center;margin-top:10px}.switch-button{margin-top:10px}h2{font-size:24px;color:#333;margin-bottom:20px;text-transform:uppercase}.form-group{margin-bottom:20px}label{display:block;font-size:14px;color:#333;margin-bottom:5px}input[type=\"text\"],input[type=\"password\"],input[type=\"email\"],input[type=\"tel\"]{width:100%;padding:10px;border:1px solid #ccc;border-radius:5px;font-size:16px}button{background-color:#007bff;color:#fff;font-size:16px;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease}button:hover{background-color:#0056b3}.switch-button:hover{background-color:#999}@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.page-content{flex-grow:1;display:flex;justify-content:center;align-items:center}";

const LoginRegister = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isRegistering = false;
    this.username = '';
    this.password = '';
    this.email = '';
    this.phoneNumber = '';
  }
  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }
  handleUsernameChange(event) {
    this.username = event.target.value;
  }
  handlePasswordChange(event) {
    this.password = event.target.value;
  }
  handleEmailChange(event) {
    this.email = event.target.value;
  }
  handlePhoneNumberChange(event) {
    this.phoneNumber = event.target.value;
  }
  async handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7183/api/UserDetailsOfHMS');
      if (response.ok) {
        const userData = await response.json();
        const user = userData.find(user => user.name === this.username && user.password === this.password);
        if (user) {
          if (user.role === 'User') {
            window.location.href = 'http://localhost:3333/home';
          }
          else if (user.role === 'Admin') {
            window.location.href = 'http://localhost:3333/admin';
          }
        }
        else {
          alert('Login failed. Invalid username or password.');
        }
      }
      else {
        console.error('Failed to retrieve user details.');
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const userData = {
      name: this.username,
      password: this.password,
      email: this.email,
      phoneNumber: this.phoneNumber,
      role: 'User',
    };
    try {
      const response = await fetch('https://localhost:7183/api/UserDetailsOfHMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        this.username = '';
        this.password = '';
        this.email = '';
        this.phoneNumber = '';
        alert('Registration successful. You Can Login Now');
      }
      else {
        console.error('Registration failed');
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }
  render() {
    return (h("div", { class: "login-register" }, h("h2", null, this.isRegistering ? 'Register' : 'Login'), h("form", { onSubmit: e => (this.isRegistering ? this.handleSubmit(e) : this.handleLogin(e)) }, h("div", { class: "form-group" }, h("label", { htmlFor: "username" }, "Username"), h("input", { type: "text", id: "username", value: this.username, onInput: e => this.handleUsernameChange(e) })), h("div", { class: "form-group" }, h("label", { htmlFor: "password" }, "Password"), h("input", { type: "password", id: "password", value: this.password, onInput: e => this.handlePasswordChange(e) })), this.isRegistering && (h("div", null, h("div", { class: "form-group" }, h("label", { htmlFor: "email" }, "Email"), h("input", { type: "email", id: "email", value: this.email, onInput: e => this.handleEmailChange(e) })), h("div", { class: "form-group" }, h("label", { htmlFor: "phoneNumber" }, "Phone Number"), h("input", { type: "text", id: "phoneNumber", value: this.phoneNumber, onInput: e => this.handlePhoneNumberChange(e) })))), h("div", { class: "form-actions" }, h("button", { type: "submit" }, this.isRegistering ? 'Register' : 'Login'), h("button", { type: "button", class: "switch-button", onClick: () => this.toggleForm() }, this.isRegistering ? 'Switch to Login' : 'Switch to Register')))));
  }
};
LoginRegister.style = loginCompCss;

export { LoginRegister as login_comp };

//# sourceMappingURL=login-comp.entry.js.map