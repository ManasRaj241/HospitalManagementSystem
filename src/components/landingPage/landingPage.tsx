import { Component, h } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landingPage.css',
  shadow: true,
})
export class LandingPage {
  render() {
    return (
      <div class="landing-page">
        <header>
          <h1>Welcome to Our Hospital</h1>
          <p>Your Trusted Healthcare Partner</p>
        </header>
        <main>
          <section class="about-us">
            <p>
              <b>About Us</b>
              <ul>
                <li>
                  Welcome to our Hospital Management System we are committed to providing the highest quality healthcare services to our patients while ensuring the smooth and
                  efficient operation of our facility.
                </li>
                <li>
                  Our Hospital Management System is designed to streamline every aspect of healthcare management, from patient registration and appointment scheduling to billing
                  and inventory management.
                </li>
              </ul>
              <br />
              <b>Our Mission</b>
              <br />
              <ul>
                <li>Our mission is to make healthcare accessible, efficient, and patient-centric.</li>
                <li>We believe in leveraging technology to improve patient care and enhance the overall healthcare experience.</li>
              </ul>
              <br />
              <b>Patient-Centric Care</b>
              <br />
              <ul>
                <li>At the core of our Hospital Management System is the commitment to patient-centric care.</li>
                <li>We understand that every patient is unique and deserves personalized attention.</li>
                <li>
                  Our system allows healthcare providers to access patient records instantly, ensuring that they have the most up-to-date information to make informed decisions.
                </li>
                <li>Patients can easily schedule appointments, view their medical history, and communicate with their healthcare team through our secure portal.</li>
              </ul>
              <br />
              <b>Efficient Workflow</b>
              <br />
              <ul>
                <li>Efficiency is essential in a healthcare setting, and our system is designed to optimize workflow processes.</li>
                <li>With our system, healthcare providers can manage appointments, track patient admissions and discharges, and schedule surgeries with ease.</li>
                <li>Our automated billing and insurance claim processing reduce administrative overhead, allowing staff to focus more on patient care. </li>
              </ul>
              <br />
              <b>Inventory Management</b>
              <br />
              <ul>
                <li>Managing medical supplies and equipment is critical in a hospital.</li>
                <li>Our Hospital Management System includes robust inventory management features that help in tracking and restocking medical supplies efficiently.</li>
                <li>This ensures that healthcare providers have the necessary resources on hand to deliver the best care possible.</li>
              </ul>
              <b>Analytics and Reporting</b>
              <br />
              <ul>
                <li>Data-driven decisions are crucial in healthcare.</li>
                <li>
                  Our system offers advanced analytics and reporting tools that enable administrators and healthcare professionals to monitor key performance indicators, track
                  patient outcomes, and identify areas for improvement.
                </li>
                <li>This data-driven approach enhances the quality of care provided and allows for continuous improvement.</li>
              </ul>
              <br />
              <b>Security and Compliance</b>
              <br />
              <ul>
                <li>We understand the importance of maintaining the highest standards of security and compliance in healthcare.</li>
                <li>Our system is built with robust security measures to protect patient data and ensure HIPAA compliance.</li>
                <li>Rest assured, your sensitive medical information is in safe hands.</li>
              </ul>
              <br />
              <b>24/7 Support</b>
              <br />
              <ul>
                <li>We are here for you around the clock.</li>
                <li>Our dedicated support team is available 24/7 to assist with any inquiries, technical issues, or emergencies.</li>
                <li>Your health and well-being are our top priority.</li>
              </ul>
            </p>
          </section>

          <section class="services">
            <h2>Our Services</h2>
            <ul>
              <li>Cardiology</li>
              <li>Orthopedics</li>
              <li>Neurology</li>
              <li>Obstetrics</li>
              <li>Pediatrics</li>
              <li>Emergency Care</li>
            </ul>
          </section>

          <section class="appointments">
            <h2>Book an Appointment</h2>
            <p>You can easily schedule appointments with our doctors online. We provide flexible options to fit your schedule.</p>
            <a href="/booking" class="btn">
              Book Now
            </a>
          </section>

          <section class="contact">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
            <address>
              123 Main Street
              <br />
              City, State ZIP
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@hospital.com
            </address>
          </section>
        </main>
      </div>
    );
  }
}
