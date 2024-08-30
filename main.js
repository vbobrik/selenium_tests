const assert = require('assert');
const {Builder, Browser, By, until} = require('selenium-webdriver');
const {DYNAMIC_PAGE, PAGE_WITH_FORM} = require('../SeleniumTest/sources');
const { clickF } = require("../SeleniumTest/steps");
let driver;

async function getDriver(pageUrl) {
    await driver.get(pageUrl);
}


beforeEach(async function() {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
})

afterEach(async () => await driver.quit());

describe('First script', function() {

    it('Check main title', async function() {
        await getDriver(PAGE_WITH_FORM);
        let title = await driver.getTitle();
        console.log(assert.equal(title, 'Web form'));
    })

    it('The form is submited', async function() {
        await getDriver(PAGE_WITH_FORM);
        await driver.manage().setTimeouts({implicit: 500});
        await clickF(driver);
        let title = await driver.getTitle();
        assert.equal(title, 'Web form - target page');
    });

    it('Confirmation message appears', async function() {
        await getDriver(PAGE_WITH_FORM);

        await clickF(driver);
        let message = await driver.findElement(By.id('message'));
        let value = await message.getText();

        console.log(value);
        assert.equal(value, 'Received!');
    });
 
    it('Pick date', async function() {
        await getDriver(PAGE_WITH_FORM);
        let dateField = await driver.findElement(By.name('my-date'));
        await dateField.click();
        // let datePicker = await driver.findElement(By.className('datepicker'));
        let date = await driver.findElement(By.css('.datepicker-days table tbody>tr:nth-child(2)>td:nth-child(5)'))
        await date.click();
        let value = await dateField.getText();

        console.log(value);
        assert.notDeepEqual(value, '08')
    })
})


describe('Wait', function() {

    it('fail', async function () {
        await getDriver(DYNAMIC_PAGE);
        await driver.findElement(By.id("adder")).click();

        await assert.rejects(async () => {
              await driver.findElement(By.id("box0"))
          },
          Error
        )
    });

    it('sleep', async function() {
        await getDriver(DYNAMIC_PAGE);
        await driver.findElement(By.id('adder')).click();
        await driver.sleep(2000);
        let added = await driver.findElement(By.id("box0"));
        assert.equal(await added.getAttribute('class'), "redbox")
    });

    it('implicit', async function () {
        await driver.manage().setTimeouts({ implicit: 2000 });
        await getDriver(DYNAMIC_PAGE);
        await driver.findElement(By.id("adder")).click();

        let added = await driver.findElement(By.id("box0"));

        assert.equal(await added.getAttribute('class'), "redbox")
    });

    it('explicit', async function () {
        await getDriver(DYNAMIC_PAGE);
        let revealed = await driver.findElement(By.id("revealed"));
        await driver.findElement(By.id("reveal")).click();
        await driver.wait(until.elementIsVisible(revealed), 2000);
        await revealed.sendKeys("Displayed");
        assert.equal(await revealed.getAttribute("value"), "Displayed")
    });


})

