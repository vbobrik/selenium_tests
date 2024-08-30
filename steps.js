
const {By} = require('selenium-webdriver');

async function click() {
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
    await textBox.sendKeys('Selenium');
    await submitButton.click();
}

module.exports(click);