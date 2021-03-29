export default class LoginPage {
    /**
     * constructor() method to create and initialize objects with a class
     * @param { Object } page - page property
     */
    constructor(page) {
        this.page = page;
    };

    /**
     * login() method to login for grant access
     * @param {*} user_id - user id field
     * @param {*} user_password - user password field
     */
    async login(user_id, user_password) {
        await this.page.waitAndType('#user_login', user_id);
        await this.page.waitAndType('#user_password', user_password);
        await this.page.waitAndClick(".btn-primary");
    };
};