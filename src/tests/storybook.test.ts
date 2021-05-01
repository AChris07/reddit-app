import initStoryshots from "@storybook/addon-storyshots";

global.IntersectionObserver = class MockIntersectionObserver
  implements IntersectionObserver {
  readonly root: Element | null = null;

  readonly rootMargin: string = "";

  readonly thresholds: ReadonlyArray<number> = [];

  disconnect: () => void = () => null;

  observe: (target: Element) => void = () => null;

  takeRecords: () => IntersectionObserverEntry[] = () => [];

  unobserve: (target: Element) => void = () => null;
};

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: global.IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: global.IntersectionObserver,
});

initStoryshots();
