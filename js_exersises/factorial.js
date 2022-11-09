function factorial(num) {
    let factN = 1;
    for (let i = num; i > 1; i--) {
        factN = factN * i;
    }
    return factN;
}

console.log(factorial(4))

function factorialReq(num2) {
    if (num2 > 1) {
        return num2 * factorialReq(num2 - 1);
    }
    else {
        return 1;
    }
}

console.log(factorialReq(4))