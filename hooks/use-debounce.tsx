export function useDebounce(fn: (...args: any[]) => void, delay = 400) {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
