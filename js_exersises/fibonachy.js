function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }

  let n = prompt("What n?", '');
  
  if (n < 1 || n > 1000) {
    alert(`Error, use natural number and < 1000`);
  } else {
    alert(fib(n));
  }