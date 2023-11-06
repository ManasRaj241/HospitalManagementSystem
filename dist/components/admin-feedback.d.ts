import type { Components, JSX } from "../types/components";

interface AdminFeedback extends Components.AdminFeedback, HTMLElement {}
export const AdminFeedback: {
  prototype: AdminFeedback;
  new (): AdminFeedback;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
