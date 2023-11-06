import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'login-comp',
  styleUrl: 'login-comp.css',
  shadow: true,
})
export class LoginRegister {
  @State() isRegistering = false;
  @State() username = '';
  @State() password = '';
  @State() email = '';
  @State() phoneNumber = '';

  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }

  handleUsernameChange(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  handlePasswordChange(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  handleEmailChange(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  handlePhoneNumberChange(event: Event) {
    this.phoneNumber = (event.target as HTMLInputElement).value;
  }

  async handleLogin(event: Event) {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7183/api/UserDetailsOfHMS');
      if (response.ok) {
        const userData = await response.json();
        const user = userData.find(user => user.name === this.username && user.password === this.password);

        if (user) {
          if (user.role === 'User') {
            window.location.href = 'http://localhost:3333/home';
          } else if (user.role === 'Admin') {
            window.location.href = 'http://localhost:3333/admin';
          }
        } else {
          alert('Login failed. Invalid username or password.');
        }
      } else {
        console.error('Failed to retrieve user details.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async handleSubmit(event: Event) {
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
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  render() {
    return (
      <div class="login-register">
        <h2>{this.isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={e => (this.isRegistering ? this.handleSubmit(e) : this.handleLogin(e))}>
          <div class="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={this.username} onInput={e => this.handleUsernameChange(e)} />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={this.password} onInput={e => this.handlePasswordChange(e)} />
          </div>
          {this.isRegistering && (
            <div>
              <div class="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={this.email} onInput={e => this.handleEmailChange(e)} />
              </div>
              <div class="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" value={this.phoneNumber} onInput={e => this.handlePhoneNumberChange(e)} />
              </div>
            </div>
          )}
          <div class="form-actions">
            <button type="submit">{this.isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" class="switch-button" onClick={() => this.toggleForm()}>
              {this.isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
