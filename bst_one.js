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

var bst = new BinarySearchTree(8, 8)
bst.insert(3, 3);
bst.insert(1, 1);
bst.insert(6, 6);
bst.insert(10, 10);
bst.insert(14, 14);
bst.insert(13, 13);
var current = '';
var message = '';
var checkValues = function(node){
  console.log(node.key)
  if (node.right && node.left){
    if (node.key < node.right.key && node.key > node.left.key){
      console.log('node '+node.key+' is binary')
      checkValues(node.right)
      checkValues(node.left)
      
    }
    else {
      message = 'not a binary tree'
    }
    
  }
  if (node.right && !node.left){
    if (node.key < node.right.key){
        console.log('right node '+node.key+' of previous node '+node.parent.key+' this is binary') 
        console.log(node.key)
        if (node.right){
          console.log('has right node '+node.right.key)
          checkValues(node.right);
        }
        else {
          message = "right "+node.key;
        }
    }
  }
  if (node.left && !node.right){    
    if (node.key > node.left.key){
      console.log('node left '+node.left.key)
      checkValues(node.left)
    }
  }
  if ((!node.right && !node.left) && node.parent){
    console.log('parent of key '+node.key);
    message = 'last node key '+node.key+' is greater than parent '+node.parent.key; 
  }
  return message;
}
current = bst;
console.log(checkValues(current))
// console.log(current.right.right.left.parent.key)


