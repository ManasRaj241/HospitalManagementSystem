import type { Components, JSX } from "../types/components";

interface HospitalFooter extends Components.HospitalFooter, HTMLElement {}
export const HospitalFooter: {
  prototype: HospitalFooter;
  new (): HospitalFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
