function sortByKeys(arr, keyA, keyB) {
  let sortedArr = arr.sort(function(video1, video2) {
    if (video1[keyA] > video2[keyA]) { 
      return -1; 
    };
    if (video1[keyA] < video2[keyA]) { 
      return 1; 
    };
    if (video1[keyB] > video2[keyB]) { 
      return 1; 
    };
    if (video1[keyB] < video2[keyB]) { 
      return -1; 
    };
  });
  return sortedArr;
}

module.exports = sortByKeys;
