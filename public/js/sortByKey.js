function sortByKey (arr, key) {
  return arr.sort(function(a, b) {
    let x = a[key]; 
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = sortByKey;
