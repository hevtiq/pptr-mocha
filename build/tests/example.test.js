//====================================================================
// example.test.js
//
// invoke test suit example test include test steps
//====================================================================
'use strict';

// bring puppeteer module as a middleware

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _mochaSteps = require('mocha-steps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mocha steps demo', function () {
    // declare variables use through test steps run
    var browser = void 0;
    var page = void 0;

    // prepare before test steps run
    before(async function () {
        // launch a new browser instance
        browser = await _puppeteer2.default.launch({ headless: true });

        // create a new page instance
        page = await browser.newPage();

        // delay timeout 7s
        page.setDefaultTimeout(7000);
    });

    // works as test steps done
    after(async function () {
        // close the browser instance
        await browser.close();
    });

    (0, _mochaSteps.step)('should load google homepage', async function () {
        await page.goto('https://google.com');
    });

    (0, _mochaSteps.step)('step2 should fail', async function () {
        await page.waitForSelector('#FAIL');
    });

    (0, _mochaSteps.step)('step3', async function () {
        console.log('step3');
    });

    (0, _mochaSteps.step)('step4', async function () {
        console.log('step4');
    });
});