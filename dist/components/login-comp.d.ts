import type { Components, JSX } from "../types/components";

interface LoginComp extends Components.LoginComp, HTMLElement {}
export const LoginComp: {
  prototype: LoginComp;
  new (): LoginComp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
