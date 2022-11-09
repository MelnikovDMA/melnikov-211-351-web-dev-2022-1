function cesar(strh, key, whatToDo){
    let alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя"
    let result = "";
    if (whatToDo == "encode"){
        for (let character of strh){
            if (alphabet.indexOf(character.toLowerCase())>-1){
                if (character == character.toUpperCase()){
                    result += alphabet[(alphabet.indexOf(character.toLowerCase()) + key) % 32].toUpperCase();
                }
                else {
                    result += alphabet[(alphabet.indexOf(character) + key) % 32];
                }
            }
            else{
                result += character;
            }
        }
    }
    else if(WhatToDo == "decode"){
        for (let character of strh){
            if (alphabet.indexOf(character.toLowerCase())>-1){
                if (character == character.toUpperCase()){
                    result += alphabet.at((alphabet.indexOf(character.toLowerCase()) - key) % 32).toUpperCase();
                }
                else {
                    result += alphabet.at((alphabet.indexOf(character) - key) % 32);
                }
            }
            else{
                result += character;
            }
        }
    }
    return result;
}

let encode = cesar("Дмитрий",31,"encode");
console.log(encode);

let decode = cesar(encode,31,"decode");
console.log(decode);