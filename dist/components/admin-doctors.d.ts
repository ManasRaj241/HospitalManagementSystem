import type { Components, JSX } from "../types/components";

interface AdminDoctors extends Components.AdminDoctors, HTMLElement {}
export const AdminDoctors: {
  prototype: AdminDoctors;
  new (): AdminDoctors;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
