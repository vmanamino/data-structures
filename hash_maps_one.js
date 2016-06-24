var example1 = 'madam';

var length = example1.length;

var inner = 0;

var str = '';

var instances = 0;

var count = 0;

while (count < length){
  console.log(count);
  inner = count;
  while (inner < length){
    str += example1.charAt(inner);
    if (example1.charAt(count)==example1.charAt(inner)){
      instances += 1;
    }
    inner++;
  }
  console.log(str);
  console.log('char '+example1.charAt(count));
  console.log(instances+' times');
  instances = 0;
  str = '';
  count++;
}