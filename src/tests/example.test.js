//====================================================================
// example.test.js
//
// invoke test suit example test include test steps
//====================================================================
'use strict';

// bring puppeteer module as a middleware
// import puppeteer, { PageEmittedEvents } from 'puppeteer';

// bring mocha-steps module as middleware
import { step } from 'mocha-steps';

// bring Page module as middleware
import Page from '../builder';

// invoke test include test steps
describe('Mocha steps demo', () => {
    // declare variables use through test steps run
    // let browser;
    let page;
    // let tablet;
    // let mobile;

    // works before run test steps
    before(async () => {
        // launch a new browser instance
        // browser = await puppeteer.launch({ headless: true });

        // create a new page instance
        // page = await browser.newPage();
        page = await Page.build('Desktop');

        // create a new tablet instance
        // tablet = await Page.build('Tablet');

        // create a new mobile instance
        // mobile = await Page.build('Mobile');

        // delay timeout 7s
        // page.setDefaultTimeout(7000);
    });

    // works as test steps run done
    after(async () => {
        // close the browser instance
        // await browser.close();
        await page.close();
        // await tablet.close();
        // await mobile.close();
    })

    // TC-XXX (xstep)
    step('should load google homepage', async () => {
        // visit to zero bank homepage
        await page.goto('http://zero.webappsecurity.com');

        // invoke method to click to online banking menu
        await page.waitAndClick('#onlineBankingMenu');

        // wait for 5s delay time
        await page.waitForTimeout(5000);
    });
});