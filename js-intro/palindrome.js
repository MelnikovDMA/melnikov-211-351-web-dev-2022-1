function palindrome(s) {
    let s1 = '';
    for (let i = s.length-1 ; i >= 0; i--) {
        s1 += s[i];
    }
    return s1 == s;
}

alert(palindrome('polilop'));