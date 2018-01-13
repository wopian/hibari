// Adapted from https://github.com/diedsmiling/keys-diff/

/**
 * Checks if variable is an object
 *
 * @param {any} obj
 * @returns {boolean}
 */
const isObj = obj => obj === Object(obj) && !Array.isArray(obj)

/**
 * Get deep value from the object by passing path
 *
 * @param {object} obj
 * @param {array} path
 * @returns {*}
 */
function deepValue (obj, path) {
  let clonedObj = obj
  path.every((val) => {
    clonedObj = clonedObj[val]
    return !!clonedObj
  })
  return clonedObj
}

/**
 * Recursive function to detect differences
 *
 * @param {object} iterated
 * @param {object} investigated
 * @param {array} res
 * @param {array} path
 * @returns {array}
 */
export function seekDiffs (iterated, investigated, res = [], path = []) {
  Object.keys(iterated).forEach(key => {
    const propPath = path.concat(key)
    if (!isObj(iterated[key])) {
      if (!deepValue(investigated, propPath)) res.push(propPath)
    } else return seekDiffs(iterated[key], investigated, res, propPath)
    return true
  })
  return res
}
