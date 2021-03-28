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

    // works before run test steps
    before(async function(){
        // launch a new browser instance
        // browser = await puppeteer.launch({ headless: true });

        // create a new page instance
        // page = await browser.newPage();
        page = await Page.build('Desktop');

        // delay timeout 7s
        // page.setDefaultTimeout(7000);
    });

    // works as test steps run done
    after(async function(){
        // close the browser instance
        // await browser.close();
        await page.close();
    })

    // TC-XXX (xstep)
    step('should load google homepage', async () => {
        // visit to google homepage
        await page.goto('https://google.com');
    });

    // TC-XXX (xstep)
    step('step2 should fail', async () => {
        // wait for DOM displayed
        await page.waitForSelector('#FAIL');
    });

    // TC-XXX (xstep)
    step('step3', async () => {
        // log for tracking
        console.log('step3');
    });

    // TC-XXX (xstep)
    step('step4', async () => {
        // log for tracking
        console.log('step4');
    });
});