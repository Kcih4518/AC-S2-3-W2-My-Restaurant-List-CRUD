const handlebarsHelpers = {
  isTurnOnAddButton: function (value, value1) {
    return !(value + value1)
  },

  isEqual: function (value, value1) {
    return value === value1
  }
}

module.exports = handlebarsHelpers
