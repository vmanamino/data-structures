// var arr2 = [2, 3, 4, 6, 9, 10];

// var arr1 = [1, 2, 3, 11, 12];

var arr2 = [1, 3, 4, 5, 9, 20, 27, 28, 35, 39];
var arr1 = [2, 3, 3, 3, 10, 15, 17, 25, 30, 32];

// var arr1 = [1, 3, 6, 8, 11];
// var arr2 = [2, 3, 5, 8, 9, 10];

// var arr3 = [];

// var target_length = arr1.length;
// var offset = 0;

// var diff = arr2.length - arr1.length;

var join = [];

var zipper = function(upper, lower){  
  
  var target_length = lower.length;
  var offset = 0;
  


  while (offset < arr1.length){
  
    if (offset){
      if (upper[offset] < lower[offset - 1]){
        var join_offset = join.length - 1;
        join.splice(join_offset, 0, upper[offset]);
        join.push(lower[offset])
      }
      else {
        if (upper[offset] <= lower[offset]){
          join.push(upper[offset]);
          join.push(lower[offset]);
        } 
        else {
          join.push(lower[offset]);
          join.push(upper[offset])
        }
      }    
    }
    else {
      if (upper[offset] <= lower[offset]){
        join.push(upper[offset]);
        join.push(lower[offset]);    
      }
      else {
        join.push(lower[offset]);
        join.push(upper[offset])
      }
    }
   
    offset += 1;
    //   console.log(offset);
  }

  offset = 0;
  var diff = upper.length - lower.length;
  var tail = join.length - 1;
  var remainder = upper.length - diff;

  while (offset < diff){
    if (upper[remainder] < join[tail]){
      join.splice(tail, 0, upper[remainder]); 
      tail += 1;
      remainder += 1;
    }
    else {
      join.push(upper[remainder]);
      tail += 1;
      remainder += 1;
    }
  
    offset += 1;
  }
}

var compareArrays = function(arr1, arr2) {
  var upper, lower;
  if (arr1.length >= arr2.length){
    upper = arr1;
    lower = arr2;
  }
  else {
    upper = arr2;
    lower = arr1;
  }  
  zipper(upper, lower);
  
}

compareArrays(arr1, arr2);
console.log(join)