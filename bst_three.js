var BinarySearchTree = function(key, value, parent) {
    this.key = key || null;
    this.value = value || null;
    this.parent = parent || null;
    this.left = null;
    this.right = null;
};

BinarySearchTree.prototype.insert = function(key, value) {
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }
    else if (key < this.key) {
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        else {
            this.left.insert(key, value);
        }
    }
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
};

BinarySearchTree.prototype.get = function(key) {
    if (this.key == key) {
        return this.value;
    }
    else if (key < this.key && this.left) {
        return this.left.get(key);
    }
    else if (key > this.key && this.right) {
        return this.right.get(key);
    }
    else {
        throw new Error('Key Error');
    }
};

BinarySearchTree.prototype.remove = function(key) {
    if (this.key == key) {
        if (this.left && this.right) {
            var successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        else if (this.left) {
            this._replaceWith(this.left);
        }
        else if (this.right) {
            this._replaceWith(this.right);
        }
        else {
            this._replaceWith(null);
        }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
};

BinarySearchTree.prototype._replaceWith = function(node) {
    if (this.parent) {
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        else if (this == this.parent.right) {
            this.parent.right = node;
        }

        if (node) {
            node.parent = this.parent;
        }
    }
    else {
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
    }
};

BinarySearchTree.prototype._findMin = function() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
};

var bst = new BinarySearchTree(9, 9);
// bst.insert(7, 7);
bst.insert(4, 4);
// bst.insert(5, 5);
// bst.insert(10, 10);
bst.insert(8, 8);
bst.insert(5, 5);
// console.log(bst.key)
// bst.insert(12, 12);
// bst.insert(11, 11);
// bst.insert(15, 15);
// bst.insert(14, 14);
var current = '';
var message = '';
var highest = 0;
var count = 0;
var obj = {}

var crawl = function(node){
  
  if (node.right || node.left){
    if (node.right){
      if (node.right.value > highest){
        
        highest = node.right.value;
      }
      crawl(node.right)
    }
    if (node.left){
      if (node.left.value > highest){
        
        highest = node.left.value;
      }      
      crawl(node.left)
    }
  }
  else if (!(node.right && node.left) && node.parent){
    if (node.value > highest){
      
      highest = node.value
    }
  }
  return highest;
}

var thirdHighest = function(node){
  var hoechstes = crawl(node);
  return hoechstes;  
}
var second = '';
var third = '';
var climbDown = function(node){ 
  //climb down right from root
  if (node.right){
    console.log("current node "+node.key)
    console.log("right node of current is "+node.right.key)
    climbDown(node.right)
  }  
  else {    
    if (node.parent){ // right or left branches from root
      if (node.parent.key > bst.key){ // keeping to right side of root node
        if (node.left){
          third = node.parent;
        }
        else if (node.parent.left){
          third = node.parent.left;
        }
        else if (node.parent.parent){
          third = node.parent.parent;
        }
      }
      else if (node.parent.key == bst.key){ // only one node branch on right from root
        if (node.parent.left){          
          if (node.parent.left.right){            
            climbDown(node.parent.left)
          }
          else {
            third = node.parent.left;
          }
        }        
      }
      else if (node.parent.key < bst.key && bst.right){ //right branches to climb left of root node
        console.log('left side')
        third = node;
      }
      else if (node.parent.key < bst.key && !bst.right){ // tree only has branches to the left of root
        if (node.left){
          third = node.left;
        }
        else {
          third = node.parent;
        }
      }
    }
    
    else if (node.left.right && !node.parent){ // tree has only branches to the left of root
//       console.log('right');
//       console.log(node.left.right.key)
      climbDown(node.left.right)
    }
  }
  return third;
}

console.log(climbDown(bst).key)
// console.log(bst.right.right.right.right.key)
// console.log(thirdHighest(bst))