import { r as registerInstance, h } from './index-d6626b81.js';

const feedbackComponentCss = ":host{display:block;font-family:Arial, sans-serif;max-width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.feedback-container{max-width:500px;padding:7rem;border:1px solid #ccc;border-radius:4px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}form{display:grid;gap:1rem}label{font-weight:bold}input,textarea{width:100%;padding:0.5rem;font-size:1rem;border:1px solid #ccc;border-radius:4px;transition:border-color 0.3s, box-shadow 0.3s}input:focus,textarea:focus{border-color:#007bff;box-shadow:0 0 5px rgba(0, 123, 255, 0.5)}.focused label{color:#007bff;transform:translateY(-1.5em);font-size:0.9rem}button{background-color:#007bff;color:white;border:none;padding:0.5rem 1rem;font-size:1rem;border-radius:4px;cursor:pointer;transition:background-color 0.3s}button:hover{background-color:#0056b3}h1{text-align:center;justify-content:center}";

const FeedbackComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.email = '';
    this.phoneNumber = '';
    this.review = '';
    this.doctorName = '';
  }
  handleInputChange(event, field) {
    this[field] = event.target.value;
  }
  handleInputFocus(event) {
    event.target.parentElement.classList.add('focused');
  }
  handleInputBlur(event) {
    if (event.target.value === '') {
      event.target.parentElement.classList.remove('focused');
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    // Create a feedback object
    const feedbackData = {
      patientName: this.name,
      doctorName: this.doctorName,
      feedback: this.review,
    };
    // Make a POST request
    fetch('https://localhost:7183/api/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then(response => {
      if (response.ok) {
        // Handle success
        alert('Feedback submitted successfully.');
        // Clear form fields after successful submission
        this.name = '';
        this.email = '';
        this.phoneNumber = '';
        this.review = '';
        this.doctorName = '';
      }
      else {
        // Handle errors
        alert('Feedback submission failed.');
      }
    })
      .catch(error => {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    });
  }
  render() {
    return (h("div", null, h("div", { class: "feedback-container" }, h("h1", null, "Feedback Form"), h("form", { onSubmit: event => this.handleSubmit(event) }, h("label", null, "Name:", h("input", { type: "text", value: this.name, onInput: event => this.handleInputChange(event, 'name'), onFocus: event => this.handleInputFocus(event), onBlur: event => this.handleInputBlur(event) })), h("label", null, "Email:", h("input", { type: "email", value: this.email, onInput: event => this.handleInputChange(event, 'email'), onFocus: event => this.handleInputFocus(event), onBlur: event => this.handleInputBlur(event) })), h("label", null, "Phone Number:", h("input", { type: "tel", value: this.phoneNumber, onInput: event => this.handleInputChange(event, 'phoneNumber'), onFocus: event => this.handleInputFocus(event), onBlur: event => this.handleInputBlur(event) })), h("label", null, "Enter Doctor Name:", h("input", { type: "text", value: this.doctorName, onInput: event => this.handleInputChange(event, 'doctorName'), onFocus: event => this.handleInputFocus(event), onBlur: event => this.handleInputBlur(event) })), h("label", null, "Review:", h("textarea", { value: this.review, onInput: event => this.handleInputChange(event, 'review'), onFocus: event => this.handleInputFocus(event), onBlur: event => this.handleInputBlur(event) })), h("button", { type: "submit" }, "Submit")))));
  }
};
FeedbackComponent.style = feedbackComponentCss;

export { FeedbackComponent as feedback_component };

//# sourceMappingURL=feedback-component.entry.js.map