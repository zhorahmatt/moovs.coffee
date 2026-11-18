import type Lenis from "lenis";

/** The single smooth-scroll instance, shared so UI (e.g. the mobile menu) can pause it. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
