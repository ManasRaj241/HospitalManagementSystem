import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  styleUrl: 'navbar.css',
  shadow: true,
})
export class NavBar {
  logoImage = 'logo.jpg';

  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const logoImgElement = <img src={logoImageSrc} alt="logo" class="logoStencil" />;

    return (
      <nav class="nav-bar">
        <div class="logo">{logoImgElement}</div>
        <ul class="nav-links">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/booking">Book Appointment</a>
          </li>
          <li>
            <a href="/summary">Summery</a>
          </li>
          <li>
            <a href="/feedback">Feedback</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}
