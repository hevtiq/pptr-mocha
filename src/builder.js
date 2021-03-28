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
            headless: true,
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
             * @param {Object} _target 
             * @param {Object} property 
             * @returns 
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
    }
};