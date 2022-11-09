function Mat(matrix){
    let max = -Infinity;
    for (let i = 0; i < matrix[i].length; i++) {
        let min = Infinity; 
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < min) {
                min = matrix[i][j];
            }
        }
        if (min > max) {
            max = min;
        }       
    }
    return max
}

let matx = [
    [5,2,6],
    [7,2,6],
    [1,6,3],
]
console.log(Mat(matx))