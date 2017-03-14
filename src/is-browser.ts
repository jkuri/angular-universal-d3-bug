export let isBrowser = typeof window === 'object'
  && typeof document === 'object'
  && document.nodeType === 9;
