export function sliceArray<T>(
  arr: T[] | undefined,
  beginning: number,
  end: number
) {
  if (!arr || arr == null) return undefined

  return arr?.slice(beginning, end)
}
