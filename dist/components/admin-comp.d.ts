import type { Components, JSX } from "../types/components";

interface AdminComp extends Components.AdminComp, HTMLElement {}
export const AdminComp: {
  prototype: AdminComp;
  new (): AdminComp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
