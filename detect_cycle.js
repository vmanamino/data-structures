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
linked.insert(6, 'seventh');

var length = linked.length;

var counter = 0;
var first = linked._find(first);
var last = length - 1;
// var mittel_item = linked._find(3);
// mittel_item.next = first;
var last_item = linked._find(last);
// console.log(first)

last_item.next = first;
// console.log(middle_item)

var inner_counter = 0;
while (counter < length){
  var outer = linked._find(counter)
  console.log(outer)
  inner_counter = 0;
  if (counter > 0){

    while (inner_counter < counter){
//       console.log(inner_counter);
      var inner = linked._find(inner_counter);
      if (outer.next == inner){
        console.log('--------cycle detected')
//         console.log(inner)
        counter = length;
        inner_counter = counter;
        
      }
      inner_counter++;
    }
  }
  counter++;
}