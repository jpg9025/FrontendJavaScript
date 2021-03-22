import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class LogOutController extends BaseController {
    constructor (element) {
        super(element);
        this.checkIfUserIsLogged();
        this.logOutUser();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (userIsLogged) { // Show log out button
            const logOutButton = this.element.querySelector('.log-out-button');
            logOutButton.classList.remove('is-hidden');
        }
    }

    logOutUser() {
        const tokenUser = dataService.getToken();
        try {
            if (tokenUser) {
                const logOutButton = this.element.querySelector('.log-out-button');
                logOutButton.addEventListener('click', async event => {
                    await dataService.deleteToken(tokenUser);
                });
            }
        } catch (error) {
            throw new Error(error.status);
        }
    }
}