var arr1 = [1, 3, 9, 4];

var arr2 = [];

var current;

var x;

for (var i = 0; i < arr1.length; i++){
  current = i;
  var product_counter = 0;
  console.log('my current is '+ current)
  for (var j = 0; j < arr1.length; j++){    
    console.log('my j is '+ j)
    if (j !== current){
      product_counter += 1;
      console.log('hell ya, j: '+j+' does not equal current: '+ current)
      if (product_counter === 1){
        console.log('the first time\'s the best, product counter '+product_counter);
        x = arr1[j];
      }
      else  {
        console.log('after the first, it\'s still OK '+product_counter);
        x *= arr1[j];
      }
    }    
  }
  arr2.push(x);
}

console.log(arr2)