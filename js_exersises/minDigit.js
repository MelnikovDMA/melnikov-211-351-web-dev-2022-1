function minDigit (n) {
    let min = 9;
    while (n > 0) {
        if (n % 10 < min) {
            min =  n % 10;
        } 
        n = Math.floor(n/10);
    }

    return min;
}

let n = prompt("What n?", '');

if (n < 1) {
    alert(`Error, use natural number.`);
  } else {
    alert(minDigit(n));
  }