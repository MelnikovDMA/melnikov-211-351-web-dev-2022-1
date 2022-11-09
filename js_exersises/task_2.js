function count(arr = []) {
    let count = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in count) {
            count[arr[i]] += 1;
        } 
        else {
            count[arr[i]] = 1;
        }
    }
    for (let i in count) {
        if (count[i] == 1) {
            delete count[i];
        }
    }
    return count;
}

let result = {};
let array = [4, 7, 3, 9, 1, 0, 6, 3, 9, 1]
result = count(array);
for (let y in result) {
    alert(y + " " + result)
}