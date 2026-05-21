const UNAUTHORIZED_EVENT = "cdc:auth:unauthorized";

export const emitUnauthorized = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
};

export const onUnauthorized = (handler: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  const listener = () => handler();
  window.addEventListener(UNAUTHORIZED_EVENT, listener);
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, listener);
};
