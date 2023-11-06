import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'admin-feedback',
  styleUrl: 'admin-feedback.css',
  shadow: true,
})
export class AdminFeedback {
  @State() feedbackData: Feedback[] = [];
  @State() selectedFeedback: Feedback | null = null;

  componentWillLoad() {
    this.fetchFeedbackData();
  }

  async fetchFeedbackData() {
    try {
      const response = await fetch('https://localhost:7183/api/feedbacks');
      if (response.ok) {
        const data = await response.json();
        this.feedbackData = data;
        console.log(this.feedbackData);
      } else {
        console.error('Failed to fetch feedback data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching feedback data:', error);
    }
  }

  viewFeedback(feedback: Feedback) {
    this.selectedFeedback = feedback;
  }

  closePopup() {
    this.selectedFeedback = null;
  }

  render() {
    return (
      <div class="feedback-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned Doctor</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {this.feedbackData.map(feedback => (
              <tr key={feedback.patientName}>
                <td>{feedback.patientName}</td>
                <td>{feedback.doctorName}</td>
                <td>
                  <button onClick={() => this.viewFeedback(feedback)}>View Feedback</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.selectedFeedback && (
          <div class="feedback-popup">
            <div class="popup-content">
              <button class="close-button" onClick={() => this.closePopup()}>
                X
              </button>
              <h2>Feedback</h2>
              <p>{this.selectedFeedback.feedback}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

interface Feedback {
  patientName: string;
  doctorName: string;
  feedback: string;
}
