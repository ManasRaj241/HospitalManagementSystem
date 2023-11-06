import { r as registerInstance, h } from './index-d6626b81.js';

const adminCompCss = ".admin-comp{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:20px}.buttons{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px}.button{background-color:#007bff;color:#fff;font-size:16px;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease;align-self:center;margin:auto 300px}.button:hover{background-color:#0056b3}.image-container{flex-grow:1;display:flex;justify-content:flex-end}.admin-image{max-width:100%;height:auto;border-radius:5px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);animation:fadeIn 1s ease}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.btn{display:inline-block;background:blue;color:#fff;padding:8px 30px;margin:auto;border-radius:10px;transition:background 0.5s;align-items:center}";

const AdminComp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "admin-comp" }, h("div", { class: "buttons" }, h("a", { class: "button btn", href: "/admin/hospital" }, "Manage Hospital"), h("a", { class: "button btn", href: "/admin/doctors" }, "Manage Doctors"), h("a", { class: "button btn", href: "/admin/bookings" }, "All booking details"), h("a", { class: "button btn", href: "/admin/feedback" }, "View All Feedbacks"), h("a", { class: "button btn", href: "/admin/Add" }, "Add New Admin")), h("div", { class: "image-container" }, h("img", { src: "/assets/hospitalAdmin.jfif", alt: "Admin Image", class: "admin-image" }))));
  }
};
AdminComp.style = adminCompCss;

export { AdminComp as admin_comp };

//# sourceMappingURL=admin-comp.entry.js.map