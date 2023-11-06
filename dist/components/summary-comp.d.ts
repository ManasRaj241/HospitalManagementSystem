import type { Components, JSX } from "../types/components";

interface SummaryComp extends Components.SummaryComp, HTMLElement {}
export const SummaryComp: {
  prototype: SummaryComp;
  new (): SummaryComp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
