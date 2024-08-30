
const {By} = require('selenium-webdriver');

const clickF = async function click(driver) {
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
    await textBox.sendKeys('Selenium');
    await submitButton.click();
}

module.exports = { clickF };