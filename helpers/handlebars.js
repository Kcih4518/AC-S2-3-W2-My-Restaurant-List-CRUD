function isTurnOnAddButton(value, value1) {
  return !(value + value1)
}

function isEqual(value, value1) {
  return value === value1
}

module.exports = (isTurnOnAddButton, isEqual)
