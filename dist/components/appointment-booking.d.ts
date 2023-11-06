import type { Components, JSX } from "../types/components";

interface AppointmentBooking extends Components.AppointmentBooking, HTMLElement {}
export const AppointmentBooking: {
  prototype: AppointmentBooking;
  new (): AppointmentBooking;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
