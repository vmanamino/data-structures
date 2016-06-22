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
linked.insert(4, 'fifth')
var length = linked.length;
var middle = length/2;
var remainder = middle%1;
if (remainder !== 0){
  middle = Math.floor(middle);
}
console.log(linked._find(middle))