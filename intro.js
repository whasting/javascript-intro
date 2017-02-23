Array.prototype.uniq = function () {
  const newArray = [];
  this.forEach( (elem) => {
    if (!newArray.includes(elem)) {
      newArray.push(elem);
    }
  });
  return newArray;
};

Array.prototype.twoSum = function () {
  const positions = [];
  for (let i = 0; i < (this.length - 1); i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        positions.push([i, j]);
      }
    }
  }
  return positions;
};

Array.prototype.transpose = function () {
  const transposedMatrix = [];
  for (let i = 0; i < this[0].length; i++) {
    const col = [];
    this.forEach( (row) => {
      col.push(row[i]);
    });
    transposedMatrix.push(col);
  }
  return transposedMatrix;
};

Array.prototype.myEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
};

Array.prototype.myMap = function (cb) {
  const newArray = [];
  this.myEach(n => newArray.push(cb(n)));
  return newArray;
};

Array.prototype.myInject = function (cb, acc) {
  const newArray = this.slice();
  if (typeof acc === 'undefined') {
    acc = newArray.shift();
  }
  newArray.myEach(n => acc = cb(n, acc));
  return acc;
};

Array.prototype.bubbleSort = function (sorted) {
  if (typeof sorted === 'undefined') {
    sorted = (a, b) => a <= b;
  }
  let entirelySorted = false;
  while (!entirelySorted) {
    entirelySorted = true;
    for (let i = 0; i < (this.length - 1); i++) {
      let [a, b] = [this[i], this[i + 1]];
      if (!sorted(a, b)) {
        entirelySorted = false;
        [this[i], this[i + 1]] = [b, a];
      }
    }
  }
  return this;
};

String.prototype.substrings = function () {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j <= this.length; j++) {
      newArray.push(this.slice(i, j));
    }
  }
  return newArray.uniq;
};

function range(start, end) {
  if (end < start) {
    return [];
  } else {
    const result = range(start, end - 1);
    result.push(end);
    return result;
  }
}

function recursiveSum(array) {
  if (array.length === 0) {
    return 0;
  } else {
    return recursiveSum(array.slice(0, array.length - 1)) +
                        array[array.length - 1];
  }
}

function exponent1(b, n) {
  if (n === 0) {
    return 1;
  } else {
    return b * exponent1(b, n - 1);
  }
}

function exponent2(b, n) {
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return b;
  } else if (n % 2 === 0) {
    return exponent2(b, n / 2) * exponent2(b, n / 2);
  } else {
    let newN = (n - 1) / 2;
    return b * exponent2(b, newN) * exponent2(b, newN);
  }
}

function fibs(n) {
  if (n <= 2) {
    return [1, 1].slice(0, n);
  } else {
    const prev = fibs(n - 1);
    prev.push(prev[prev.length - 2] + prev[prev.length - 1]);
    return prev;
  }
}

function bsearch(array, target) {
  if (array.length === 0) {
    return null;
  }
  let midpoint = Math.floor(array.length / 2);
  if (target === array[midpoint]) {
    return midpoint;
  } else if (target < array[midpoint]) {
    return bsearch(array.slice(0, midpoint), target);
  } else {
    let rightSide = array.slice(midpoint + 1, array.length);
    let result = bsearch(rightSide, target);
    return result ? result + midpoint + 1 : result;
  }
}

function makeChange(amt, coins) {
  if (amt === 0) {
    return [];
  } else if (amt < coins[coins.length - 1]) {
    return null;
  }
  let bestResult = null;
  let bestLength = null;
  coins.forEach( (coin) => {
    let newAmt = amt - coin;
    let thisResult = makeChange(newAmt, coins);
    if (thisResult) {
      thisResult.push(coin);
      if (bestLength === null || thisResult.length < bestLength) {
        bestResult = thisResult;
        bestLength = thisResult.length;
      }
    }
  });
  return bestResult;
}

Array.prototype.mergeSort = function () {
  if (this.length <= 1) {
    return this;
  }
  let mid = Math.floor(this.length / 2);
  let left = this.slice(0, mid);
  let right = this.slice(mid, this.length);
  return mergeHelper(left.mergeSort(), right.mergeSort());
};

function mergeHelper(left, right) {
  const resultArray = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      resultArray.push(left.shift());
    } else {
      resultArray.push(right.shift());
    }
  }
  return resultArray.concat(left).concat(right);
}

function subsets(array) {
  if (array.length === 0) {
    return [[]];
  }
  const result = [];
  let first = array[0];
  let subsetsWithoutFirst = subsets(array.slice(1, array.length));
  subsetsWithoutFirst.forEach( (subset) => result.push(subset) );
  subsetsWithoutFirst.forEach( (subset) => {
    let thing = subset.slice();
    thing.push(first);
    result.push(thing);
  });
  return result;
}

function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function () {
  return `${this.name} loves ${this.owner}`;
};
