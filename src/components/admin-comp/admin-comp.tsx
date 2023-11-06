import { Component, h } from '@stencil/core';

@Component({
  tag: 'admin-comp',
  styleUrl: 'admin-comp.css',
  shadow: true,
})
export class AdminComp {
  render() {
    return (
      <div class="admin-comp">
        <div class="buttons">
          <a class="button btn" href="/admin/hospital">
            Manage Hospital
          </a>
          <a class="button btn" href="/admin/doctors">
            Manage Doctors
          </a>
          <a class="button btn" href="/admin/bookings">
            All booking details
          </a>
          <a class="button btn" href="/admin/feedback">
            View All Feedbacks
          </a>
          <a class="button btn" href="/admin/Add">
            Add New Admin
          </a>
        </div>
        <div class="image-container">
          <img src="/assets/hospitalAdmin.jfif" alt="Admin Image" class="admin-image" />
        </div>
      </div>
    );
  }
}
