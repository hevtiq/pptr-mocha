//====================================================================
// example.test.js
//
// invoke test suit example test include test steps
//====================================================================
'use strict';

// bring puppeteer module as a middleware
import puppeteer from 'puppeteer';

import { step } from 'mocha-steps';

describe('Mocha steps demo', () => {
    // declare variables use through test steps run
    let browser;
    let page;

    // prepare before test steps run
    before(async function(){
        // launch a new browser instance
        browser = await puppeteer.launch({ headless: true });

        // create a new page instance
        page = await browser.newPage();

        // delay timeout 7s
        page.setDefaultTimeout(7000);
    });

    // works as test steps done
    after(async function(){
        // close the browser instance
        await browser.close();
    })

    step('should load google homepage', async () => {
        await page.goto('https://google.com');
    });
    
    step('step2 should fail', async () => {
        await page.waitForSelector('#FAIL');
    });

    step('step3', async () => {
        console.log('step3');
    });

    step('step4', async () => {
        console.log('step4');
    });
});