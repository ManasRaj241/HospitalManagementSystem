import { r as registerInstance, h } from './index-d6626b81.js';

const adminFeedbackCss = ".feedback-table{margin:20px}table{width:100%;border-collapse:collapse;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}th,td{padding:10px;text-align:left;border-bottom:1px solid #ccc}th{background-color:#f2f2f2;font-weight:bold}button{padding:5px 10px;background-color:#007bff;color:#fff;border:none;cursor:pointer}button:hover{background-color:#0056b3}.feedback-popup{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;align-items:center}.popup-content{background-color:#fff;padding:20px;box-shadow:0 0 10px rgba(0, 0, 0, 0.3);border-radius:5px;text-align:center;position:relative}.close-button{position:absolute;top:10px;right:10px;background-color:Red;border:none;font-size:16px;cursor:pointer}";

const AdminFeedback = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.feedbackData = [];
    this.selectedFeedback = null;
  }
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
      }
      else {
        console.error('Failed to fetch feedback data:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching feedback data:', error);
    }
  }
  viewFeedback(feedback) {
    this.selectedFeedback = feedback;
  }
  closePopup() {
    this.selectedFeedback = null;
  }
  render() {
    return (h("div", { class: "feedback-table" }, h("table", null, h("thead", null, h("tr", null, h("th", null, "Name"), h("th", null, "Assigned Doctor"), h("th", null, "Feedback"))), h("tbody", null, this.feedbackData.map(feedback => (h("tr", { key: feedback.patientName }, h("td", null, feedback.patientName), h("td", null, feedback.doctorName), h("td", null, h("button", { onClick: () => this.viewFeedback(feedback) }, "View Feedback"))))))), this.selectedFeedback && (h("div", { class: "feedback-popup" }, h("div", { class: "popup-content" }, h("button", { class: "close-button", onClick: () => this.closePopup() }, "X"), h("h2", null, "Feedback"), h("p", null, this.selectedFeedback.feedback))))));
  }
};
AdminFeedback.style = adminFeedbackCss;

export { AdminFeedback as admin_feedback };

//# sourceMappingURL=admin-feedback.entry.js.map