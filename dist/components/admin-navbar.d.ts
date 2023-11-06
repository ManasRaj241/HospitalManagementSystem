import type { Components, JSX } from "../types/components";

interface AdminNavbar extends Components.AdminNavbar, HTMLElement {}
export const AdminNavbar: {
  prototype: AdminNavbar;
  new (): AdminNavbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
