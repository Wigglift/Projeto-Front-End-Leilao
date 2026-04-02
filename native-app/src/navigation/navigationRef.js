import { createRef } from "react";

export const navigationRef = createRef();

export function resetToLogin() {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
}
