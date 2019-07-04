export function twoDecimalPlaces (str) {
  return str.substr(0, str.indexOf('.') + 3)
}
