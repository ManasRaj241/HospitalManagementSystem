import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'admin-navbar',
  styleUrl: 'admin-navbar.css',
  shadow: true,
})
export class AdminNavBar {
  logoImage = 'logo.jpg';

  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const logoImgElement = <img src={logoImageSrc} alt="logo" class="logoStencil" />;

    return (
      <nav class="nav-bar">
        <div class="logo">{logoImgElement}</div>
        <ul class="nav-links">
          <li>
            <a href="/admin">Home</a>
          </li>
          <li>
            <a href="/admin/hospital">Manage Hospitals</a>
          </li>
          <li>
            <a href="/admin/doctors">Manage Doctors</a>
          </li>
          <li>
            <a href="/admin/bookings">Manage booking</a>
          </li>
          <li>
            <a href="/admin/feedback">View Feedbacks</a>
          </li>
          <li>
            <a href="/add">Add Admin</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}
