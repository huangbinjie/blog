declare const require: (module: string) => any
declare module "callbag-basics" {
  export const pipe: any
  export const map: any
  export const fromPromise: any
}
declare module "callbag-flat-map-operator" {
  export default switchMap
}
type Optional<T> = T | null | undefined
