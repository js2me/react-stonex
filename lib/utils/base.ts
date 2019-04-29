
export const strictEqual = (a1: any,a2: any) => a1 === a2

export const shallowEqual = (objA: any, objB: any) => {
  if (strictEqual(objA, objB)) return true

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key) || !strictEqual(objA[key], objB[key])) {
      return false
    }
  }

  return true
}
