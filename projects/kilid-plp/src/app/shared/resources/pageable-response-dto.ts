export interface PageableResponseDTO<T> {
  content: T[],

  [key: string]: any,
}
