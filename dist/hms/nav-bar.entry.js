import { r as registerInstance, e as getAssetPath, h } from './index-d6626b81.js';

const navbarCss = ".nav-bar{background-color:#333;color:#fff;padding:10px 0;display:flex;justify-content:space-between;align-items:center}.logo{margin-left:20px}.logo img{max-width:100px}.nav-links{list-style:none;margin:0;padding:0;display:flex}.nav-links li{margin:0 20px}.nav-links a{text-decoration:none;color:#fff;font-weight:bold;font-size:18px;transition:color 0.3s}.nav-links a:hover{color:#ff5733}";

const NavBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.logoImage = 'logo.jpg';
  }
  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const logoImgElement = h("img", { src: logoImageSrc, alt: "logo", class: "logoStencil" });
    return (h("nav", { class: "nav-bar" }, h("div", { class: "logo" }, logoImgElement), h("ul", { class: "nav-links" }, h("li", null, h("a", { href: "/home" }, "Home")), h("li", null, h("a", { href: "/booking" }, "Book Appointment")), h("li", null, h("a", { href: "/summary" }, "Summery")), h("li", null, h("a", { href: "/feedback" }, "Feedback")), h("li", null, h("a", { href: "/" }, "Logout")))));
  }
};
NavBar.style = navbarCss;

export { NavBar as nav_bar };

//# sourceMappingURL=nav-bar.entry.js.map