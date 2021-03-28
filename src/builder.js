//====================================================================
// builder.js
//
// export module as Builder Core Framework Middleware
//====================================================================
'use strict';

// bring puppeteer module as a middleware
import puppeteer from 'puppeteer';

// export Builder module
export default class Builder {
    /**
     * Method to build a page
     * @param {*} viewport viewport set
     * @returns 
     */
    static async build(viewport) {
        // options to overwrite viewport
        const launchOptions = {
            headless: false,
            slowMo: 0,
            args: [
                '--no-sandbox',  // not a sandbox
                '--disable-setui-sandbox',
                '--disable-web-security',
            ],
        };

        // launch with a browser instance
        const browser = await puppeteer.launch(launchOptions);

        // create an page instance
        const page = await browser.newPage();

        // overwrite a default multiple order tests
        const extendedPage = new Builder(page);

        // set default timeout delays 10s
        await page.setDefaultTimeout(10000);

        // switch viewport with devices run
        switch(viewport) {
            case 'Mobile':
                const mobileViewport = puppeteer.devices['iPhone X'];
                await page.emulate(mobileViewport);
                break;
            case 'Tablet':
                const tabletViewport = puppeteer.devices['iPad landscape'];
                await page.emulate(tabletViewport);
                break;
            case 'Desktop':
                await page.setViewport({ width: 800, height: 600 });
                break;
            default:
                throw new Error('Supported devices are only Mobile | Tablet | Desktop');
        }

        // return a new javascript proxy instance to combine extended page into one class
        return new Proxy(extendedPage, {
            /**
             * Method to get object information for monitor
             * @param {Object} _target object target
             * @param {Object} property object property
             * @returns object information
             */
            get: function(_target, property) {
                // merge all objects together, return object if found
                return extendedPage[property] || browser[property] || page[property];
            },
        });
    };

    /**
     * Constructor
     * @param {*} page page be invoked
     */
    constructor(page) {
        this.page = page;
    };

    /**
     * waitAndClick() method to wait and click on DOM
     * @param { Object } selector dom will be clicked
     */
    async waitAndClick(selector) {
        // wait for selector displayed
        await this.page.waitForSelector(selector);

        // click on selector
        await this.page.click(selector);
    };

    /**
     * waitAndType() method to wait and type on DOM
     * @param { Object } selector dom will be typed
     * @param { String } text string will be typed
     */
    async waitAndType(selector, text) {
        // wait for selector displayed
        await this.page.waitForSelector(selector);

        // type text into selector
        await this.page.type(selector, text);
    };

    /**
     * getText() method to wait and grab text content
     * @param { Object } selector dom selected
     * @returns text content
     */
    async getText(selector) {
        // wait for selector displayed
        await this.page.waitForSelector(selector);

        // grab and populate text content from selector
        const text = await this.page.$eval(selector, e => e.innerHTML);

        // return text content
        return text;
    };

    /**
     * getCount() method to count number of items
     * @param { Object } selector dom selected
     * @returns items length
     */
    async getCount(selector) {
        // wait for selector displayed
        await this.page.waitForSelector(selector);

        // grab and populate items length from selector
        const count = await this.page.$$eval(selector, items => items.length);

        // return items length
        return count;
    };

    /**
     * waitForXPathAndClick() method to click on dom base on xpath
     * @param {*} xpath dom xpath
     */
    async waitForXPathAndClick(xpath) {
        // wait for xpath selector displayed
        await this.page.waitForXpath(xpath);

        // grab and populate
        const elements = await this.page.$x(xpath);

        // warn if number of element more than 1
        if (elements.length > 1) {
            console.warn('waitForXpathAndClick returned more than one result');
        };

        // click on first element
        await elements[0].click();
    };

    /**
     * isElementVisible() method to check dom visible or not
     * @param { Object } selector dom selector
     * @returns { Boolean } dom visible or not
     */
    async isElementVisible(selector) {
        // flag to check element is visible or not
        let visible = true;

        // determine selector is visible or not in 3s
        await this.page
            .waitForSelector(selector, { visible: true, timeout: 3000 })
            .catch(() => {
                // return false if has error catch
                visible = false;
            });

        // return true if no error catch
        return visible;
    };

    /**
     * isXpathVisible() method to check xpath visible or not
     * @param { Object } xpath dom xpath
     * @returns { Boolean } xpath visible or not
     */
    async isXpathVisible(xpath) {
        // flag to check element is visible or not
        let visible = true;

        // determine xpath is visible or not in 3s
        await this.page
            .waitForXpath(xpath, { visible: true, timeout: 3000 })
            .catch(() => {
                // return false if has error catch
                visible = false;
            });

        // return true if no error catch
        return visible;
    };
};