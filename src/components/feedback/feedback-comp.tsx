import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'feedback-component',
  styleUrl: 'feedback-component.css',
  shadow: true,
})
export class FeedbackComponent {
  @State() name: string = '';
  @State() email: string = '';
  @State() phoneNumber: string = '';
  @State() review: string = '';
  @State() doctorName: string = '';

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
        } else {
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
    return (
      <div>
        <div class="feedback-container">
          <h1>Feedback Form</h1>
          <form onSubmit={event => this.handleSubmit(event)}>
            <label>
              Name:
              <input
                type="text"
                value={this.name}
                onInput={event => this.handleInputChange(event, 'name')}
                onFocus={event => this.handleInputFocus(event)}
                onBlur={event => this.handleInputBlur(event)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={this.email}
                onInput={event => this.handleInputChange(event, 'email')}
                onFocus={event => this.handleInputFocus(event)}
                onBlur={event => this.handleInputBlur(event)}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                value={this.phoneNumber}
                onInput={event => this.handleInputChange(event, 'phoneNumber')}
                onFocus={event => this.handleInputFocus(event)}
                onBlur={event => this.handleInputBlur(event)}
              />
            </label>
            <label>
              Enter Doctor Name:
              <input
                type="text"
                value={this.doctorName}
                onInput={event => this.handleInputChange(event, 'doctorName')}
                onFocus={event => this.handleInputFocus(event)}
                onBlur={event => this.handleInputBlur(event)}
              />
            </label>
            <label>
              Review:
              <textarea
                value={this.review}
                onInput={event => this.handleInputChange(event, 'review')}
                onFocus={event => this.handleInputFocus(event)}
                onBlur={event => this.handleInputBlur(event)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
