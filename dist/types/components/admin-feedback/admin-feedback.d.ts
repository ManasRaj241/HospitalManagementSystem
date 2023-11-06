export declare class AdminFeedback {
  feedbackData: Feedback[];
  selectedFeedback: Feedback | null;
  componentWillLoad(): void;
  fetchFeedbackData(): Promise<void>;
  viewFeedback(feedback: Feedback): void;
  closePopup(): void;
  render(): any;
}
interface Feedback {
  patientName: string;
  doctorName: string;
  feedback: string;
}
export {};
