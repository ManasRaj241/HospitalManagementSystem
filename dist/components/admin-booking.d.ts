import type { Components, JSX } from "../types/components";

interface AdminBooking extends Components.AdminBooking, HTMLElement {}
export const AdminBooking: {
  prototype: AdminBooking;
  new (): AdminBooking;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
