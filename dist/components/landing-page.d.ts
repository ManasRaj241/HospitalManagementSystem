import type { Components, JSX } from "../types/components";

interface LandingPage extends Components.LandingPage, HTMLElement {}
export const LandingPage: {
  prototype: LandingPage;
  new (): LandingPage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
