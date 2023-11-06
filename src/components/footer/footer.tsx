import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'hospital-footer',
  styleUrl: 'footer.css',
  shadow: true,
})
export class HospitalFooter {
  logoImage = 'logo.jpg';
  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const logoImgElement = <img src={logoImageSrc} alt="logo" class="logoStencil" />;

    return (
      <footer class="hospital-footer">
        <div class="hospital-logo">{logoImgElement}</div>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>
              123 Main Street
              <br />
              City, State ZIP
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Doctors</a>
              </li>
              <li>
                <a href="#">Appointments</a>
              </li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <ul class="social-icons">
              <li>
                <a href="#">
                  <img src="/assets/facebook-icon.png" alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/twitter-icon.png" alt="Twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/instagram-icon.jfif" alt="Instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
