var LinkedList = function() {
    this.length = 0;
    this.head = null;
};

LinkedList.prototype.insert = function(index, value) {
    if (index < 0 || index > this.length) {
        throw new Error('Index error');
    }

    var newNode = {
        value: value
    };

    if (index == 0) {
        newNode.next = this.head;
        this.head = newNode;
    }
    else {
        // Find the node which we want to insert after
        var node = this._find(index - 1);
        newNode.next = node.next;
        node.next = newNode;
    }

    this.length++;
};

LinkedList.prototype._find = function(index) {
    var node = this.head;
    for (var i=0; i<index; i++) {
//         console.log('each node')
//         console.log(node)
        node = node.next;
    }
    return node;
};

var linked = new LinkedList();
linked.insert(0, 'first');
linked.insert(1, 'second');
linked.insert(2, 'third');
linked.insert(3, 'fourth');
linked.insert(4, 'fifth');
linked.insert(5, 'sixth');
linked.insert(5, 'seventh');
var length = linked.length;
var middle = length/2;
var remainder = middle%1;
// if (remainder !== 0){
//   middle = Math.floor(middle);
// }
var count = linked.length;


var linked_reverse = new LinkedList();
var j = length;

var springer = 0;

// console.log(linked._find(j - 1));

for (var i = 0; i < middle; i++){
  j -= 1;
  console.log('i is at '+ i);
  console.log('j is at '+ j);
  if (i != j){
    if (i == 0){
//       var first = linked._find(j);
//       linked.head = first;
      var second = linked._find(1);
      console.log(second)
//       console.log(linked.head.next);     
      
      console.log('just starting');
      console.log('j '+j+' is first.   i is '+i+' last')
      
    }
    else {      
      
      springer = i - 1;
      console.log('jump back to '+ springer+' for i\.next');
      springer = j + 1;
      console.log('jump forward to '+springer+' for j\.next')
    }
    console.log('i '+i+' does not equal j '+j+'')
  }
  else {
    console.log('i '+i+' does indeed equal j '+j+'');
    springer = i + 1;
    console.log('here next one forward to '+ springer)
  }
  console.log('i is : '+i+' while j is : '+j);
}

// for (var i = count - 1; i > 0; i--){
//   var right_justified = linked._find(i)
//   for (var j = count - 2; j >=0; j--){
//     var right_justified_trailing = linked._find(j)
//   }
  
// }