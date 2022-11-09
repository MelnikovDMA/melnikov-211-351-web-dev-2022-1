function pow(x, n) {
    let result = x;
  
    for (let i = 1; i < n; i++) {
      result *= x;
    }
  
    return result;
  }
  
  let x = prompt("What x?", '');
  let n = prompt("What n?", '');
  
  if (n < 1) {
    alert(`Error, use natural number.`);
  } else {
    alert(pow(x, n));
  }