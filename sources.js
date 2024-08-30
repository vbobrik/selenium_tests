

module.exports = {
    DYNAMIC_PAGE: 'https://www.selenium.dev/selenium/web/dynamic.html',
    PAGE_WITH_FORM: 'https://www.selenium.dev/selenium/web/web-form.html'
}
function fac(n) {
    if (typeof n !== 'number' || n < 0) return 'Enter positive number!';
    if(n === 0) return 0;
    let res = 1;
    for(let i = 1; i <= n; i++) {
        res *= i;
    };
    return res;
}
console.log(fac(4));