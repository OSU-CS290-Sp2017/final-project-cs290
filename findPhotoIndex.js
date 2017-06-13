//Exporting this function so that it can be used in the server.js file
//This function serves the purpose of finding a unique, sequential, ID for a new photo to take
module.exports = function (photoData, storePhotoData) {
  //If there are no current photos, then just return an ID of 0
  if (photoData != null && photoData.length > 1) {

	//Sorting all of the photos so that, when all of the index are in order, we can find gaps
	//in the indexes from photos that were removed, and we can provide an index that will fill
	//that gap.
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

	//Providing the sorted photoData to the caller if they wish to use it
	storePhotoData(photoData);
  
	//Finding any gaps in the data, and returning the ID's in those gaps
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

  return 0;
}

//Used to obtain the numerical value of an index
function parseIndex(index) {
  index = index.replace('/', '');

  if (!isNaN(index)) {
    return Math.floor(index);
  }
  
  return -1;
}

//Using an insertion sort to order all of the photo data
function sortData(photoData, comparitor) {
  //If there is only 1 or less entries, don't bother sorting
  if (photoData != null && photoData.length > 1) {
    
	//Basic insertion sort for loop
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
