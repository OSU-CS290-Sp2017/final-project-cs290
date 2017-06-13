module.exports = function (photoData, storePhotoData) {
  if (photoData != null && photoData.length > 1) {

    photoData = sortData(photoData, function(item1, item2) {
      var index1 = parseIndex(item1.index);
	  var index2 = parseIndex(item2.index);

	  if (index1 > index2) {
        return 1;
	  }
	  else if (index1 == index2) {
        return 0;
	  }
	  else {
        return -1;
	  }
    });

	storePhotoData(photoData);
  
    var previousVal = -1;
    for (var i = 0; i < photoData.length; i++) {
      var currentVal = parseIndex(photoData[i].index);

	  if (currentVal > previousVal + 1) {
        return previousVal + 1;
	  }

	  previousVal = currentVal;
    }

    return photoData.length;
  }

  return -1;
}

function parseIndex(index) {
  index = index.replace('/', '');

  if (!isNaN(index)) {
    return Math.floor(index);
  }
  
  return -1;
}

//Using an insertion sort to order all of the photo data
function sortData(photoData, comparitor) {
  if (photoData != null && photoData.length > 1) {
    
	var currentItem;
    for (var i = 1; i < photoData.length; i++) {
	  
	  currentItem = photoData[i];
      for (var j = 0; j < i; j++) {
        
		if (comparitor(currentItem, photoData[j]) <= 0) {
		  photoData.splice(i, 1);
		  photoData.splice(j, 0, currentItem);
		  break;
	    }

	  }

    }
  }

  return photoData;
}
