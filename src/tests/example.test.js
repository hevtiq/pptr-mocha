//====================================================================
// example.test.js
//
// invoke test suit example test include test steps
//====================================================================
'use strict';

// bring puppeteer module as a middleware
// import puppeteer, { PageEmittedEvents } from 'puppeteer';

// bring mocha-steps step module as middleware
import { step } from 'mocha-steps';

// bring chai expect module as middleware
import { expect } from 'chai';

// bring Page module as middleware
import Page from '../builder';

// invoke test include test steps
describe('Mocha steps demo', () => {
    // declare variables use through test steps run
    // let browser;
    let desktop;
    // let tablet;
    // let mobile;

    // works before run test steps
    before(async () => {
        // launch a new browser instance
        // browser = await puppeteer.launch({ headless: true });

        // create a new page instance
        // page = await browser.newPage();
        desktop = await Page.build('Desktop');

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
        let pages = await desktop.pages();
        await Promise.all(pages.map(page =>page.close()));
    });

    // TC-XXX (xstep)
    step('should load zero bank homepage', async () => {
        // visit to zero bank homepage
        await desktop.goto('http://zero.webappsecurity.com');

        // expect that sign in button visible
        expect(await desktop.isElementVisible('#signin_button')).to.be.true;
    });

    // TC-XXX (xstep)
    step('should display login form', async () => {
        // invoke method to click to sign in button
        await desktop.waitAndClick('#signin_button');

        // expect that login form visible
        expect(await desktop.isElementVisible('#login_form')).to.be.true;

        // expect that sign in button visible
        expect(await desktop.isElementVisible('#signin_button')).to.be.false;
    });

    // TC-XXX (xstep)
    step('should login to application', async () => {
        // invoke method to type into username field
        await desktop.waitAndType('#user_login', 'username');

        // invoke method to type into password field
        await desktop.waitAndType('#user_password', 'password');

        // invoke method to click button submit
        await desktop.waitAndClick('.btn-primary');

        // expect that nav tabs visible
        expect(await desktop.isElementVisible('.nav-tabs')).to.be.true;
    });

    // TC-XXX (xstep)
    step('should have 6 nav tab links', async () => {
        // expect that have 6 nav tab links
        expect(await desktop.getCount('.nav-tabs li')).to.equal(6);
    });
});