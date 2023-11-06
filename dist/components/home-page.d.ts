import type { Components, JSX } from "../types/components";

interface HomePage extends Components.HomePage, HTMLElement {}
export const HomePage: {
  prototype: HomePage;
  new (): HomePage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
