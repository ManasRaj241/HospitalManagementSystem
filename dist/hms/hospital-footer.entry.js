import { r as registerInstance, e as getAssetPath, h } from './index-d6626b81.js';

const footerCss = ".hospital-footer{background-color:#333;color:#fff;padding:40px 0;text-align:center}.hospital-logo img{max-width:120px;margin-bottom:20px}.footer-content{display:flex;justify-content:space-around;flex-wrap:wrap}.footer-section{flex:1;text-align:left;margin:0 20px}.footer-section h3{font-size:20px;margin-bottom:15px}.footer-section p{font-size:16px;margin-bottom:20px}.footer-section ul{list-style:none;padding:0}.footer-section ul li{margin-bottom:10px}.social-icons img{max-width:30px;margin-right:10px}.nav-links{list-style:none;margin:0;padding:0;display:flex}.nav-links li{margin:0 20px}.nav-links a{text-decoration:none;color:#fff;font-weight:bold;font-size:18px;transition:color 0.3s}.nav-links a:hover{color:#ff5733}.social-icons{display:flex;justify-content:left}";

const HospitalFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.logoImage = 'logo.jpg';
  }
  render() {
    const logoImageSrc = getAssetPath(`../assets/${this.logoImage}`);
    const logoImgElement = h("img", { src: logoImageSrc, alt: "logo", class: "logoStencil" });
    return (h("footer", { class: "hospital-footer" }, h("div", { class: "hospital-logo" }, logoImgElement), h("div", { class: "footer-content" }, h("div", { class: "footer-section" }, h("h3", null, "Contact Us"), h("p", null, "123 Main Street", h("br", null), "City, State ZIP", h("br", null), "Phone: (123) 456-7890")), h("div", { class: "footer-section" }, h("h3", null, "Quick Links"), h("ul", { class: "nav-links" }, h("li", null, h("a", { href: "#" }, "Home")), h("li", null, h("a", { href: "#" }, "Services")), h("li", null, h("a", { href: "#" }, "Doctors")), h("li", null, h("a", { href: "#" }, "Appointments")))), h("div", { class: "footer-section" }, h("h3", null, "Follow Us"), h("ul", { class: "social-icons" }, h("li", null, h("a", { href: "#" }, h("img", { src: "/assets/facebook-icon.png", alt: "Facebook" }))), h("li", null, h("a", { href: "#" }, h("img", { src: "/assets/twitter-icon.png", alt: "Twitter" }))), h("li", null, h("a", { href: "#" }, h("img", { src: "/assets/instagram-icon.jfif", alt: "Instagram" }))))))));
  }
};
HospitalFooter.style = footerCss;

export { HospitalFooter as hospital_footer };

//# sourceMappingURL=hospital-footer.entry.js.map