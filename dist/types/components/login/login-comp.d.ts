export declare class LoginRegister {
  isRegistering: boolean;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  toggleForm(): void;
  handleUsernameChange(event: Event): void;
  handlePasswordChange(event: Event): void;
  handleEmailChange(event: Event): void;
  handlePhoneNumberChange(event: Event): void;
  handleLogin(event: Event): Promise<void>;
  handleSubmit(event: Event): Promise<void>;
  render(): any;
}
