import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'admin-form',
  styleUrl: 'admin-form.css',
  shadow: true,
})
export class AdminForm {
  @State() name = '';
  @State() password = '';
  @State() email = '';
  @State() phoneNumber = '';

  handleSubmit = async () => {
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
      } else {
        console.error('Error making post request');
      }
    } catch (error) {
      console.error('Error making post request', error);
    }
  };

  render() {
    return (
      <div class="admin-form">
        <h2>Add New Admin</h2>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={this.name} onInput={e => (this.name = (e.target as HTMLInputElement).value)} required />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={this.password} onInput={e => (this.password = (e.target as HTMLInputElement).value)} required />
          </div>
          <div class="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={this.email} onInput={e => (this.email = (e.target as HTMLInputElement).value)} required />
          </div>
          <div class="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" value={this.phoneNumber} onInput={e => (this.phoneNumber = (e.target as HTMLInputElement).value)} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
