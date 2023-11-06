import type { Components, JSX } from "../types/components";

interface AdminHospital extends Components.AdminHospital, HTMLElement {}
export const AdminHospital: {
  prototype: AdminHospital;
  new (): AdminHospital;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
