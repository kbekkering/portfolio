function getUnique (arr, key) {
  return arr.map((video) => video[key]).filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}

module.exports = getUnique;
