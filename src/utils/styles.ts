export function mergeStyles(...args: any[]) {
  return Object.assign({}, ...args.filter((arg) => !!arg));
}
