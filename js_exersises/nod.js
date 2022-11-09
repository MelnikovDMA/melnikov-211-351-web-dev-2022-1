function gcd(a, b) {
    while (a != 0 && b != 0) {
        if (a > b) {
            a = a % b;
        }
    else {
        b = b % a;
        }
    }
    
    return a + b;
}

let a = prompt("What a?", '');
let b = prompt("What b?", '');

alert(gcd(a, b))